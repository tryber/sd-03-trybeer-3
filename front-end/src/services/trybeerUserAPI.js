const axios = require('axios');

export const foo = async (email, password) => {
  const data = await axios.post('http://localhost:3001/login', { email, password })
    .then((response) => {
      localStorage.setItem('user', JSON.stringify(response));
      return response;
    })
    .catch((err) => {
      const errorMessage = { error: true, err };
      return errorMessage;
    });
  return data;
};

export { foo as getLoginUser };

export const register = async (name, email, password, role) => {
  const data = await axios.post('http://localhost:3001/register', {
    name,
    email,
    password,
    role,
  })
    .then((response) => {
      localStorage.setItem('user', JSON.stringify(response));
      return response;
    })
    .catch((err) => {
      const errorMessage = { error: true, err };
      return errorMessage;
    });
  return data;
};

export { register as postNewUser };

export const changeName = async (name, email, token) => {
  const data = await axios.put('http://localhost:3001/profile', {
    name,
    email,
    token,
  })
    .then((response) => {
      localStorage.setItem('user', JSON.stringify(response));
      return response;
    })
    .catch((err) => {
      const errorMessage = { error: true, err };
      return errorMessage;
    });
  return data;
};

export { changeName as putNameUser };

export const callProducts = async () => {
  const data = await axios.get('http://localhost:3001/products')
    .then((response) => response);
  return data;
};

export { callProducts as allProducts };

export const registerSale = async (email, total, adress, number, date) => {
  const data = await axios.post('http://localhost:3001/sales', {
    email,
    total,
    adress,
    number,
    date,
  })
    .then((response) => response);
  return data;
};

export { registerSale as createSale };
