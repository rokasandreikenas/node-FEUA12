const express = require('express');
const cors = require('cors');
const petRoutes = require('./routes/petRoutes');
const peopleRoutes = require('./routes/peopleRoutes'); // importuojam route instance
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 8080;

app.use('/pets', petRoutes); // su prefix
app.use(peopleRoutes); // panaudojam

app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});
