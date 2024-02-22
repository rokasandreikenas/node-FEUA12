const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
require('dotenv').config();

const router = express.Router();
const URI = process.env.DB_CONNECTION_STRING;
const client = new MongoClient(URI);

router.post('/register', async (req, res) => {
  try {
    const newUser = req.body;
    const con = await client.connect();

    if (!newUser.email || !newUser.password) {
      return res.status(400).send({ error: 'Email and password are required fields!' });
    }

    const userAlreadyExists = await con.db('demo1').collection('users').findOne({ email: newUser.email });

    if (userAlreadyExists) {
      return res.status(400).send({ error: 'User already exists' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newUser.password, saltRounds);
    const data = await con
      .db('demo1')
      .collection('users')
      .insertOne({ ...newUser, password: hashedPassword });
    await con.close();
    return res.send(data);
  } catch (error) {
    return res.status(500).send({ error });
  }
});

router.post('/login', async (req, res) => {
  try {
    const newPet = { ...req.body, ownerId: new ObjectId(`${req.body.ownerId}`) };
    const con = await client.connect();
    const dbRes = await con.db('demo1').collection('coolPets').insertOne(newPet);
    await con.close();
    res.send(dbRes);
  } catch (err) {
    res.status(500).send({ err });
  }
});

module.exports = router;
