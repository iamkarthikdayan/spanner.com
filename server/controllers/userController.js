const User = require('../models/userModel');
const ServiceProvider = require('../models/serviceProviderModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')




const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

const getAllProviders = async (req, res) => {
  const providers = await ServiceProvider.find();
  res.json(providers);
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

const createProvider = async (req, res) => {
  const { name, phone_number, bussiness_name, bussiness_license, image_url, documents, email, password_hash, services_offered, experience_years, address, location } = req.body;
  if (!name || !phone_number || !bussiness_name || !bussiness_license || !email || !password_hash || !services_offered || !experience_years || !address || !location)
    return res.status(400).json({ error: 'All fields are required' });
  
  const hash = await bcrypt.hash(password_hash, process.env.BCRYPT_SALT_ROUNDS);
  const serviceProvider = new ServiceProvider({
    name,
    phone_number,
    bussiness_name,
    bussiness_license,
    image_url,
    documents,
    email,
    password_hash: hash,
    services_offered,
    experience_years,
    address,
    location
  });
  await serviceProvider.save();
  res.status(201).json({ message: 'Service Provider created successfully', serviceProvider });
};
const updateProvider = async (req, res) => {
  const { id } = req.params;
  const { name, phone_number, bussiness_name, bussiness_license, image_url, documents, email, password_hash, services_offered, experience_years, address, location } = req.body;
  const serviceProvider = await ServiceProvider.findById(id);
  if (!serviceProvider) {
    return res.status(404).json({ error: 'Service Provider not found' });
  }
  serviceProvider.name = name || serviceProvider.name;
  serviceProvider.phone_number = phone_number || serviceProvider.phone_number;
  serviceProvider.bussiness_name = bussiness_name || serviceProvider.bussiness_name;
  serviceProvider.bussiness_license = bussiness_license || serviceProvider.bussiness_license;
  serviceProvider.image_url = image_url || serviceProvider.image_url;
  serviceProvider.documents = documents || serviceProvider.documents;
  serviceProvider.email = email || serviceProvider.email;
  serviceProvider.password_hash = password_hash || serviceProvider.password_hash;
  serviceProvider.services_offered = services_offered || serviceProvider.services_offered;
  serviceProvider.experience_years = experience_years || serviceProvider.experience_years;
  serviceProvider.address = address || serviceProvider.address;
  serviceProvider.location = location || serviceProvider.location;
  await serviceProvider.save();
  res.json({ message: 'Service Provider updated successfully', serviceProvider });
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

const providerLogin = async (req, res) => {
  const { email, password } = req.body;
  const backname = await ServiceProvider.findOne({ email })

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
  else if (await ServiceProvider.find({ email })) {
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
const blockprovider = async (req, res) => {
  const { id } = req.params;
  const provider = await ServiceProvider.findById(id);
  if (!provider) {
    return res.status(404).json({ error: 'Service Provider not found' });
  }
  provider.block_status = true;
  await provider.save();
  res.json({ message: 'Service Provider blocked successfully', provider });
};
const unblockprovider = async (req, res) => {
  const { id } = req.params;
  const provider = await ServiceProvider.findById(id);
  if (!provider) {
    return res.status(404).json({ error: 'Service Provider not found' });
  }
  provider.block_status = false;
  await provider.save();
  res.json({ message: 'Service Provider unblocked successfully', provider });
};
module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  userLogin,
  providerLogin,
  createProvider,
  updateProvider,
  getAllProviders,
  blockuser,
  unblockuser,
  blockprovider,
  unblockprovider
};