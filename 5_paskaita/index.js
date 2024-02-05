const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

const data = JSON.parse(`[
  {
    "id": 1,
    "name": "iPhone 13",
    "category": "Telefonai",
    "price": 1100,
    "stock": 10
  },
  {
    "id": 2,
    "name": "Samsung Galaxy S22",
    "category": "Telefonai",
    "price": 900,
    "stock": 5
  },
  {
    "id": 3,
    "name": "Dell XPS 15",
    "category": "Nešiojami kompiuteriai",
    "price": 2000,
    "stock": 3
  },
  {
    "id": 4,
    "name": "MacBook Pro",
    "category": "Nešiojami kompiuteriai",
    "price": 2500,
    "stock": 20
  },
  {
    "id": 5,
    "name": "Sony WH-1000XM4",
    "category": "Ausinės",
    "price": 350,
    "stock": 8
  },
  {
    "id": 6,
    "name": "Bose QuietComfort 35 II",
    "category": "Ausinės",
    "price": 300,
    "stock": 12
  }
]
  `);

app.get('/products/prices/:min/:max', (req, res) => {
  const { min, max } = req.params;

  const filteredByPrices = data.filter((product) => product.price >= +min && product.price <= +max);
  res.send(filteredByPrices);
});

app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});
