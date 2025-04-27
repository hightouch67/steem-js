@echo off
echo Creating test results directories...
mkdir test-results\node16 2>nul
mkdir test-results\node18 2>nul
mkdir test-results\node20 2>nul
mkdir test-results\latest 2>nul

echo Building and testing on Node.js 16...
docker build -t steem-js:node16 -f node-16.dockerfile .
docker run --name steem-js-node16 steem-js:node16
docker rm steem-js-node16

echo Building and testing on Node.js 18...
docker build -t steem-js:node18 -f node-18.dockerfile .
docker run --name steem-js-node18 steem-js:node18
docker rm steem-js-node18

echo Building and testing on Node.js 20...
docker build -t steem-js:node20 -f node-20.dockerfile .
docker run --name steem-js-node20 steem-js:node20
docker rm steem-js-node20

echo Building and testing on latest Node.js LTS...
docker build -t steem-js:latest .
docker run --name steem-js-latest steem-js:latest
docker rm steem-js-latest

echo All tests completed! 