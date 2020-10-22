require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/login', routes.loginRoute);
app.use('/register', routes.registerRoute);
app.use('/profile', routes.profileRoute);
app.use('/products', routes.productsRoute);
app.use('/sales', routes.salesRoute);
app.use('/individualProduct', routes.individualProductRoute);
app.use('/images', express.static('images'));

app.use((error, _req, res, _next) => {
  const { message, status } = error;
  if (status < 500) {
    return res.status(status).json(message);
  }
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`listen on port: ${PORT}`));
