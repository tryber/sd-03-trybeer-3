import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Login from './Login';
import renderWithRouter from '../renderWithRouter';

test('Testa o onClick no botão de registro na tela login', () => {
    const { getByText, history } = renderWithRouter(<Login />);
    const linkElement = getByText(/Ainda não tenho conta/i);
    fireEvent.click(linkElement);
    const pathname = history.location.pathname;
    expect(pathname).toBe('/register');
  });
  
  test('Testa o onClick no botão de registro na tela login', async () => {
    const { getByTestId, history } = renderWithRouter(<Login />);
    const inputEmail = getByTestId('email-input');
    fireEvent.change(inputEmail, { target: { value: 'a' } })
    const inputPassword = getByTestId('password-input');
    fireEvent.change(inputPassword, { target: { value: '00000' } })
    const buttonLogin = getByTestId('signin-btn');
    await fireEvent.click(buttonLogin);
    const pathname = history.location.pathname;
    expect(pathname).toBe('/');
  });