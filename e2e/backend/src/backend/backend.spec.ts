import axios from 'axios';

describe('GET /api', () => {
  it('should return a message', async () => {
    console.info(axios.defaults.baseURL);
    const res = await axios.get(`/api`);

    expect(res.status).toBe(200);
    expect(res.data).toEqual({ message: 'Hello API' });
  });
});
