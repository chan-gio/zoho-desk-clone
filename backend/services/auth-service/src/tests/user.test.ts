import request from 'supertest';
import app from '../app';

function randomEmail() {
  return `testuser_${Date.now()}@example.com`;
}
function randomUsername() {
  return `testuser_${Date.now()}`;
}

describe('UserController', () => {
  let token: string;
  const username = randomUsername();
  const email = randomEmail();
  const password = 'testpass123';

  beforeAll(async () => {
    // Đăng ký user mới
    await request(app)
      .post('/auth/register')
      .send({
        username,
        email,
        password,
        role: 'admin',
        tenantName: 'TestTenant',
      });
    // Đăng nhập để lấy token
    const res = await request(app)
      .post('/auth/login')
      .send({
        email,
        password,
      });
    token = res.body.data.access_token;
  });

  it('should get users list', async () => {
    const res = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should get user by id', async () => {
    const res = await request(app)
      .get('/users/1')
      .set('Authorization', `Bearer ${token}`);
    expect([200, 404]).toContain(res.status);
  });
}); 