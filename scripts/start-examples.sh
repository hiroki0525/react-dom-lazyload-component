#!/bin/bash

echo "start examples $1"
if [ "$1" = "ci" ]; then
  ./scripts/link-to-examples.sh unlink
  npm run install-local-pkg
  npm i -w examples
else
  # local
  npm run uninstall-local-pkg
  npm install -w examples
  ./scripts/link-to-examples.sh link
fi
npm run start:examples