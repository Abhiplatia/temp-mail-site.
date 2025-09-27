#!/bin/bash
# Production startup script for QuickTempMail.live

echo "Starting QuickTempMail.live production server..."

# Set production environment
export NODE_ENV=production

# Start the application
node index.js