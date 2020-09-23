import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { postNewUser } from "../services/trybeerUserAPI";

const nameInput = (name, setName) => {
  return (
    <div>
      <label htmlFor="name">
        Nome
        <input
            type="text"
            data-testid="signup-name"
            id="name"
            onChange={(event) => setName(event.target.value)}
            value={name}
            placeholder="nome"
            className="signup-name"
        />
      </label>
    </div>
  );
};  

const emailInput = (email, setEMail) => {
  return (
    <div>
      <label htmlFor="email">
        Email
        <input
            type="email"
            data-testid="signup-email"
            id="email"
            onChange={(event) => setEMail(event.target.value)}
            value={email}
            placeholder="email"
            className="signup-email"
        />
      </label>
    </div>
  );
};

const passwordInput = (password, setPassword) => {
  return (
    <div>
      <label htmlFor="password">
        Senha
        <input
          type="password"
          data-testid="signup-password"
          id="password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          placeholder="senha"
          className="signup-password"
        />
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
        Quero vender
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
      onClick={() => clickToEnter()}
      disabled={isDisabled()}
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
  const history = useHistory();

  const clickToEnter = async () => {
    const newUser = await postNewUser(name, email, password, role);

    if (newUser.error) {
      return alert(newUser.err);
    }
    if (role === 'administrator') {
      return history.push('/admin/profile')
    }
    history.push('/products');
  };

  const isDisabled = () => {
    const emailTest = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (name.length >11 && password.length > 5 && email.match(emailTest)) return false;
    return true;
  };

  return (
    <div>
      <h1>Registro</h1>
      {nameInput(name, setName)}
      {emailInput(email, setEMail)}
      {passwordInput(password, setPassword)}
      {roleInput(role, setRole)}
      {registerButton(clickToEnter, isDisabled)}
    </div>
  );
}

export default Register;
