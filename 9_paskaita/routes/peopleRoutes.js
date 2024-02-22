const express = require('express');
require('dotenv').config();
const { MongoClient } = require('mongodb');

const router = express.Router(); // sukuriam router instance
const URI = process.env.DB_CONNECTION_STRING;
const client = new MongoClient(URI);

router.get('/people', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('demo1')
      .collection('people')
      .aggregate([
        {
          $lookup: {
            from: 'coolPets',
            localField: '_id',
            foreignField: 'ownerId',
            as: 'pets',
          },
        },
      ])
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.post('/people', async (req, res) => {
  try {
    const newPerson = req.body;
    const con = await client.connect();
    const dbRes = await con.db('demo1').collection('people').insertOne(newPerson);
    await con.close();
    res.send(dbRes);
  } catch (err) {
    res.status(500).send({ err });
  }
});

module.exports = router; // exportuojam
