#!/bin/bash

echo "start examples $1"
if [ "$1" = "ci" ]; then
  ./scripts/link-to-examples.sh unlink
  pnpm install-local-pkg
  pnpm i -F examples
else
  # local
  pnpm uninstall-local-pkg
  pnpm install -w examples
  pnpm build
  ./scripts/link-to-examples.sh link
fi
pnpm start:examples