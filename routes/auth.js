const express = require('express');
const jwt = require('jsonwebtoken');

const db = require('../models');
const authMiddleware = require('../middlewares/authMiddleware');

const authRouter = express.Router();

authRouter.use('/check_token', authMiddleware);
authRouter.get('/check_token', async (req, res) => {
  res.status(200).send({ Result: "Success" });
});

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const data = await db.User.findOne({
      where: {
        email,
        password,
      },
    });

    if (!data) return res.sendStatus(401);

    const jwtToken = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
        data: email,
      },
      process.env.API_JWT_SECRET
    );
    const tokenUpdating = await db.User.update(
      { jwtToken },
      { where: { email } }
    );
    if (!tokenUpdating[0]) return res.sendStatus(401);

    console.log('jwtToken;' , jwtToken);

    return res.status(200).send({ token: jwtToken });
  } catch {
    res.sendStatus(401);
  }
});

module.exports = authRouter;
