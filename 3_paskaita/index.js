const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

let users = [
  { id: 1, name: "Rokas", surname: "Andreikenas", role: "ADMIN" },
  { id: 2, name: "Rolandas", surname: "Pranaitis", role: "MANAGER" },
];

// GET Returns all users (grąžina visus vartotojus)
app.get("/users", (req, res) => {
  res.send(users);
});

// POST Creates a new user
app.post("/users", (req, res) => {
  const fakeId = users.length + 1;
  const user = { ...req.body, id: fakeId }; // creating new user with id

  if (user.name && user.surname && user.role) {
    users.push(user); // updating list
    res.status(201).send(user); // returning created user
  } else {
    res.status(400).send({
      message: "User data is missing. Required fields: name, surname, role",
    });
  }
});

// PUT Updates an existing user
app.put("/users/:id", (req, res) => {
  const id = +req.params.id; // req.params ateina stringas
  const updatingUser = req.body;

  // users = users.map((user) => (user.id === id ? updatingUser : user));
  const foundIndex = users.findIndex((user) => user.id === id);
  if (foundIndex !== -1) {
    users.splice(foundIndex, 1, updatingUser);
    res.send(updatingUser);
  } else {
    res.status(400).send({ message: "User not found" });
  }
});

// DELETE Deletes an existing user by id
app.delete("/users/:id", (req, res) => {
  const id = +req.params.id;

  const foundIndex = users.findIndex((user) => user.id === id);
  if (foundIndex !== -1) {
    users.splice(foundIndex, 1);
    res.send({ message: "Deleted" });
  } else {
    res.status(400).send({ message: "User not found" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});
