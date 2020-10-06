import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getLoginUser } from "../../services/trybeerUserAPI";
import bigBangBeerLogo from "../../assets/images/bigBangBeerLogo.gif";
import "./styles.css";

const inputs = (userValue, setUserValue, focus, setFocus, testidClass, type, placeholder, write) => {
  return (
    <div className={`${focus ? "focus" : "txtb"}`}>
      <label htmlFor={type}>
        {write}
        <input
          type={type}
          data-testid={testidClass}
          onChange={(event) => setUserValue(event.target.value)}
          value={userValue}
          placeholder={placeholder}
          className={testidClass}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
        <span></span>
      </label>
    </div>
  );
};

const enterButton = (clickToEnter, isDisabled) => (
  <div>
    <button
      className={isDisabled() ? "signin-btn-disabled" : "signin-btn"}
      data-testid="signin-btn"
      onClick={ () => clickToEnter() }
      disabled={ isDisabled() }
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
      onClick={ () => history.push('/register') }
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
    const logedUser = await getLoginUser(userEmail, userPassword);
    if (logedUser.error) {
      return new Promise((resolve) => resolve(setErrorMessage(logedUser.err.response.data)))
        .then(() => setTimeout(() => {
          setErrorMessage(false)
        }, 3000)
      );
    }
    if (logedUser.data.role === 'administrator') {
      return history.push('/admin/orders');
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
      {<h1>Login</h1>}
      {errorMessage ? <h1 className="errorMessage">{errorMessage}</h1> : null}
      {inputs(userEmail, setUserEMail, focusEmail, setFocusEmail, "email-input", "email", "email", "Email")}
      {inputs(userPassword, setUserPassword, focusPassword, setFocusPassword, "password-input", "password", "senha", "Password")}
      {enterButton(clickToEnter, isDisabled)}
      {registerButton(history)}
    </div>
  );
}

export default Login;
