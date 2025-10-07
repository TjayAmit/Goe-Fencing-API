require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fencesRoutes = require('./routes/fences');

const app = express();

app.use(express.json());

const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';
app.use(
  cors({
    origin: allowedOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.use((req, res, next) => {
  const clientKey = req.headers['x-api-key'];
  const serverKey = process.env.API_SECRET;

  if (!serverKey) {
    console.warn('⚠️ Warning: API_SECRET is not set in .env');
    return next();
  }

  if (!clientKey || clientKey !== serverKey) {
    return res.status(403).json({ error: 'Forbidden: Invalid API key' });
  }

  next();
});

app.use('/api/fences', fencesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🛰️ Geofencing API running on port ${PORT}`));
