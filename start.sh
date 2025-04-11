#!/bin/bash

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Create any necessary directories
mkdir -p public

# Start the development server
echo "Starting development server..."
npm run dev 