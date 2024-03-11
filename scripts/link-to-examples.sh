#!/bin/bash

echo "start pnpm $1"
cd src || exit 1
echo "Now directory is $(pwd)"
pnpm "$1"
cd ../examples || exit 1
echo "Now directory is $(pwd)"
pnpm "$1" react-dom-lazyload-component
