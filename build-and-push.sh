#!/bin/bash

set -e

# Configuration
GITHUB_USER="sebastien-cormier"
REPO_NAME="fishacademy-landingpage"
IMAGE_NAME="ghcr.io/${GITHUB_USER}/${REPO_NAME}"
PLATFORM="linux/amd64"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get version from package.json or use 'latest'
VERSION=$(node -p "require('./package.json').version" 2>/dev/null || echo "latest")

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Fish Academy Landing Page - Docker Build${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}Error: Docker is not running. Please start Docker and try again.${NC}"
    exit 1
fi

# Check if logged in to GHCR
if ! docker info 2>/dev/null | grep -q "ghcr.io"; then
    echo -e "${YELLOW}Warning: You may not be logged in to GitHub Container Registry.${NC}"
    echo -e "${YELLOW}Run: echo \$GITHUB_TOKEN | docker login ghcr.io -u ${GITHUB_USER} --password-stdin${NC}"
    echo ""
fi

# Load environment variables from .env.local if exists
if [ -f .env.local ]; then
    echo -e "${GREEN}Loading environment variables from .env.local...${NC}"
    export $(grep -v '^#' .env.local | xargs)
fi

# Build arguments
BUILD_ARGS=""
if [ -n "$GHOST_CONTENT_API_URL" ]; then
    BUILD_ARGS="$BUILD_ARGS --build-arg GHOST_CONTENT_API_URL=$GHOST_CONTENT_API_URL"
fi
if [ -n "$GHOST_CONTENT_API_KEY" ]; then
    BUILD_ARGS="$BUILD_ARGS --build-arg GHOST_CONTENT_API_KEY=$GHOST_CONTENT_API_KEY"
fi
if [ -n "$NEXT_PUBLIC_SITE_URL" ]; then
    BUILD_ARGS="$BUILD_ARGS --build-arg NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL"
else
    BUILD_ARGS="$BUILD_ARGS --build-arg NEXT_PUBLIC_SITE_URL=https://fishacademy.fr"
fi

echo -e "${GREEN}Building Docker image...${NC}"
echo -e "  Image: ${YELLOW}${IMAGE_NAME}:${VERSION}${NC}"
echo -e "  Platform: ${YELLOW}${PLATFORM}${NC}"
echo ""

# Build the image for linux/amd64
docker build \
    --platform ${PLATFORM} \
    ${BUILD_ARGS} \
    -t ${IMAGE_NAME}:${VERSION} \
    -t ${IMAGE_NAME}:latest \
    .

echo ""
echo -e "${GREEN}Build successful!${NC}"
echo ""

# Ask for confirmation before pushing
read -p "Push to GitHub Container Registry (ghcr.io)? (y/N) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${GREEN}Pushing to ghcr.io...${NC}"

    # Push both tags
    docker push ${IMAGE_NAME}:${VERSION}
    docker push ${IMAGE_NAME}:latest

    echo ""
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}  Push successful!${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo -e "Image available at:"
    echo -e "  ${YELLOW}https://github.com/${GITHUB_USER}/${REPO_NAME}/pkgs/container/${REPO_NAME}${NC}"
    echo ""
    echo -e "Pull commands:"
    echo -e "  ${YELLOW}docker pull ${IMAGE_NAME}:${VERSION}${NC}"
    echo -e "  ${YELLOW}docker pull ${IMAGE_NAME}:latest${NC}"
else
    echo -e "${YELLOW}Push cancelled.${NC}"
    echo ""
    echo -e "To push manually later, run:"
    echo -e "  ${YELLOW}docker push ${IMAGE_NAME}:${VERSION}${NC}"
    echo -e "  ${YELLOW}docker push ${IMAGE_NAME}:latest${NC}"
fi

echo ""
echo -e "To run the container locally:"
echo -e "  ${YELLOW}docker run -p 3000:3000 --env-file .env.local ${IMAGE_NAME}:latest${NC}"
