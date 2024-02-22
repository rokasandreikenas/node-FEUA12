const express = require('express');
require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb'); // Importuojame iš šio modulio klientą

const router = express.Router();
const URI = process.env.DB_CONNECTION_STRING;
const client = new MongoClient(URI);

router.get('/', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('demo1')
      .collection('coolPets')
      .aggregate([
        {
          $lookup: {
            from: 'people', // The collection to join with
            localField: 'ownerId', // The field from the pets collection
            foreignField: '_id', // The field from the people collection
            as: 'owner', // The output array where the joined data will be
          },
        },
        {
          // removes array brackets
          $unwind: {
            path: '$owner',
            preserveNullAndEmptyArrays: true, // show pets without an owner too
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

router.post('/', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db('demo1')
      .collection('coolPets')
      .deleteOne({ _id: new ObjectId(id) });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

module.exports = router;
