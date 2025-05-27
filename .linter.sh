#!/bin/bash
cd /home/kavia/workspace/code-generation/tictactoe-classic-19445-44f03d54/tic_tac_toe_ui
npm run lint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

