#!/usr/bin/env bash

git pull
npm run build

browserify src/main.js -o game.js -t [ babelify --presets [ latest ] ]
