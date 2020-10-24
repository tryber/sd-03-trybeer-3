import React from 'react';
import { fireEvent } from '@testing-library/react';
import Register from './Index';
import renderWithRouter from '../../renderWithRouter';

describe('Pagina de login usuario', () => {
  test('Testando o componente renderiza corretamente', () => {
    const { getByText } = renderWithRouter(<Register />);
    expect(getByText(/entrar/i)).toBeDisabled();
  });
  test('testando o login de usuario comum', () => {
    const { 
      getByText, getByLabelText, getByTestId, debug 
    } = renderWithRouter(<Register />);
    const labelLogin = getByText('Login');
    expect(labelLogin).toBeInTheDocument();
    const emailInput = getByLabelText('Email');
    const passwrodInput = getByLabelText('Password');
    const buttonLogin = getByTestId('signin-btn');
    fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });
    fireEvent.change(passwrodInput, { target: { value: '12345678' } });
    fireEvent.click(buttonLogin);
    expect(getByText(/entrar/i)).not.toBeDisabled();
    debug();
  });
});
