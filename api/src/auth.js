const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || authorization !== "my-secret-token") {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};

module.exports = authMiddleware;
