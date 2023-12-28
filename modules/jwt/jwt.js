var jwt = require("jsonwebtoken");
const generateAccessToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
  };

  const secret =
    process.env.JWT_KEY ||
    "$2b$10$rFtc6jbYZHP4Lkp6e/CCruzc9EZPec084CuKOD.Xp00TnlyyAs3c2";
  const options = { expiresIn: process.env.JWT_TIME || "1h" };

  return jwt.sign(payload, secret, options);
};

const verifyAccessToken = (token) => {
  const secret =
    process.env.JWT_KEY ||
    "$2b$10$rFtc6jbYZHP4Lkp6e/CCruzc9EZPec084CuKOD.Xp00TnlyyAs3c2";

  try {
    const decoded = jwt.verify(token, secret);
    return { success: true, data: decoded };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

module.exports = { verifyAccessToken, generateAccessToken };
