const User = require('../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

const createUser = async (req,res) => {
  const { name, email, password_hash, phone_number, address, role,timestamp } = req.body;
  if (!name || !email || !password_hash || !phone_number || !address)
    return res.status(400).json({ error: 'All fields are required' });
    const hash = await bcrypt.hash(password_hash, process.env.BCRYPT_SALT_ROUNDS);
  const user = new User({
    name,
    email,
    password_hash: hash,
    phone_number,
    address,
    role,
    created_at: timestamp || new Date(),
    updated_at: new Date()
  });
  await user.save();
  res.message.json(user,"User created successfully");
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


module.exports = {
  getAllUsers,
  createUser,
  userLogin
};