const Repair = require('../models/ServiceRequest');

const createRequest = async (req, res) => {
  const { userId, commoditytype,image,provider_id,preferred_date, issueDescription, timestamp } = req.body;
  if (!userId || !commoditytype || !issueDescription||!image)
    return res.status(400).json({ error: 'All fields are required' })
  if (!provider_id || !preferred_date)
    return res.status(400).json({ error: 'Provider ID and preferred date are required' });

  const repairRequest = new Repair({
    userId,
    commoditytype,
    issueDescription,
    images,
    provider_id,
    preferred_date,
    status: 'Pending',
  });

  try {
    await repairRequest.save();
    res.status(201).json({ message: 'Request created successfully', repairRequest });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create request' });
  }
};
const trackRequest = async (req, res)=>{
  try {
    const repair = await Repair.findById(req.params.user_id);
    if (!repair||repair.status=="finished") return res.status(404).json({ error: 'Request not found' });
    res.json(repair);
  } catch (err) {
    res.status(500).json({ error: 'Failed to track request' });
  }
  };
const getAllRequestsprovider = async (req, res) => {
  try {
    const requests = await Repair.find(req.params.provider_id ? { provider_id: req.params.provider_id } : {});
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve requests' });
  }
};
const getAllRequestsuser = async (req, res) => {
  try {
    const requests = await Repair.find({ userId: req.params.user_id });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve requests' });
  }
}
const repairstatuschange = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const repair = await Repair.findById(id);
    if (!repair) {
      return res.status(404).json({ error: 'Repair request not found' });
    }
    repair.status = status;
    await repair.save();
    res.json({ message: 'Repair request status updated successfully', repair });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update repair request status' });
  }
}
module.exports = {
  createRequest,
  trackRequest,
  getAllRequestsprovider,
  getAllRequestsuser,
  repairstatuschange
};