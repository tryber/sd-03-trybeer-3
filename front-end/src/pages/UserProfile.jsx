import React, { useState, useEffect } from 'react';
import { putNameUser } from "../services/trybeerUserAPI";

const dealWithChange = (setName, setChange, value) => {
  setName(value);
  setChange(false);
};

const nameInput = (name, setName, setChange) => {
  return (
    <div>
      <label htmlFor="name">
        Name
        <input
            type="text"
            data-testid="profile-name-input"
            id="name"
            onChange={(event) => dealWithChange(setName, setChange, event.target.value)}
            value={name}
            placeholder="nome"
            className="profile-name-input"
        />
      </label>
    </div>
  );
};  

const emailInput = (email) => {
  return (
    <div>
      <label htmlFor="email">
        Email
        <input
            type="email"
            data-testid="profile-email-input"
            id="email"
            value={email}
            placeholder="email"
            className="profile-email-input"
        />
      </label>
    </div>
  );
};

const saveButton = (clickToSave, isDisabled) => (
  <div>
    <button
      type="button"
      className="profile-save-btn"
      data-testid="profile-save-btn"
      onClick={() => clickToSave()}
      disabled={isDisabled()}
    >
      Salvar
    </button>
  </div>
);

function Register() {
  const [name, setName] = useState('');
  const [email, setEMail] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const [change, setChange] = useState(true);

  useEffect(() => async () => {
    const actualUser = await JSON.parse(localStorage.getItem('user'));
    setName(actualUser.name);
    setEMail(actualUser.email);
    setToken(actualUser.token);
  }, []);

  const clickToSave = async () => {
    await putNameUser(name, email, token);
    setChange(!change)
    setMessage('Atualização concluída com sucesso')
    setTimeout(() => setMessage(''), 6000);
  };

  const isDisabled = () => {
    if (name.length >11 && !change) {
      return false;
    }
    return true;
  };

  return (
    <div>
      <h1 data-testid="top-title">Meu perfil</h1>
      <p>{message}</p>
      {nameInput(name, setName, setChange)}
      {emailInput(email)}
      {saveButton(clickToSave, isDisabled)}
    </div>
  );
}

export default Register;
