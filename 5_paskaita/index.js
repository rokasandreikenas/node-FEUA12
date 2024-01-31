require('dotenv').config();

const port = process.env.PORT || 8080;

const array = [{ id: 1, name: 'Rokas', surname: 'Burokas' }];

const test = array.map((item) => `${item.id} ${item.name} ${item.surname} ${item.surname}`);

console.log(port);
