require('dotenv').config()


const express = require('express');
const app = express();
const path = require('path')
const cors = require('cors')

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(cors())
app.use(express.json())



const productrouter = require('./routes/productRouter')
app.use('/product', productrouter)


const userrouter = require('./routes/userRouter')
app.use('/user', userrouter)

app.listen(process.env.PORT, () => {
    console.log(`Server is runnning on port ${process.env.PORT}`);
})