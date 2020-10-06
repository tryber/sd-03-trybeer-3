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

export const registerSale = async (email, total, address, number, date) => {
  const data = await axios.post('http://localhost:3001/sales', {
    email,
    total,
    address,
    number,
    date,
  })
    .then((response) => response);
  return data;
};

export { registerSale as createSale };

export const callSales = async () => {
  const data = await axios.get('http://localhost:3001/sales')
    .then((response) => response);
  return data;
};

export { callSales as allSales };

export const saveIndividualProduct = async (saleId, productId, quantity) => {
  const data = await axios.post('http://localhost:3001/individualProduct', {
    saleId,
    productId,
    quantity,
  })
    .then((response) => response);
  return data;
};

export { saveIndividualProduct as saveSaleProducts };

export const callSalesProducts = async () => {
  const data = await axios.get('http://localhost:3001/individualProduct')
    .then((response) => response);
  return data;
};

export { callSalesProducts as allSalesProducts };

export const changeToDelivered = async (id) => {
  const data = await axios.put('http://localhost:3001/sales', { id })
    .then((response) => response);
  return data;
};

export { changeToDelivered as deliverySale };

export const callSalesProductsUser = async (userId) => {
  const data = await axios.post('http://localhost:3001/individualProduct/user', {
    userId,
  })
    .then((response) => response);
  return data;
};

export { callSalesProductsUser as allSalesProductsUser };

export const callSalesUser = async (userId) => {
  const data = await axios.post('http://localhost:3001/sales/user', { userId })
    .then((response) => response);
  return data;
};

export { callSalesUser as allSalesUser };
