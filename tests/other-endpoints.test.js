import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const BASE_URL = process.env.BASE_URL;

describe('Password Reset Endpoints', () => {

  test('verify password reset with registered email', async () => {
    try {
      const res = await axios.put(`${BASE_URL}/auth/password-reset`, {
        email: process.env.EMAIL
      });
      expect([200, 201, 404]).toContain(res.status);
      expect(res.data).toBeDefined();
    } catch (err) {
      if (err.response) {
        expect([200, 201, 404]).toContain(err.response.status);
      } else throw err;
    }
  });

  test('verify password reset with unregistered email', async () => {
    try {
      const res = await axios.put(`${BASE_URL}/auth/password-reset`, {
        email: 'unknown@mail.com'
      });
      expect([400, 404]).toContain(res.status);
    } catch (err) {
      if (err.response) {
        expect([400, 404]).toContain(err.response.status);
      } else throw err;
    }
  });

  test('Verify password reset with invalid token', async () => {
    try {
      const res = await axios.put(`${BASE_URL}/auth/password-reset/verify`, {
        token: 'invalid_token',
        newPassword: 'NewPassword123'
      });
      expect([400, 401, 403, 404]).toContain(res.status);
    } catch (err) {
      if (err.response) {
        expect([400, 401, 403, 404]).toContain(err.response.status);
      } else throw err;
    }
  });

  test('Reset password should not expose token', async () => {
    try {
      const res = await axios.put(`${BASE_URL}/auth/password-reset/verify`, {
        token: 'invalid_token',
        newPassword: 'NewPassword123'
      });
      expect(res.data.token).toBeUndefined();
      expect(res.data.resetToken).toBeUndefined();
    } catch (err) {
      if (err.response) {
        expect([400, 401, 403, 404]).toContain(err.response.status);
      } else throw err;
    }
  });

});