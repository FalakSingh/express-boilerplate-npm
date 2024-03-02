#!/bin/bash

set -e

mkdir -p ../../server

shopt -s dotglob  

mv -f * ../../server 

cd ../../

mv -f ./node_modules ./server

rm -f ./server/bin/init.sh
