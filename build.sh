#! /usr/bin/bash

rm -r ./frontend/build
npm run build --prefix frontend
cp -r ./frontend/build ./backend
