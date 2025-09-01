#!/bin/bash

# Check all import paths

echo "Checking all import paths..."

# Function to check import paths in a file
check_import_paths() {
  local file="$1"
  echo "Checking $file..."
  
  # Check for problematic import patterns
  if grep -q "@/shared" "$file"; then
    echo "  ❌ Found @/shared in $file"
  fi
  
  if grep -q "/shared" "$file"; then
    echo "  ❌ Found /shared in $file"
  fi
  
  if grep -q "\.\./\.\./\.\./\.\./\.\./\.\./shared" "$file"; then
    echo "  ❌ Found malformed path in $file"
  fi
}

# Check all TypeScript files
echo "Finding TypeScript files..."

# Check all .ts files in services directory
find services -name "*.ts" -type f | while read -r file; do
  if [[ ! "$file" =~ node_modules ]]; then
    check_import_paths "$file"
  fi
done

# Check all .ts files in api-gateway directory
find api-gateway -name "*.ts" -type f | while read -r file; do
  if [[ ! "$file" =~ node_modules ]]; then
    check_import_paths "$file"
  fi
done

# Check all .ts files in message-queue directory
find message-queue -name "*.ts" -type f | while read -r file; do
  if [[ ! "$file" =~ node_modules ]]; then
    check_import_paths "$file"
  fi
done

echo "Import path check completed!" 