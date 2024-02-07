const express = require('express');
const { MongoClient, ObjectId } = require('mongodb'); // Importuojame iš šio modulio klientą
require('dotenv').config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 8080;
const URI = process.env.DB_CONNECTION_STRING;

const client = new MongoClient(URI);

app.get('/pets', async (req, res) => {
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
          $unwind: {
            path: '$owner',
            preserveNullAndEmptyArrays: true, // show pets with an owner
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

app.post('/pets', async (req, res) => {
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

app.get('/people', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db('demo1').collection('people').find().toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.post('/people', async (req, res) => {
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

app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});
