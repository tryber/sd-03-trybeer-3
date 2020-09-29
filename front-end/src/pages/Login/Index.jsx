import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getLoginUser } from "../../services/trybeerUserAPI";

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
        Password
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

const enterButton = (clickToEnter, isDisabled) => (
  <div>
    <button
      type="button"
      className="signin-btn"
      data-testid="signin-btn"
      onClick={() => clickToEnter()}
      disabled={isDisabled()}
    >
      ENTRAR
    </button>
  </div>
);

const registerButton = (history) => (
  <div>
    <button
      type="button"
      className="no-account-btn"
      data-testid="no-account-btn"
      onClick={() => history.push('/register')}
    >
      Ainda não tenho conta
    </button>
  </div>
);

function Login() {
  const [userEmail, setUserEMail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const history = useHistory();

  const clickToEnter = async () => {
    const logedUser = await getLoginUser(userEmail, userPassword);
    if (logedUser.error) {
      return alert(logedUser.err);
    }
    if (logedUser.data.role === 'administrator') {
      return history.push('/admin/orders')
    }
    history.push('/products');
  };

  const isDisabled = () => {
    const emailTest = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (userPassword.length > 5 && userEmail.match(emailTest)) return false;
    return true;
  };

  return (
    <div>
      <h1>Login</h1>
      {emailInput(userEmail, setUserEMail)}
      {passwordInput(userPassword, setUserPassword)}
      {enterButton(clickToEnter, isDisabled)}
      {registerButton(history)}
    </div>
  );
}

export default Login;
