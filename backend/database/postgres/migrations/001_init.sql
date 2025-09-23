-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE UserRole AS ENUM ('super_admin', 'admin', 'agent', 'customer');
CREATE TYPE TicketStatus AS ENUM ('open', 'in_progress', 'closed', 'escalated');
CREATE TYPE TicketPriority AS ENUM ('low', 'medium', 'high', 'urgent');

-- Bảng Tenant
CREATE TABLE "Tenant" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW()
);

-- Bảng User
CREATE TABLE "User" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "tenantId" UUID NOT NULL REFERENCES "Tenant"(id) ON DELETE CASCADE,
    username VARCHAR(100) UNIQUE,
    email VARCHAR(255) UNIQUE NOT NULL,
    "passwordHash" VARCHAR(255) NOT NULL,
    role "UserRole" DEFAULT 'customer',
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "deletedAt" TIMESTAMP,
    "refreshToken" VARCHAR(255),
    "resetPasswordToken" VARCHAR(255),
    "resetPasswordTokenExpiry" TIMESTAMP
);

-- Bảng Department
CREATE TABLE "Department" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "tenantId" UUID NOT NULL REFERENCES "Tenant"(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Bảng Ticket
CREATE TABLE "Ticket" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "tenantId" UUID NOT NULL REFERENCES "Tenant"(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status "TicketStatus" DEFAULT 'open',
    priority TicketPriority DEFAULT 'medium',
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW(),
    "closedAt" TIMESTAMP,
    "deletedAt" TIMESTAMP,
    "creatorId" UUID NOT NULL REFERENCES "User"(id),
    "assigneeId" UUID REFERENCES "User"(id),
    "departmentId" UUID REFERENCES "Department"(id)
);

-- Bảng TicketComment
CREATE TABLE "TicketComment" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "ticketId" UUID NOT NULL REFERENCES "Ticket"(id) ON DELETE CASCADE,
    "userId" UUID NOT NULL REFERENCES "User"(id),
    comment TEXT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW()
);

-- Bảng Attachment
CREATE TABLE "Attachment" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    filename VARCHAR(255) NOT NULL,
    "originalName" VARCHAR(255) NOT NULL,
    "mimeType" VARCHAR(100) NOT NULL,
    size INTEGER NOT NULL,
    "filePath" VARCHAR(255) NOT NULL,
    url VARCHAR(500) NOT NULL,
    "ticketId" UUID REFERENCES "Ticket"(id),
    "commentId" UUID REFERENCES "TicketComment"(id),
    "uploadedBy" UUID NOT NULL REFERENCES "User"(id),
    "tenantId" UUID NOT NULL REFERENCES "Tenant"(id),
    "uploadedAt" TIMESTAMP DEFAULT NOW(),
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW(),
    "deletedAt" TIMESTAMP
);

-- Bảng SLA
CREATE TABLE "SLA" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "tenantId" UUID NOT NULL REFERENCES "Tenant"(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    "responseTime" INTEGER DEFAULT 24,
    "resolutionTime" INTEGER DEFAULT 72,
    priority "TicketPriority" DEFAULT 'medium',
    "departmentId" UUID REFERENCES "Department"(id),
    "isActive" BOOLEAN DEFAULT true,
    "escalationRules" JSONB,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Bảng Workflow
CREATE TABLE "Workflow" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "tenantId" UUID NOT NULL REFERENCES "Tenant"(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    rules JSONB NOT NULL,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_users_tenant_id ON "User"("tenantId");
CREATE INDEX idx_users_email ON "User"(email);
CREATE INDEX idx_users_is_active ON "User"("isActive");
CREATE INDEX idx_departments_tenant_id ON "Department"("tenantId");
CREATE INDEX idx_tickets_tenant_id ON "Ticket"("tenantId");
CREATE INDEX idx_tickets_status ON "Ticket"(status);
CREATE INDEX idx_tickets_priority ON "Ticket"(priority);
CREATE INDEX idx_tickets_created_at ON "Ticket"("createdAt");
CREATE INDEX idx_tickets_closed_at ON "Ticket"("closedAt");
CREATE INDEX idx_tickets_deleted_at ON "Ticket"("deletedAt");
CREATE INDEX idx_ticket_comments_ticket_id ON "TicketComment"("ticketId");
CREATE INDEX idx_ticket_comments_user_id ON "TicketComment"("userId");
CREATE INDEX idx_attachments_ticket_id ON "Attachment"("ticketId");
CREATE INDEX idx_attachments_comment_id ON "Attachment"("commentId");
CREATE INDEX idx_attachments_tenant_id ON "Attachment"("tenantId");
CREATE INDEX idx_slas_tenant_id ON "SLA"("tenantId");
CREATE INDEX idx_slas_is_active ON "SLA"("isActive");
CREATE INDEX idx_workflows_tenant_id ON "Workflow"("tenantId");
CREATE INDEX idx_workflows_is_active ON "Workflow"("isActive");