#!/bin/bash

# Database setup script
echo "Setting up database..."

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "Error: DATABASE_URL environment variable is not set"
    echo "Please set DATABASE_URL in your .env file"
    exit 1
fi

# Extract database connection details
DB_HOST=$(echo $DATABASE_URL | sed -n 's/.*@\([^:]*\):.*/\1/p')
DB_PORT=$(echo $DATABASE_URL | sed -n 's/.*:\([0-9]*\)\/.*/\1/p')
DB_NAME=$(echo $DATABASE_URL | sed -n 's/.*\/\([^?]*\).*/\1/p')
DB_USER=$(echo $DATABASE_URL | sed -n 's/.*:\/\/\([^:]*\):.*/\1/p')
DB_PASS=$(echo $DATABASE_URL | sed -n 's/.*:\/\/[^:]*:\([^@]*\)@.*/\1/p')

echo "Database: $DB_NAME"
echo "Host: $DB_HOST"
echo "Port: $DB_PORT"
echo "User: $DB_USER"

# Run migration
echo "Running migration..."
psql "$DATABASE_URL" -f database/postgres/migrations/001_init.sql

if [ $? -eq 0 ]; then
    echo "✅ Migration completed successfully"
else
    echo "❌ Migration failed"
    exit 1
fi

# Run seed data
echo "Running seed data..."
psql "$DATABASE_URL" -f database/postgres/seeds/seed.sql

if [ $? -eq 0 ]; then
    echo "✅ Seed data completed successfully"
else
    echo "❌ Seed data failed"
    exit 1
fi

echo "🎉 Database setup completed successfully!"
echo ""
echo "Test data created:"
echo "- 1 tenant: Test Company"
echo "- 3 users: admin, agent1, customer1"
echo "- 3 departments: Technical Support, Sales, Billing"
echo "- 3 tickets with different statuses and priorities"
echo "- 3 comments"
echo "- 2 attachments (screenshot and error log)"
echo "- 3 SLAs for different priorities"
echo "- 2 workflows"
echo ""
echo "Default credentials:"
echo "- Admin: admin@test.com / password"
echo "- Agent: agent1@test.com / password"
echo "- Customer: customer1@test.com / password"
