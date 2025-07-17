#!/bin/bash

mkdir -p backend/{shared/src/{types,utils,middlewares,database,errors},shared/dist,services,api-gateway/src/{config,middleware,routes,services,tests},api-gateway/k8s,api-gateway/dist,message-queue/src/{config,publishers,consumers,workers,tests},message-queue/k8s,message-queue/dist,scripts,docs/{api,architecture,deployment,development},k8s}

# Auth Service
mkdir -p backend/services/auth-service/{src/{config,controllers,services,repositories,models,routes,grpc,graphql,tests/integration},k8s,dist}

# Ticketing Service
mkdir -p backend/services/ticketing-service/{src/{config,controllers,services,repositories,models,routes,grpc,graphql,workers,tests},k8s,dist}

# Knowledge Service
mkdir -p backend/services/knowledge-service/{src/{config,controllers,services,repositories,models,routes,grpc,graphql,tests},k8s,dist}

# Integration Gateway
mkdir -p backend/services/integration-gateway/{src/{config,controllers,services,integrations/{sendgrid,twilio,facebook,twitter},routes,grpc,websocket,tests},k8s,dist}

# Analytics Service
mkdir -p backend/services/analytics-service/{src/{config,controllers,services,repositories,models,routes,grpc,graphql,tests},k8s,dist}

# File templates (optional)
touch backend/{package.json,docker-compose.yml,.env.example,.eslintrc.js,.prettierrc,jest.config.js,nginx.conf}
touch backend/scripts/{setup.sh,docker-build.sh,k8s-deploy.sh,test.sh,seed-data.sh}

echo "✅ Cấu trúc thư mục đã được tạo thành công!"
