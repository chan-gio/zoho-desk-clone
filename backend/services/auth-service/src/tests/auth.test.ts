import request from 'supertest';
import app from '../app';

function randomEmail() {
  return `testuser_${Date.now()}@example.com`;
}
function randomUsername() {
  return `testuser_${Date.now()}`;
}

describe('AuthController', () => {
  const username = randomUsername();
  const email = randomEmail();
  const password = 'testpass123';

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        username,
        email,
        password,
        role: 'admin',
        tenantName: 'TestTenant',
      });
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('id');
  });

  it('should login with correct credentials', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email,
        password,
      });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('access_token');
    expect(res.body.data).toHaveProperty('refresh_token');
  });

  it('should return 401 for wrong password', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email,
        password: 'wrongpass',
      });
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });
}); 