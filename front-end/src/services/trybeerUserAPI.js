const axios = require('axios');

export const getLoginUser = async (email, password) => {
  const data = await axios({
    method: 'get',
    url: 'https://http://localhost:3001/login',
    responseType: 'stream'
  })
    .then((response) => response);
  return data;
};
  