#! /bin/bash
# setting node path
echo 'setting node path';
PATH="C:/Program Files/nodejs:$PATH";

instance="melkorcba/standings-board";

# build
echo 'building image for' $instance;
npm.cmd run -s dockerbuild Dockerfile $instance;