const express = require("express"); // importuojam express
const app = express(); // sukuriam express aplikaciją
const port = 3000; // uostas

// sukuriam route "/" (kelią) kuriuo užėjus grąžinsim (GET metodas) tekstą "Hello world"
app.get("/", (req, res) => {
  // req - request
  // res - response
  res.send("Hello world"); // išsiunčia kvietėjui atsakymą
});

const cars = ["Audi", "Bmw", "VW"];

app.get("/cars", (req, res) => {
  res.send(cars);
});

const students = [{ id: 1, name: "Rokas", age: 25 }];

app.get("/students", (req, res) => {
  res.send(students);
});

app.listen(port, () => {
  console.log(`App is listening on the port ${port}`);
});
