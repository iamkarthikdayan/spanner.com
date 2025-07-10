const User = require('../models/User');
const ServiceProvider = require('../models/ServiceProvider');
const Repair = require('../models/ServiceRequest');

exports.getUsers = async (req, res) => {
  const users = await User.find({ role: 'User' });
  res.json(users);
};

exports.getProviders = async (req, res) => {
  const providers = await ServiceProvider.find();
  res.json(providers);
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
};
