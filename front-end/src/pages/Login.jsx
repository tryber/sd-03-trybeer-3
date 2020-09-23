import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { trybeerContext } from '../context';
import '../styles/Login.css';

const emailInput = (userEmail, setUserEMail) => {
  return (
    <div>
      <label htmlFor="email">
        Email
        <input
            type="email"
            data-testid="email-input"
            id="email"
            onChange={(event) => setUserEMail(event.target.value)}
            value={userEmail}
            placeholder="email"
            className="email-input"
        />
      </label>
    </div>
  );
};

const passwordInput = (userPassword, setUserPassword) => {
  return (
    <div>
      <label htmlFor="password">
        Senha
        <input
          type="password"
          data-testid="password-input"
          id="password"
          onChange={(event) => setUserPassword(event.target.value)}
          value={userPassword}
          placeholder="senha"
          className="password-input"
        />
      </label>
    </div>
  );
};

const enterButton = (userInfo, clickToEnter, isDisabled) => (
  <div>
    <button
      type="button"
      className="signin-btn"
      data-testid="signin-btn"
      onClick={() => clickToEnter(userInfo)}
      disabled={isDisabled(userInfo)}
    >
      Entrar
    </button>
  </div>
);

const registerButton = () => (
  <div>
    <button
      type="button"
      className="no-account-btn"
      data-testid="no-account-btn"
      onClick={() => useHistory().push('/register')}
    >
      Ainda nao tenho conta
    </button>
  </div>
);

function Login() {
  const { logedUser, testLogin } = useContext(trybeerContext);
  const [userEmail, setUserEMail] = useState('');
  const [userPassword, setUserPassword] = useState('');



  const clickToEnter = async () => {
    await testLogin(userEmail, userPassword)
    if (logedUser.message) {
      return alert(logedUser.message);
    }
    if (logedUser.role === 'administrator') {
      useHistory().push('/admin/profile')
    }
    useHistory().push('/products');
  };

  const isDisabled = () => {
    const emailTest = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (userPassword.length < 6 && userEmail.match(emailTest)) return false;
    return true;
  };

  return (
    <div>
      <h1>Login</h1>
      {emailInput(userEmail, setUserEMail)}
      {passwordInput(userPassword, setUserPassword)}
      {enterButton(userInfo, clickToEnter, isDisabled)}
      {registerButton()}
    </div>
  );
}

export default Login;