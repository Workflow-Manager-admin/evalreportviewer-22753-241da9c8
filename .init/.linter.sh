#!/bin/bash
cd /home/kavia/workspace/code-generation/evalreportviewer-22753-241da9c8/angular_ui
npx eslint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

