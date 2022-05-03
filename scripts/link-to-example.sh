#!/bin/bash

echo "start npm $1"
cd src || exit 1
npm "$1"
cd ../examples || exit 1
npm "$1" react-dom-lazyload-component
