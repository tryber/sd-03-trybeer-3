import React from 'react';
import {fireEvent} from '@testing-library/react';
import App from '../../App';
import renderWithRouter from '../../renderWithRouter';

describe('Pagina de controle de pedidos, usuário administrador', () => {
  test('Testando o componente renderiza corretamente', async () => {
    const { getByText, getByLabelText, getByTestId, history } = renderWithRouter(<App />);
    const { location  } = history;
    const { pathname } = location;
    const labelLogin = getByText('Login');
    expect(labelLogin).toBeInTheDocument();
    const emailInput = getByLabelText('Email');
    const passwrodInput = getByLabelText('Password');
    const buttonLogin = getByTestId('signin-btn');
    fireEvent.change(emailInput, { target: { value: 'bruno.batista@gmail.com' } });
    fireEvent.change(passwrodInput, { target: { value: '12345678' } });
    const leftClick = {button: 0}
    fireEvent.click(buttonLogin, leftClick);  
    console.log(history.location );
    expect(pathname).toEqual('/products');
   });
});
