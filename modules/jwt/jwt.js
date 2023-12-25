
const generateAccessToken = (user) => {
    const payload = {
      id: user.id,
      email: user.email
    };
    
    const secret = process.env.JWT_KEY;
    const options = { expiresIn: process.env.JWT_TIME };
  
    return jwt.sign(payload, secret, options);
  }

  const verifyAccessToken = (token) => {
    const secret = process.env.JWT_KEY;
  
    try {
      const decoded = jwt.verify(token, secret);
      return { success: true, data: decoded };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  module.exports = {verifyAccessToken,generateAccessToken}

