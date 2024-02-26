/* eslint-disable max-len */
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const petRoutes = require('./routes/petRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 8080;

// /auth/register
// /auth/login

// 1. /auth/register su body {email: "rokas@gmail.com" firstName: "Rokas", surname: "Andreikenas", password: "rokas123!"}
// 1.1 Check if that user exists and have all required fields
// 1.2 Save user with hashed password ("rokas123!" => "5f4dcc3b5aa765d61d8327deb882cf99")
// 2. /auth/login su body {email: "rokas@gmail.com", password: "rokas123!"}
// 2.1 Check if that user with given email and password exists
// 2.2 When check password we need to hash given password to match DB password ("rokas123!" => "5f4dcc3b5aa765d61d8327deb882cf99" === DBPassword)
// 2.3 If credentials are correct return token (JSON Web Tokens)
// 3. Token is special string which are used for communicating between front-end and backend
// 3.1 Token is placed in API headers as Bearer token so backend can verify that caller is authenticated

app.use('/auth', authRoutes);
app.use('/pets', petRoutes);

app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});
