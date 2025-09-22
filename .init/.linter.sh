#!/bin/bash
cd /home/kavia/workspace/code-generation/legacy-cycle-store-system-migration--cycle-store-4890-4596/WebApplicationService
npm run lint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

