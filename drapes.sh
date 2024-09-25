#!/bin/bash

# Function to check if Docker is running
is_docker_running() {
    if ! docker info > /dev/null 2>&1; then
        return 1  # Docker is not running
    fi
    return 0  # Docker is running
}

# Start Docker if not running
start_docker() {
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # For Linux, check if Docker is installed and then start it
        if ! command -v docker &> /dev/null; then
            echo "Docker is not installed. Please install Docker."
            exit 1
        fi
        # Attempt to start Docker using service or systemctl
        if command -v systemctl &> /dev/null; then
            sudo systemctl start docker
        elif command -v service &> /dev/null; then
            sudo service docker start
        else
            echo "Unable to start Docker. Please start it manually."
            exit 1
        fi
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        # For macOS, use the command to start Docker Desktop
        open -a Docker
        echo "Starting Docker Desktop... Please wait."
        # Wait for Docker to start
        while ! is_docker_running; do
            sleep 1
        done
    fi
}

# Main script execution
if is_docker_running; then
    echo "Docker is already running."
else
    echo "Docker is not running. Starting Docker..."
    start_docker
fi

# Execute docker-compose in detached mode
echo "Starting Docker Compose..."
docker-compose up -d 

echo "Docker Compose is running in detached mode with automatic restart configured in docker-compose"

