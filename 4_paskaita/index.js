const express = require("express");
const cors = require("cors");
const data = require("./data");

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

app.get("/users", (req, res) => {
  res.send(data);
});

// {
// "id": 1,
// "first_name": "Kelwin",
// "last_name": "Pirouet",
// "email": "kpirouet0@mac.com",
// "gender": "Non-binary",
// "car": "Dodge"
// }
// Sukurkite dinaminį GET route, kur URL turės automobilio markę ir pagal ją prafiltruos, ir grąžins tik tuos žmones, kurie turi šį automobilį.
app.get("/users/car/:brand", (req, res) => {
  const { brand } = req.params;

  const filteredUsers = data.filter(
    (user) => user.car.toLowerCase() === brand.toLowerCase()
  );

  res.send(filteredUsers);
});

// Sukurkite GET route, kuris grąžins visus el. paštus (grąžinamas formatas: ["anb@abc.com", "abc@abc.com", "abc@acb.com]).
app.get("/users/emails", (req, res) => {
  const emails = data.map((user) => user.email);

  res.send(emails);
});

// Sukurkite GET route, į kurį pasikreipus, grąžins visų moterų (gender: Female) vardą ir pavardę
// (formatas: ["Rita Kazlauskaite", "Monika Simaskaite"]).
app.get("/users/females", (req, res) => {
  // const newFemales = [];
  // const filteredUsers = data
  //   .filter((user) => user.gender === "Female")
  //   .forEach((female) =>
  //     newFemales.push(`${female.first_name} ${female.last_name}`)
  //   );

  // const filteredFemales = data.filter((user) => user.gender === "Female");
  // const fullNames = filteredFemales.map(
  //   (female) => `${female.first_name} ${female.last_name}`
  // );

  // const fullNames = data
  //   .map(
  //     (user) =>
  //       user.gender === "Female" && `${user.first_name} ${user.last_name}`
  //   )
  //   .filter((item) => item);

  const fullNames = [];

  data.forEach((user) => {
    if (user.gender === "Female") {
      fullNames.push(`${user.first_name} ${user.last_name}`);
    }
  });

  res.send(fullNames);
});

// Sukurkite dinaminį GET route, kuris priims vartotojo id ir pagal jį grąžins atitinkamą vartotojo objektą.
// Hint: url parametrai visada stringai, o čia id - skaičius, tad reikės konvertuoti.
app.get("/users/:id", (req, res) => {
  const id = +req.params.id;
  // const id = Number(req.params.id)
  // const id = parseInt(req.params.id)
  const user = data.find((user) => user.id === id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});
