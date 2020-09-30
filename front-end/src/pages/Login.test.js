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
  