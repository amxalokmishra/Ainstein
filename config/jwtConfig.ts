export default {
    secret: process.env.JWT_SECRET || 'default_secret',
    expiresIn: '30d',
  };
  