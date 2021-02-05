const express = require('express');
const uuidAPIKey = require('uuid-apikey');

const authMiddleware = require('../middlewares/authMiddleware');
const db = require('../models');

const apiKeysRouter = express.Router();
apiKeysRouter.use(authMiddleware);

apiKeysRouter.get('/get_key', async (req, res) => {
  const { email } = req.query;

  console.log('email: ', email);
  const data = await db.User.findOne({ where: { email } });

  console.log('data: ', data);
  if (data) {
    return res.status(200).send({ apiKey: data.dataValues.apiKey });
  } else {
    return res.sendStatus(401);
  }
});

apiKeysRouter.post('/add_key', async (req, res) => {
  const { email } = req.body;

  const apiKey = uuidAPIKey.create();
  const data = await db.User.update(apiKey, { where: { email } });
  if (data[0]) {

    return res.status(200).send(apiKey);
  } else {
    return res.sendStatus(401);
  }
});

apiKeysRouter.delete('/delete_key', async (req, res) => {
  const { email } = req.body;

  const data = await db.User.update({ apiKey: '' }, { where: { email } });
  console.log('data: ', data);
  if (data[0]) {
    return res.status(200).send({ apiKey: '' });
  } else {
    return res.sendStatus(401);
  }
});

module.exports = apiKeysRouter;
