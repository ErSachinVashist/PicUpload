#!/bin/bash

pm2 start /root/sachin/server/server.js
pm2 start /root/sachin/workers/workerQueue.js
