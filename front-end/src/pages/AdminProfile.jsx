import React, { useState, useEffect } from 'react';
import { putNameUser } from "../services/trybeerUserAPI";
import TopMenu from '../components/TopMenu';

const nameInput = (name) => {
  return (
    <div>
      <h4>Nome: </h4><h4 data-testid="profile-name">{name}</h4>
    </div>
  );
};

const emailInput = (email) => {
  return (
    <div>
      <h4>Email: </h4><h4 data-testid="profile-name">{email}</h4>
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

function AdminProfile() {
  const [name, setName] = useState('');
  const [email, setEMail] = useState('');

  useEffect(() => {
    const actualUser = JSON.parse(localStorage.getItem('user'));
    if(!actualUser) return window.location.assign('http://localhost:3000/login');
    setName(actualUser.data.name);
    setEMail(actualUser.data.email);
  }, []);

  return (
    <div>
      {TopMenu('Meu perfil')}
      <h2>Perfil</h2>
      {nameInput(name)}
      {emailInput(email)}
    </div>
  );
}

export default AdminProfile;
