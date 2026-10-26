const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const BASE_URL = 'https://urja-ops.flockenergy.tech';

let sessionCookieHeader = null;
let isAuthenticated = false;

async function ensureAuthenticated() {
  if (isAuthenticated && sessionCookieHeader) return;
  try {
    const params = new URLSearchParams();
    // Use 'email' instead of 'username' based on legacy portal validation response
    params.append('email', 'operator@urja.local');
    params.append('password', 'urja-ops-2026');

    const response = await axios.post(`${BASE_URL}/login`, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': BASE_URL,
        'Referer': `${BASE_URL}/login`
      },
      maxRedirects: 0,
      validateStatus: (status) => status >= 200 && status < 405
    });

    console.log('🔍 Login Response Headers:', response.headers);

    const cookies = response.headers['set-cookie'];
    if (cookies && cookies.length > 0) {
      sessionCookieHeader = cookies.map(c => c.split(';')[0]).join('; ');
      console.log('🍪 Captured Session Cookie:', sessionCookieHeader);
    }

    isAuthenticated = true;
    console.log('✅ Authenticated successfully with Urja Meter Ops');
  } catch (error) {
    console.error('❌ Authentication failed:', error.response?.status, error.response?.data || error.message);
    throw new Error('Failed to authenticate with legacy portal');
  }
}

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'urja-ops-api-wrapper' });
});

app.get('/api/meters/:id/energy', async (req, res) => {
  try {
    await ensureAuthenticated();
    const meterId = req.params.id;

    const response = await axios.get(`${BASE_URL}/portal/meters/${meterId}/energy`, {
      headers: {
        'Cookie': sessionCookieHeader || ''
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('❌ Error details:', error.response?.status, error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || 'Failed to retrieve energy data from legacy portal' });
  }
});
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Urja Meter Ops API Wrapper! Use /api/meters/:id/energy' });
});
app.listen(PORT, () => {
  console.log(`🚀 API service running on http://localhost:${PORT}`);
});