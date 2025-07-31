const ServiceProvider = require('../models/serviceProviderModel');
const User = require('../models/userModel');


const checkBlockStatus = async (req, res, next) => {
  try {
    const providerId = req.user && req.user._id ? req.user._id : req.params.id;
    const provider = await ServiceProvider.findById(providerId);
    if (!provider) {
      return res.status(404).json({ error: 'Service provider not found' });
    }
    if (provider.block_status) {
      return res.status(403).json({ error: 'Your account is blocked.' });
    }
    next();
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

const checkUserBlockStatus = async (req, res, next) => {
  try {
    const userId = req.user && req.user._id ? req.user._id : req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (user.block_status) {
      return res.status(403).json({ error: 'Your account is blocked.' });
    }
    next();
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {checkBlockStatus, checkUserBlockStatus};
