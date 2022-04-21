#!/bin/bash

if [ "$1" = "unlink" ]; then
    cd src || exit 1
    npm unlink
    cd ../examples || exit 1
    npm unlink react-dom-lazyload-component
    exit 0
fi
cd src || exit 1
npm link
cd ../examples || exit 1
npm link react-dom-lazyload-component
