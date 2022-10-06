#! /bin/bash
# build
npm run -s dockerbuild Dockerfile registry.heroku.com/evening-forest-69342/web;
# push
npm run -s heroku-push registry.heroku.com/evening-forest-69342/web;
# release
npm run -s heroku-release evening-forest-69342;