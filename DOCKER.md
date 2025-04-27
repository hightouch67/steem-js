# Docker Support for Steem.js

This project includes Docker support to ensure consistent testing and development environments across different platforms.

## Available Docker Images

The following Docker images are available:

- `steem-js:node16` - Node.js 16
- `steem-js:node18` - Node.js 18
- `steem-js:node20` - Node.js 20
- `steem-js:latest` - Latest Node.js LTS version

## Prerequisites

- [Docker](https://www.docker.com/get-started) installed on your system
- [Docker Compose](https://docs.docker.com/compose/install/) (optional, for running all tests at once)

## Using Docker for Testing

### Testing all Node.js versions

To build and run tests on all supported Node.js versions:

```bash
# Using Docker Compose
npm run docker:test:all

# OR using the helper script (Unix/Linux/macOS)
./docker-test.sh

# OR using the helper script (Windows)
docker-test.bat
```

### Testing a specific Node.js version

To build and run tests on a specific Node.js version:

```bash
# Node.js 16
npm run docker:test:node16

# Node.js 18
npm run docker:test:node18

# Node.js 20
npm run docker:test:node20

# Latest Node.js LTS
npm run docker:test:latest
```

### Building the Docker image

To build the Docker image without running tests:

```bash
npm run docker:build
```

## Using Docker for Development

You can use Docker to create a consistent development environment:

```bash
# Build the Docker image
docker build -t steem-js:dev .

# Start an interactive shell
docker run -it --rm -v $(pwd):/app steem-js:dev /bin/bash
```

Inside the container, you can run commands like:

```bash
npm install
npm run build
npm test
```

## CI/CD Integration

This project includes GitHub Actions workflows that use Docker to test the library on different Node.js versions. The workflow configuration is in `.github/workflows/node.yml`.

## Customizing Docker Images

You can customize the Docker images by modifying the Dockerfiles:

- `Dockerfile` - Main Dockerfile for the latest Node.js LTS
- `node-16.dockerfile` - Dockerfile for Node.js 16
- `node-18.dockerfile` - Dockerfile for Node.js 18
- `node-20.dockerfile` - Dockerfile for Node.js 20

## Troubleshooting

If you encounter issues with Docker:

1. Make sure Docker is running on your system
2. Try pulling the base Node.js images directly:
   ```bash
   docker pull node:16-slim
   docker pull node:18-slim
   docker pull node:20-slim
   ```
3. Check Docker logs for errors:
   ```bash
   docker logs steem-js-node16  # Replace with the appropriate container name
   ``` 