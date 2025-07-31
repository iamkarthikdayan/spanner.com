const ServiceProvider = require('../models/ServiceProviderModel');
const Repair = require('../models/ServiceRequestModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Get all service providers
const getAllProviders = async (req, res) => {
  try {
    const providers = await ServiceProvider.find();
    res.json(providers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch service providers' });
  }
};

// Get provider by ID
const getProviderById = async (req, res) => {
  try {
    const provider = await ServiceProvider.findById(req.params.id);
    if (!provider) return res.status(404).json({ error: 'Provider not found' });
    res.json(provider);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch provider' });
  }
};

// Create a new service provider
const createProvider = async (req, res) => {
  const { name, phone_number, bussiness_name, bussiness_license, image_url, documents, email, password_hash, services_offered, experience_years, address, location } = req.body;
  if (!name || !phone_number || !bussiness_name || !bussiness_license || !email || !password_hash || !services_offered || !experience_years || !address || !location)
    return res.status(400).json({ error: 'All fields are required' });

  const hash = await bcrypt.hash(password_hash, Number(process.env.BCRYPT_SALT_ROUNDS) || 10);
  const serviceProvider = new ServiceProvider({
    name,
    phone_number,
    bussiness_name,
    bussiness_license,
    image_url: image_url || 'https://example.com/default-profile.png',
    documents: documents || [],
    email,
    password_hash: hash,
    services_offered,
    experience_years,
    address,
    location
  });
  try {
    await serviceProvider.save();
    res.status(201).json({ message: 'Service Provider created successfully', serviceProvider });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create service provider' });
  }
};

// Update service provider
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
  serviceProvider.password_hash = password_hash ? await bcrypt.hash(password_hash, Number(process.env.BCRYPT_SALT_ROUNDS) || 10) : serviceProvider.password_hash;
  serviceProvider.services_offered = services_offered || serviceProvider.services_offered;
  serviceProvider.experience_years = experience_years || serviceProvider.experience_years;
  serviceProvider.address = address || serviceProvider.address;
  serviceProvider.location = location || serviceProvider.location;
  await serviceProvider.save();
  res.json({ message: 'Service Provider updated successfully', serviceProvider });
};

// Provider login
const providerLogin = async (req, res) => {
  const { email, password } = req.body;
  const provider = await ServiceProvider.findOne({ email });
  if (!provider) {
    return res.status(404).json({ error: 'User not found' });
  }
  const flag = await bcrypt.compare(password, provider.password_hash);
  if (flag) {
    const token = jwt.sign(
      {
        userId: provider._id,
        username: provider.name,
        email: provider.email
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ message: 'User logged in successfully', token });
  } else {
    res.status(401).json({ error: 'Password incorrect' });
  }
};

// Block provider
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

// Unblock provider
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
  getAllProviders,
  getProviderById,
  createProvider,
  blockprovider,
  unblockprovider,
  providerLogin,
  updateProvider
}