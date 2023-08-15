const crypto = require("crypto");

// Generate a secure random secret key
const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex"); // 32 bytes for a 256-bit key
  return secretKey;
};

const secretKey = generateSecretKey();
console.log("Generated Secret Key:", secretKey);
