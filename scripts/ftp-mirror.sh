#!/usr/bin/env bash
# Mirrors a local directory to the Hostinger docroot over FTP.
#
# Usage: ftp-mirror.sh <local-dir> <remote-dir>
# Expects FTP_SERVER, FTP_USERNAME and LFTP_PASSWORD in the environment.
#
# Hostinger drops FTP sessions under load, so transfers run with a small
# connection count and the whole mirror is retried a few times — a dropped
# control socket used to fail the deploy and skip every step after it.
set -uo pipefail

LOCAL_DIR="${1:?local dir required}"
REMOTE_DIR="${2:?remote dir required}"
ATTEMPTS="${FTP_ATTEMPTS:-3}"

for attempt in $(seq 1 "$ATTEMPTS"); do
  echo "→ mirror attempt $attempt/$ATTEMPTS: $LOCAL_DIR → $REMOTE_DIR"

  if lftp --env-password -u "$FTP_USERNAME" "ftp://$FTP_SERVER" -e "
      set ftp:ssl-allow true;
      set ssl:verify-certificate false;
      set ftp:passive-mode true;
      set net:max-retries 5;
      set net:timeout 40;
      set net:reconnect-interval-base 5;
      set mirror:parallel-transfer-count 2;
      set cmd:fail-exit true;
      mirror --reverse --continue --verbose=1 '$LOCAL_DIR' '$REMOTE_DIR';
      bye
    "; then
    echo "✓ mirror finished"
    exit 0
  fi

  echo "✗ attempt $attempt failed"
  [ "$attempt" -lt "$ATTEMPTS" ] && sleep 20
done

echo "mirror failed after $ATTEMPTS attempts"
exit 1
