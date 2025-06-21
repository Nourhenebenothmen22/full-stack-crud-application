const express = require('express');
const dotenv = require('dotenv');
const connectdb = require('./utils/db');

dotenv.config();

const app = express();
app.use(express.json());

connectdb();
const userRoute=require("./Routes/route")
app.use('/api',userRoute)

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
