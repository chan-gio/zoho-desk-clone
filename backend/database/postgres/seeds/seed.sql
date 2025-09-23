-- Seed data for testing

-- Insert test tenant
INSERT INTO "Tenant" (id, name) VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'Test Company');

-- Insert test users
INSERT INTO "User" (id, "tenantId", username, email, "passwordHash", role, "isActive") VALUES 
('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 'admin', 'admin@test.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', true),
('550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', 'agent1', 'agent1@test.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'agent', true),
('550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440000', 'customer1', 'customer1@test.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'customer', true);

-- Insert test departments
INSERT INTO "Department" (id, "tenantId", name, description) VALUES 
('550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440000', 'Technical Support', 'Technical support department'),
('550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440000', 'Sales', 'Sales department'),
('550e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440000', 'Billing', 'Billing department');

-- Insert test tickets
INSERT INTO "Ticket" (id, "tenantId", title, description, status, priority, "creatorId", "assigneeId", "departmentId") VALUES 
('550e8400-e29b-41d4-a716-446655440020', '550e8400-e29b-41d4-a716-446655440000', 'Login Issue', 'Cannot login to the system', 'open', 'high', '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440010'),
('550e8400-e29b-41d4-a716-446655440021', '550e8400-e29b-41d4-a716-446655440000', 'Password Reset', 'Need to reset password', 'in_progress', 'medium', '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440010'),
('550e8400-e29b-41d4-a716-446655440022', '550e8400-e29b-41d4-a716-446655440000', 'Feature Request', 'Need new feature', 'open', 'low', '550e8400-e29b-41d4-a716-446655440003', NULL, '550e8400-e29b-41d4-a716-446655440011');

-- Insert test comments
INSERT INTO "TicketComment" (id, "ticketId", "userId", comment) VALUES 
('550e8400-e29b-41d4-a716-446655440030', '550e8400-e29b-41d4-a716-446655440020', '550e8400-e29b-41d4-a716-446655440002', 'Looking into this issue'),
('550e8400-e29b-41d4-a716-446655440031', '550e8400-e29b-41d4-a716-446655440020', '550e8400-e29b-41d4-a716-446655440003', 'Thanks for the quick response'),
('550e8400-e29b-41d4-a716-446655440032', '550e8400-e29b-41d4-a716-446655440021', '550e8400-e29b-41d4-a716-446655440002', 'Password reset email sent');

-- Insert test SLAs
INSERT INTO "SLA" (id, "tenantId", name, description, "responseTime", "resolutionTime", priority, "departmentId", "isActive") VALUES 
('550e8400-e29b-41d4-a716-446655440040', '550e8400-e29b-41d4-a716-446655440000', 'High Priority SLA', 'SLA for high priority tickets', 2, 8, 'high', '550e8400-e29b-41d4-a716-446655440010', true),
('550e8400-e29b-41d4-a716-446655440041', '550e8400-e29b-41d4-a716-446655440000', 'Medium Priority SLA', 'SLA for medium priority tickets', 4, 24, 'medium', '550e8400-e29b-41d4-a716-446655440010', true),
('550e8400-e29b-41d4-a716-446655440042', '550e8400-e29b-41d4-a716-446655440000', 'Low Priority SLA', 'SLA for low priority tickets', 8, 72, 'low', '550e8400-e29b-41d4-a716-446655440010', true);

-- Insert test attachments
INSERT INTO "Attachment" (id, filename, "originalName", "mimeType", size, "filePath", url, "ticketId", "uploadedBy", "tenantId") VALUES 
('550e8400-e29b-41d4-a716-446655440060', 'screenshot.png', 'screenshot.png', 'image/png', 1024000, '/uploads/screenshot.png', '/uploads/screenshot.png', '550e8400-e29b-41d4-a716-446655440020', '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440000'),
('550e8400-e29b-41d4-a716-446655440061', 'error_log.txt', 'error_log.txt', 'text/plain', 2048, '/uploads/error_log.txt', '/uploads/error_log.txt', '550e8400-e29b-41d4-a716-446655440021', '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440000');

-- Insert test workflows
INSERT INTO "Workflow" (id, "tenantId", name, description, rules, "isActive") VALUES 
('550e8400-e29b-41d4-a716-446655440050', '550e8400-e29b-41d4-a716-446655440000', 'Auto Assignment', 'Automatically assign tickets to available agents', '{"autoAssign": true, "roundRobin": true}', true),
('550e8400-e29b-41d4-a716-446655440051', '550e8400-e29b-41d4-a716-446655440000', 'Escalation', 'Escalate tickets based on priority and time', '{"escalateAfter": 24, "escalateTo": "supervisor"}', true);