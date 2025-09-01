#!/bin/bash

# Fix @types/express version to be compatible with express 4.x

echo "Fixing @types/express version..."

# Function to fix @types/express version
fix_express_types() {
  local file=$1
  echo "Fixing $file..."
  
  # Change @types/express from version 5.x to 4.x
  sed -i 's|"@types/express": "^5.0.3"|"@types/express": "^4.17.21"|g' "$file"
}

# Fix all service package.json files
fix_express_types "services/auth-service/package.json"
fix_express_types "services/ticketing-service/package.json"
fix_express_types "services/knowledge-service/package.json"
fix_express_types "services/integration-gateway/package.json"
fix_express_types "services/analytics-service/package.json"
fix_express_types "api-gateway/package.json"
fix_express_types "message-queue/package.json"

echo "All @types/express versions have been fixed!" 