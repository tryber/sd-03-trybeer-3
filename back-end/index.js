require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
app.use(bodyParser.json());
app.use('/login', routes.loginRoute)

app.get('/', async (req, res) => {

  const allUsrs = await users.usersModel.getAllUsers()
  res.send(allUsrs)
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`listen on port: ${PORT}`));
