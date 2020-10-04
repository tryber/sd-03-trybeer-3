import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { postNewUser } from '../services/trybeerUserAPI';

const nameInput = (name, setName) => (
  <div>
    <label htmlFor="name">
      Nome
      <input
        type="text"
        data-testid="signup-name"
        id="name"
        onChange={ (event) => setName(event.target.value) }
        value={ name }
        placeholder="nome"
        className="signup-name"
      />
    </label>
  </div>
);

const emailInput = (email, setEMail) => (
  <div>
    <label htmlFor="email">
      Email
      <input
        type="email"
        data-testid="signup-email"
        id="email"
        onChange={ (event) => setEMail(event.target.value) }
        value={ email }
        placeholder="email"
        className="signup-email"
      />
    </label>
  </div>
);

const passwordInput = (password, setPassword) => (
  <div>
    <label htmlFor="password">
      Password
      <input
        type="password"
        data-testid="signup-password"
        id="password"
        onChange={ (event) => setPassword(event.target.value) }
        value={ password }
        placeholder="senha"
        className="signup-password"
      />
    </label>
  </div>
);

const roleInput = (role, setRole) => (
  <div>
    <label htmlFor="role">
      <input
        type="checkbox"
        data-testid="signup-seller"
        id="role"
        onChange={ () => ((role === 'client')
          ? setRole('administrator')
          : setRole('client')) }
        className="signup-seller"
      />
      Quero Vender
    </label>
  </div>
);

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
  const history = useHistory();

  const clickToEnter = async () => {
    const newUser = await postNewUser(name, email, password, role);

    if (newUser.error) {
      return setAlertEmailExist(true);
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
    <div>
      <h1>Registro</h1>
      {alertEmailExist && <p>E-mail already in database.</p>}
      {nameInput(name, setName)}
      {emailInput(email, setEMail)}
      {passwordInput(password, setPassword)}
      {roleInput(role, setRole)}
      {registerButton(clickToEnter, isDisabled)}
    </div>
  );
}

export default Register;
