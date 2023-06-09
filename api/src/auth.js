const { SECRET_TOKEN } = process.env;

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || authorization !== SECRET_TOKEN) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};

module.exports = authMiddleware;
