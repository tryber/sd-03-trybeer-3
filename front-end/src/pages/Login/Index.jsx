import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getLoginUser } from "../../services/trybeerUserAPI";
import bigBangBeerLogo from "../../assets/images/bigBangBeerLogo.gif"
import "./styles.css"

const emailInput = (userEmail, setUserEMail, focusEmail, setFocusEmail) => {
  return (
    <div className={`${focusEmail ? "focus" : "txtb"}`}>
      <label htmlFor="email">
        Email
        <input
            type="email"
            data-testid="email-input"
            id="email"
            onChange={(event) => setUserEMail(event.target.value)}
            value={userEmail}
            className="email-input"
            placeholder="email"
            onFocus={() => setFocusEmail(true)}
            onBlur={() => setFocusEmail(false)}
        />
        <span></span>
      </label>
    </div>
  );
};

const passwordInput = (userPassword, setUserPassword, focusPassword, setFocusPassword) => {
  return (
    <div className={`${focusPassword ? "focus" : "txtb"}`}>
      <label htmlFor="password">
        Password
        <input
          type="password"
          data-testid="password-input"
          onChange={(event) => setUserPassword(event.target.value)}
          value={userPassword}
          placeholder="senha"
          className="password-input"
          onFocus={() => setFocusPassword(true)}
          onBlur={() => setFocusPassword(false)}
        />
        <span></span>
      </label>
    </div>
  );
};

const enterButton = (clickToEnter, isDisabled) => (
  <div>
    <button
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
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const history = useHistory();

  const clickToEnter = async () => {
    const { err: { response: { data } }, error } = await getLoginUser(userEmail, userPassword);
    if (error) {
      return new Promise((resolve) => resolve(setErrorMessage(data)))
        .then(() => setTimeout(() => {
          setErrorMessage(false)
        }, 2000)
      );
    }
    if (data.role === 'administrator') {
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
    <div className="login-form">
      <img src={bigBangBeerLogo} alt="bing bang beer logo" className="big-bang-beer-logo" />
      
      {errorMessage? <h1 className="errorMessage">{errorMessage}</h1> : <h1>Login</h1>}
      {emailInput(userEmail, setUserEMail, focusEmail, setFocusEmail)}
      {passwordInput(userPassword, setUserPassword, focusPassword, setFocusPassword)}
      {enterButton(clickToEnter, isDisabled)}
      {registerButton(history)}
    </div>
  );
}

export default Login;
