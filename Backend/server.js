const express = require('express');
const dotenv = require('dotenv');
const connectdb = require('./utils/db');
const cors = require('cors'); // Correction ajoutée ici

dotenv.config();

const app = express();
app.use(cors({
  origin: '*', // Autorisez toutes les origines temporairement
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

connectdb();
const userRoute = require("./Routes/route");
app.use('/api', userRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});