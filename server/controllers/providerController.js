const ServiceProvider = require('../models/ServiceProviderModel');
const Repair = require('../models/ServiceRequestModel');

const getRequests = async (req, res) => {
  try {
    const requests = await Repair.find({ assigned_provider_id: req.user.userId });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
};


const updateStatus = async (req, res) => {
  try {
    const updated = await Repair.findByIdAndUpdate(req.params.id, {
      status: req.body.status,
      updated_at: new Date()
    }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update status' });
  }
};

const getAllProviders = async (req, res) => {
  try {
    const providers = await ServiceProvider.find();
    res.json(providers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch service providers' });
  }
};

const getProviderById = async (req, res) => {
  try {
    const provider = await ServiceProvider.findById(req.params.id);
    if (!provider) return res.status(404).json({ error: 'Provider not found' });
    res.json(provider);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch provider' });
  }
};
const createProvider = async (req, res) => {
  const { name, email, phone_number, address,experience_years,location,services_offered,bu } = req.body;
  if (!name || !email || !phone_number || !address)
    return res.status(400).json({ error: 'All fields are required' });

  const provider = new ServiceProvider({
    name,
    email,
    phone_number,
    bussiness_name: req.body.bussiness_name || 'Default Business Name',
    bussiness_license: req.body.bussiness_license || 'Default License',
    image_url: req.body.image_url || 'https://example.com/default-profile.png',   
    documents: req.body.documents || [],
    verification_status: 'pending',
    password_hash: req.body.password_hash || 'defaultpasswordhash',
    services_offered,
    experience_years,
    location: location ,
    address,
    created_at: new Date(),
    updated_at: new Date()
  });

  try {
    await provider.save();
    res.status(201).json({ message: 'Service Provider created successfully', provider });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create service provider' });
  }
};
module.exports = {
  getRequests,
  updateStatus,
  getAllProviders,
  getProviderById,
  createProvider
};