#!/bin/bash

pm2 start server/server.js
pm2 start workers/workerQueue.js
