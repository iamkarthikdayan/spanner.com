const User = require('../models/userModel');
const ServiceProvider = require('../models/serviceProviderModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')




const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};


const createUser = async (req, res) => {
  const { name, email, password_hash, phone_number, address, role, timestamp, service_type } = req.body;
  if (!name || !email || !password_hash || !phone_number || !address || !service_type)
    return res.status(400).json({ error: 'All fields are required' });
  const hash = await bcrypt.hash(password_hash, process.env.BCRYPT_SALT_ROUNDS);
  const user = new User({
    name,
    email,
    password_hash: hash,
    phone_number,
    address,
    role,
  });
  await user.save();
  res.message.json(user, "User created successfully");
};



const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password_hash, phone_number, address, role, service_type } = req.body;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  user.name = name || user.name;
  user.email = email || user.email;
  user.password_hash = password_hash || user.password_hash;
  user.phone_number = phone_number || user.phone_number;
  user.address = address || user.address;
  user.role = role || user.role;
  user.service_type = service_type || user.service_type;
  await user.save();
  res.json({ message: 'User updated successfully', user });
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const backname = await User.findOne({ email })

  const flag = await bcrypt.compare(password, backname.password)
  if (flag) {
    const token = jwt.sign({
      userId: backname._id, username: backname.name, email: backname.email
    },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )
    res.json({ message: 'User logined sucessfully', token })
  }
  else if (await User.find({ email })) {
    res.send('Password incorrect')
  }
  else {
    res.send('User not found')

  }
}


const blockuser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  user.block_status = true;
  await user.save();
  res.json({ message: 'User blocked successfully', user });
};
const unblockuser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  user.block_status = false;
  await user.save();
  res.json({ message: 'User unblocked successfully', user });
};
const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
};
module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  getUserById,
  userLogin,
  blockuser,
  unblockuser,
};