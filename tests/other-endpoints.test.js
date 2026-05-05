import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const BASE_URL = process.env.BASE_URL;

describe('Password Reset Endpoints', () => {

  const REGISTER_EMAIL = process.env.EMAIL;

  test('Request password reset with registered email', async () => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/password-reset`, {
        email: REGISTER_EMAIL
      });

      expect([200, 201]).toContain(res.status);
      expect(res.data).toBeDefined();
    } catch (err) {
      if (err.response) {
        expect([404]).toContain(err.response.status);
      } else {
        throw err;
      }
    }
  });

  test('Request password reset with unregistered email', async () => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/password-reset`, {
        email: 'unknown@mail.com'
      });
      expect([400, 404]).toContain(res.status);
    } catch (err) {
      expect([400, 404]).toContain(err.response.status);
    }
  });

  test('Verify password reset with invalid token', async () => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/password-reset/verify`, {
        token: 'invalid_token',
        newPassword: 'NewPassword123'
      });
      expect([400, 401, 403, 404, 422]).toContain(res.status);
    } catch (err) {
      expect([400, 401, 403, 404, 422]).toContain(err.response.status);
    }
  });

  test('Reset password should NOT expose token in response', async () => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/password-reset/verify`, {
        token: 'invalid_token',
        newPassword: 'NewPassword123'
      });

      expect(res.status).toBe(200);
      expect(res.data.token).toBeUndefined();
      expect(res.data.resetToken).toBeUndefined();

    } catch (err) {
      // Even in failure, ensure no token leak
      expect(err.response.data.token).toBeUndefined();
      expect(err.response.data.resetToken).toBeUndefined();
    }
  });

});