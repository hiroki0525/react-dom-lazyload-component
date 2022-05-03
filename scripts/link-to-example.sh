#!/bin/bash

echo "start npm $1"
cd src || exit 1
echo "Now directory is $(pwd)"
npm "$1"
cd ../examples || exit 1
echo "Now directory is $(pwd)"
npm "$1" react-dom-lazyload-component
