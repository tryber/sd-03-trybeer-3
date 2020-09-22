require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
app.use(bodyParser.json());
app.use('/login', routes.loginRoute)

app.use((error, _req, res, _next) => {
  const { message, status } = error;
  if(status < 500) {
    return res.status(status).json({ message });
  }
  res.status(500).send('Something broke!');
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`listen on port: ${PORT}`));
