#!/bin/bash

# Get the current directory path
path=$(pwd)

# Check if the path contains "node_modules"
if [[ $path == *"node_modules"* ]]; then
    
    set -e

    mkdir -p ../../server

    shopt -s dotglob  

    mv -f * ../../server 

    cd ../../

    mv -f ./node_modules ./server

    rm -f ./server/bin/init.sh
fi  