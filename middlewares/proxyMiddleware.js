const { createProxyMiddleware } = require('http-proxy-middleware');

const db = require('../models');

const API_SERVICE_URL = 'http://localhost:5001/';

const authValidator = async (req, res) => {
  const reqApiKey = req.headers['x-api-key'];
  if (!reqApiKey) return res.sendStatus(401);
  const user = await db.User.findOne({ where: { apiKey: reqApiKey } });
  if (!user) return res.sendStatus(401);
  req.next();
};

const proxyMiddleware = createProxyMiddleware({
  target: API_SERVICE_URL,
  changeOrigin: true,
});

module.exports = { proxyMiddleware, authValidator };
