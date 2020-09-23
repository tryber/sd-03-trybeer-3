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
