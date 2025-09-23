#!/bin/bash
BACKUP_DIR=$(dirname "$0")
DATE=$(date +%F_%T)
mongodump --db helpdesk --out $BACKUP_DIR/backup_$DATE 