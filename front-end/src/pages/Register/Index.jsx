import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { postNewUser } from "../../services/trybeerUserAPI";
import bigBangBeerLogo from "../../assets/images/bigBangBeerLogo.gif";
import "./styles.css";


const formErrors = (testidClass, newUserValue) => {
  let validReturn;
  const emailTest = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  switch(testidClass){
    case "signup-name":
      validReturn =
        (newUserValue.length < 11 && newUserValue.length > 0)
          ||
        (!/^[a-zA-Z_ ]+$/.test(newUserValue) && newUserValue.length > 0)
          ? "Invalid User" : "";
    break;
    case "signup-email":
      validReturn = !emailTest.test(newUserValue) && newUserValue.length > 0 ? "Invalid email" : "";
    break;
    case "signup-password":
      validReturn = newUserValue.length < 5 && newUserValue.length > 0 ? "Invalid email" : "";
    break;
    default:
    return;
  }
  return validReturn;
}

const inputs = (newUserValue, setNewUserValue, focus, setFocus, testidClass, type, placeholder, write) => {
  return (
    <div className={`${focus ? "focus" : "txtb"}`}>
      <label htmlFor={type}>
        {write}
        <div className="errorMessageRegister">{formErrors(testidClass, newUserValue)}</div>
        <input
          type={type}
          data-testid={testidClass}
          onChange={(event) => setNewUserValue(event.target.value)}
          value={newUserValue}
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

const roleInput = (role, setRole) => {
  return (
    <div>
      <label htmlFor="role">
        <input
          type="checkbox"
          data-testid="signup-seller"
          id="role"
          onChange={() => (role === 'client')
            ? setRole('administrator')
            : setRole('client')}
          className="signup-seller"
        />
        Quero Vender
        <span className="checkmark"></span>
      </label>
    </div>
  );
};

const registerButton = (clickToEnter, isDisabled) => (
  <div>
    <button
      type="button"
      className="signup-btn"
      data-testid="signup-btn"
      onClick={ () => clickToEnter() }
      disabled={ isDisabled() }
    >
      Cadastrar
    </button>
  </div>
);

function Register() {
  const [name, setName] = useState('');
  const [email, setEMail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('client');
  const [alertEmailExist, setAlertEmailExist] = useState(false);
  const [focusName, setFocusName] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);

  const history = useHistory();

  const clickToEnter = async () => {
    const newUser = await postNewUser(name, email, password, role);

    if (newUser.error) {
      return new Promise((resolve) => resolve(setAlertEmailExist(newUser.err.response.data)))
        .then(() => setTimeout(() => {
          setAlertEmailExist(false)
        }, 3000)
      );
    }
    if (role === 'administrator') {
      return history.push('/admin/orders');
    }
    history.push('/products');
  };

  const isDisabled = () => {
    const emailTest = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (name.length > 11 && password.length > 5 && email.match(emailTest) && /^[a-zA-Z_ ]+$/.test(name)) return false;
    return true;
  };

  return (
    <div className="login-form">
      <img src={bigBangBeerLogo} alt="bing bang beer logo" className="big-bang-beer-logo" />
      <h1>Registro</h1>
      {alertEmailExist && <p className="emailExists">E-mail already in database.</p>}
      {inputs(name, setName, focusName, setFocusName, "signup-name", "text", "nome", "Nome")}
      {inputs(email, setEMail, focusEmail, setFocusEmail, "signup-email", "email", "email", "Email")}
      {inputs(password, setPassword, focusPassword, setFocusPassword, "signup-password", "password", "senha", "Password")}
      {roleInput(role, setRole)}
      {registerButton(clickToEnter, isDisabled)}
    </div>
  );
}

export default Register;
