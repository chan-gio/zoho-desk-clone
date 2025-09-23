#!/bin/bash
PGUSER=${PGUSER:-postgres}
PGDATABASE=${PGDATABASE:-helpdesk}
PGHOST=${PGHOST:-localhost}
BACKUP_DIR=$(dirname "$0")
DATE=$(date +%F_%T)
pg_dump -U $PGUSER -h $PGHOST $PGDATABASE > $BACKUP_DIR/backup_$DATE.sql 