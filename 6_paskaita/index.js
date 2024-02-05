const express = require('express');
const { MongoClient, ObjectId } = require('mongodb'); // Importuojame iš šio modulio klientą
require('dotenv').config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 8080;
const URI = 'mongodb+srv://admin:admin@cluster0.gykitzd.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(URI);

// find().toArray(); suranda ir grąžinu visus elementus
app.get('/', async (req, res) => {
  try {
    const con = await client.connect(); // prisijungiam prie DB
    const data = await con.db('demo1').collection('cars').find().toArray(); // atliekam veiksmus
    await con.close(); // atsijungiam
    res.send(data); // grazinam duomenis
  } catch (error) {
    res.status(500).send({ error });
  }
});

// .insertOne({ name: 'Petras', surname: 'Slekys' }); - prideda vieną elementą
app.post('/vw', async (req, res) => {
  try {
    const con = await client.connect(); // same
    const dbRes = await con.db('demo1').collection('cars').insertOne({ brand: 'VW', model: 'Passat' });
    await con.close(); // same
    res.send(dbRes); // same
  } catch (err) {
    res.status(500).send({ err }); // same
  }
});

// .insertOne(body); - prideda vieną elementą
app.post('/', async (req, res) => {
  try {
    const newCar = req.body;
    const con = await client.connect(); // same
    const dbRes = await con.db('demo1').collection('cars').insertOne(newCar);
    await con.close(); // same
    res.send(dbRes); // same
  } catch (err) {
    res.status(500).send({ err }); // same
  }
});

// .countDocuments()
app.get('/count', async (req, res) => {
  try {
    const con = await client.connect();
    const count = await con.db('demo1').collection('cars').countDocuments(); // pvz.: 5
    await con.close();
    res.send({ count }); // wrap in object braces
  } catch (error) {
    res.status(500).send({ error });
  }
});

// .findOne({ _id: new ObjectId(id) });
app.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db('demo1')
      .collection('cars')
      .findOne({ _id: new ObjectId(id) });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});
