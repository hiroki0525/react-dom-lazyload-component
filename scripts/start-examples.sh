#!/bin/bash

echo "start examples $1"
if [ "$1" = "ci" ]; then
  pnpm i -F examples --frozen-lockfile
else
  # local
  pnpm install -F examples --frozen-lockfile
  pnpm build
fi
pnpm start:examples