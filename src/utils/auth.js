const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');

const authenticate = async (req) => {
  const token = req.headers.authorization;
  if (!token) throw new Error('Authentication required!');

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await Employee.findById(decoded.id);
  if (!user) throw new Error('User not found!');

  req.user = user;
};

const authorize = (role) => {
  return (resolver) => (parent, args, context) => {
    if (context.user.role !== role) throw new Error('Unauthorized!');
    return resolver(parent, args, context);
  };
};

module.exports = { authenticate, authorize };
