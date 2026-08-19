#!/usr/bin/env bash
# Shared SSH deployment helpers for the DialogHive sites.
#
# Everything ships over one SSH connection as a tar stream — no per-file FTP
# handshakes, which is what kept dropping mid-deploy on this host.
#
# Credentials come from the environment, or from .deploy.env at the repo root
# (gitignored — never commit it).
#
#   DEPLOY_HOST, DEPLOY_PORT, DEPLOY_USER, DEPLOY_PASS
#
# Password auth runs through SSH_ASKPASS so no terminal prompt is needed. If an
# SSH key is installed instead, unset DEPLOY_PASS and it is used automatically.

set -uo pipefail

_repo_root() {
  git rev-parse --show-toplevel 2>/dev/null || pwd
}

load_deploy_env() {
  local env_file="${DEPLOY_ENV_FILE:-$(_repo_root)/.deploy.env}"
  if [ -f "$env_file" ]; then
    # shellcheck disable=SC1090
    set -a; . "$env_file"; set +a
  fi

  : "${DEPLOY_HOST:?DEPLOY_HOST is not set (put it in .deploy.env)}"
  : "${DEPLOY_USER:?DEPLOY_USER is not set (put it in .deploy.env)}"
  DEPLOY_PORT="${DEPLOY_PORT:-22}"

  if [ -n "${DEPLOY_PASS:-}" ]; then
    ASKPASS_FILE="$(mktemp)"
    printf '#!/bin/sh\necho "$DEPLOY_PASS"\n' > "$ASKPASS_FILE"
    chmod 700 "$ASKPASS_FILE"
    export DEPLOY_PASS SSH_ASKPASS="$ASKPASS_FILE" SSH_ASKPASS_REQUIRE=force DISPLAY="${DISPLAY:-:0}"
    trap 'rm -f "$ASKPASS_FILE"' EXIT
  fi
}

SSH_OPTS=(-o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null
          -o ConnectTimeout=25 -o ServerAliveInterval=15 -o LogLevel=ERROR)

remote() {
  ssh "${SSH_OPTS[@]}" -p "$DEPLOY_PORT" "$DEPLOY_USER@$DEPLOY_HOST" "$@"
}

# deploy_dir <local-dir> <remote-dir> [dir-to-wipe-first ...]
#
# The wipe list clears folders whose filenames change every build (Next's
# _next/<buildId>, Vite's assets/) so stale bundles do not pile up. Anything
# else on the server — config.php, uploads — is left alone.
deploy_dir() {
  local local_dir="$1" remote_dir="$2"; shift 2
  local wipe=("$@")

  [ -d "$local_dir" ] || { echo "✗ $local_dir does not exist — build first"; return 1; }

  local files
  files=$(find "$local_dir" -type f | wc -l)
  echo "→ $local_dir ($files files) → $remote_dir"

  local prep="mkdir -p '$remote_dir'"
  for w in "${wipe[@]}"; do
    prep="$prep && rm -rf '$remote_dir/$w'"
  done
  # Hostinger drops a placeholder into every empty docroot; it would otherwise
  # keep being served ahead of index.html.
  prep="$prep && rm -f '$remote_dir/default.php'"

  if ! remote "$prep"; then
    echo "✗ could not prepare $remote_dir"
    return 1
  fi

  if tar czf - -C "$local_dir" . | remote "tar xzf - -C '$remote_dir'"; then
    echo "✓ uploaded to $remote_dir"
    return 0
  fi

  echo "✗ upload failed"
  return 1
}

verify_url() {
  local url="$1" expect="${2:-200}"
  local code
  code=$(curl -s -o /dev/null -w '%{http_code}' -L --max-time 25 \
        -A 'Mozilla/5.0 (deploy check)' "$url" || echo ERR)
  if [ "$code" = "$expect" ]; then
    echo "✓ $url → $code"
  else
    echo "! $url → $code (expected $expect; DNS or SSL may still be settling)"
  fi
}
