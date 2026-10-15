const jwt = require("jsonwebtoken");

let JWT_SECRET = "secret_key"; //|| process.env.JWT_SECRET;
const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ msg: "No auth headers provided" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "No Token provided" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    ((req.user = decoded), next());
  } catch (err) {
    return res.status(403).json({
      title: "Erro authenticating user",
      name: err.name,
      msg: err.message,
    });
  }
};

module.exports = {
  authenticateJWT,
};
