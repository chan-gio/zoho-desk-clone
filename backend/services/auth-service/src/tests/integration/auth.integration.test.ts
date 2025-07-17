import request from 'supertest';
import app from '../../app';

function randomEmail() {
  return `integration_${Date.now()}@example.com`;
}
function randomUsername() {
  return `integration_${Date.now()}`;
}

describe('Auth Integration', () => {
  let refreshToken: string;
  const username = randomUsername();
  const email = randomEmail();
  const password = 'integrationpass';

  it('should register and login, then refresh token', async () => {
    const registerRes = await request(app)
      .post('/auth/register')
      .send({
        username,
        email,
        password,
        role: 'admin',
        tenantName: 'IntegrationTenant',
      });
    expect(registerRes.status).toBe(201);

    const loginRes = await request(app)
      .post('/auth/login')
      .send({
        email,
        password,
      });
    expect(loginRes.status).toBe(200);
    refreshToken = loginRes.body.data.refresh_token;

    const refreshRes = await request(app)
      .post('/auth/refresh')
      .send({ refresh_token: refreshToken });
    expect(refreshRes.status).toBe(200);
    expect(refreshRes.body.data).toHaveProperty('access_token');
  });
}); 