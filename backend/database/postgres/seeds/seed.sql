-- Seed tenants
INSERT INTO tenants (name) VALUES ('Acme Corp'), ('Beta Inc');

-- Seed users
INSERT INTO users (tenant_id, username, email, password_hash, role)
VALUES
  ((SELECT id FROM tenants WHERE name='Acme Corp'), 'admin1', 'admin1@acme.com', 'hashed_pw', 'admin'),
  ((SELECT id FROM tenants WHERE name='Beta Inc'), 'agent1', 'agent1@beta.com', 'hashed_pw', 'agent');

-- Seed departments
INSERT INTO departments (tenant_id, name)
VALUES
  ((SELECT id FROM tenants WHERE name='Acme Corp'), 'Support'),
  ((SELECT id FROM tenants WHERE name='Beta Inc'), 'Sales');

-- Seed tickets
INSERT INTO tickets (tenant_id, title, description, status, priority, creator_id, assignee_id, department_id)
VALUES
  ((SELECT id FROM tenants WHERE name='Acme Corp'), 'Cannot login', 'User cannot login to portal', 'open', 'high', (SELECT id FROM users WHERE username='admin1'), NULL, (SELECT id FROM departments WHERE name='Support')); 