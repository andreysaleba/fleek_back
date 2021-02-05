const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer || bearer.split(' ').length < 2) {
    return res.sendStatus(401);
  }

  const token = bearer.split(' ')[1];

  try {
    jwt.verify(token, process.env.API_JWT_SECRET);
    next();
  } catch(error) {
    console.log({ error });
    res.sendStatus(401);
  }
};

module.exports = authMiddleware;
