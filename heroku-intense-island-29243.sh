#! /bin/bash
# build
npm run -s dockerbuild Dockerfile registry.heroku.com/intense-island-29243/web;
# push
npm run -s heroku-push registry.heroku.com/intense-island-29243/web;
# release
npm run -s heroku-release intense-island-29243;