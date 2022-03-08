const requireLogin = (req, res, next) => {
  console.log("hello");
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "You must be logged in" });
  }
  try {
    const { userId } = jwt.verify(authorization, JWT_SECRET);
    req.user = userId;
    next();
  } catch (err) {
    return res.status(401).json({ error: err }); //"You must be logged in"
  }
};

module.exports = requireLogin;
