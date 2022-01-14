const jwt = require("jsonwebtoken");
const { responseError } = require("./response");


exports.verifyToken = (req, res, next) => {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    (req.headers["authorization"]
      ? req.headers["authorization"].split(" ")[1]
      : null);

  if (!token) {
    responseError(res, 403, "Veuillez saisir un token.");
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.decoded = decoded;
  } catch (err) {
    responseError(res, 403, "Token incorrect");
  }

  next();
};
