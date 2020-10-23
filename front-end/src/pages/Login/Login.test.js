import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import Register from './Index';
import renderWithRouter from '../../renderWithRouter';


describe('Pagina de controle de pedidos, usuário administrador', () => {
  test('Testando o componente renderiza corretamente',  () => {
    const { getByText, getByLabelText, getByTestId, debug } = render(<Register />);    
     expect(getByText(/entrar/i)).toBeDisabled();
    });
    test('testando o login de usuario comum', () => {
      const { getByText, getByLabelText, getByTestId, debug, history } = renderWithRouter(<Register />);    
      const labelLogin = getByText('Login');
    expect(labelLogin).toBeInTheDocument();
    const emailInput = getByLabelText('Email');
    const passwrodInput = getByLabelText('Password');
    const buttonLogin =  getByTestId('signin-btn');
    fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });
    fireEvent.change(passwrodInput, { target: { value: '12345678' } });
    const leftClick = {button: 0}
    fireEvent.click(buttonLogin);  
    console.log(history.location.pathname)
    expect(getByText(/entrar/i)).not.toBeDisabled();
    debug();
    })  
});
