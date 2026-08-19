#!/usr/bin/env bash
# Deploys dialoghive.com: the Next.js marketing site plus the PHP admin panel.
#
#   bash scripts/deploy.sh            # build + deploy both
#   bash scripts/deploy.sh --skip-build
#   bash scripts/deploy.sh --site      # site only
#   bash scripts/deploy.sh --admin     # /manage/ only
#
# Credentials live in .deploy.env at the repo root (gitignored).

set -uo pipefail
cd "$(dirname "$0")/.."

# shellcheck source=lib/ssh-deploy.sh
. scripts/lib/ssh-deploy.sh
load_deploy_env

DOCROOT="${DEPLOY_DOCROOT:-domains/dialoghive.com/public_html}"
SITE_URL="${DEPLOY_SITE_URL:-https://dialoghive.com}"

do_build=true; do_site=true; do_admin=true
for arg in "$@"; do
  case "$arg" in
    --skip-build) do_build=false ;;
    --site)  do_admin=false ;;
    --admin) do_site=false; do_build=false ;;
    *) echo "unknown option: $arg"; exit 2 ;;
  esac
done

if $do_build && $do_site; then
  echo "▸ Building the site…"
  ( cd website && npm run build ) || { echo "✗ build failed"; exit 1; }
fi

status=0

if $do_site; then
  echo "▸ Deploying the website"
  # _next holds a folder named after the build id, which changes every build.
  deploy_dir website/out "$DOCROOT" _next || status=1
fi

if $do_admin; then
  echo "▸ Deploying the admin panel"
  # No wipe list: config.php on the server holds the DB and GitHub credentials.
  deploy_dir admin-php "$DOCROOT/manage" || status=1
fi

echo
echo "▸ Verifying"
$do_site  && verify_url "$SITE_URL/"
$do_site  && verify_url "$SITE_URL/blog/"
$do_admin && verify_url "$SITE_URL/manage/"

exit $status
