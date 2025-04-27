#!/bin/bash

# Create test results directory if it doesn't exist
mkdir -p test-results/node16
mkdir -p test-results/node18
mkdir -p test-results/node20
mkdir -p test-results/latest

# Build and run tests for all Node.js versions
echo "Building and testing on Node.js 16..."
docker build -t steem-js:node16 -f node-16.dockerfile .
docker run --name steem-js-node16 steem-js:node16
docker rm steem-js-node16

echo "Building and testing on Node.js 18..."
docker build -t steem-js:node18 -f node-18.dockerfile .
docker run --name steem-js-node18 steem-js:node18
docker rm steem-js-node18

echo "Building and testing on Node.js 20..."
docker build -t steem-js:node20 -f node-20.dockerfile .
docker run --name steem-js-node20 steem-js:node20
docker rm steem-js-node20

echo "Building and testing on latest Node.js LTS..."
docker build -t steem-js:latest .
docker run --name steem-js-latest steem-js:latest
docker rm steem-js-latest

echo "All tests completed!" 