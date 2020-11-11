import React from 'react';
import { fireEvent } from '@testing-library/react';
import Login from './Index';
import renderWithRouter from '../../renderWithRouter';
import { waitFor } from '@testing-library/dom';
import { act, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
const route = '/';
const component = <Login />

describe('Pagina de login usuario', () => {
  test('testando o login de usuario comum', async () => {
    const { history } = renderWithRouter(component, { route });
    const mainRoute = history.location.pathname;
    console.log(mainRoute);
    const labelLogin = screen.getByText('Login');
    expect(labelLogin).toBeInTheDocument();
    const emailInput = screen.getByTestId('email-input');
    const passwrodInput = screen.getByTestId('password-input');
    const buttonLogin = screen.getByTestId('signin-btn');
    fireEvent.change(emailInput, { target: { value: 'bruno.batista@gmail.com' } });
    fireEvent.change(passwrodInput, { target: { value: '12345678' } });
    await act(async () => {
      fireEvent.click(buttonLogin);
      screen.debug();   
    await waitFor(() => {
        expect(history.location.pathname).toBe('/products');
       /*  expect(localStorage.getItem('token')).toBeDefined(); */
      });
    });
    console.log(history.location);
    expect(screen.getByText(/entrar/i)).not.toBeDisabled();
  });
  test('testando o login de usuario Administrador', async () => {
    const { history } = renderWithRouter(component, { route });
    const mainRoute = history.location.pathname;
    console.log(mainRoute);
    const labelLogin = screen.getByText('Login');
    expect(labelLogin).toBeInTheDocument();
    const emailInput = screen.getByTestId('email-input');
    const passwrodInput = screen.getByTestId('password-input');
    const buttonLogin = screen.getByTestId('signin-btn');
    fireEvent.change(emailInput, { target: { value: 'tryber@trybe.com.br' } });
    fireEvent.change(passwrodInput, { target: { value: '123456' } });
    await act(async () => {
      fireEvent.click(buttonLogin);
      screen.debug();   
    await waitFor(() => {
        expect(history.location.pathname).toBe('/admin/orders');
       /*  expect(localStorage.getItem('token')).toBeDefined(); */
      });
    });
    console.log(history.location);
    expect(screen.getByText(/entrar/i)).not.toBeDisabled();
  });
  test('testando erro no login', async () => {
    const { history } = renderWithRouter(component, { route });
    const mainRoute = history.location.pathname;
    console.log(mainRoute);
    const labelLogin = screen.getByText('Login');
    expect(labelLogin).toBeInTheDocument();
    const emailInput = screen.getByTestId('email-input');
    const passwrodInput = screen.getByTestId('password-input');
    const buttonLogin = screen.getByTestId('signin-btn');
    fireEvent.change(emailInput, { target: { value: 'teste@teste.com.br' } });
    fireEvent.change(passwrodInput, { target: { value: '123456' } });
    await act(async () => {
      fireEvent.click(buttonLogin);
      screen.debug();   
    await waitFor(async() => {
      const a = await new Promise((resolve) => resolve())
      .then(() => setTimeout(() => {
        setErrorMessage(false);
      }, 3000));
  
      expect(a).toEqual(43)
      });
    });
    console.log(history.location);
    expect(screen.getByText(/entrar/i)).not.toBeDisabled();
  });
});