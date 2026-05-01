import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const getToken = async () => {
  const url = `${process.env.BASE_URL}/auth/login`;
  const email = process.env.EMAIL;
  const password = process.env.PASSWORD;

  try {
    const res = await axios.post(url, { email, password });

    const token =
      res.data?.token ||
      res.data?.data?.token ||
      res.data?.accessToken ||
      res.data?.data?.accessToken;

    if (!token) {
      throw new Error('Token not found in login response');
    }

    return token;
  } catch (error) {
    if (error.response) {
      const errorMsg = `Login failed with status ${error.response.status}: ${error.response.statusText || ''}`;
      const err = new Error(errorMsg);
      err.status = error.response.status;
      throw err;
    }
    throw error;
  }
};

export { getToken };