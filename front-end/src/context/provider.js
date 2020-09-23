import React, { useState } from 'react';
import PropTypes from 'prop-types';
import trybeerContext from './context';
import * as requestFunctions from '../services/trybeerUserAPI';

const trybeerProvider = ({ children }) => {
  const [logedUser, setLogedUser] = useState('');

  const testLogin = (email, password) => {
    requestFunctions.getLoginUser(email, password).then((response) => {
        setLogedUser(response);
      }
    );
  };

  const context = {
    logedUser,
    setLogedUser,
    testLogin,
  };

  return (
    <trybeerContext.Provider value={context}>
      {children}
    </trybeerContext.Provider>
  );
};

trybeerProvider.propTypes = { children: PropTypes.node.isRequired };

export default trybeerProvider;
