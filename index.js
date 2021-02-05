const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./models');

require('dotenv').config();

const apiKeysRouter = require('./routes/apiKeys');
const authRouter = require('./routes/auth');
const {
  proxyMiddleware,
  authValidator,
} = require('./middlewares/proxyMiddleware');

const app = express();

const PORT = 3001;
const HOST = 'localhost';

app.use(bodyParser.json());
app.use(
  cors({
    origin: true,
    credentials: true,
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Authorization, Set-Cookie',
  })
);

app.get('/', (req, res) => {
  res.send('Server working');
});

app.use('/', authRouter);
app.use('/api_keys', apiKeysRouter);

app.use('/', authValidator, proxyMiddleware);

// Sequelize db connection
db.sequelize
  .sync()
  .then(() => {
    console.log('Connected');
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, HOST, () => {
  console.log(`Proxy server started at ${HOST}:${PORT}`);
});
