import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Login from '../Login/Index';
import { fireEvent } from '@testing-library/react';
// import AdminOrders from './Index';
import renderWithRouter from '../../renderWithRouter';

const purchase = [{
  id: 12,
  address:'rua teste',
  number: 150,
  status:'pendente'
}];


const clickToOrdersDetail = async (id) => {
  history.push(`/admin/orders/${id}`);
};

describe('Pagina de checkout de um pedido', () => {
  test('Testando a listagem de produtos', async () => {
    // fazer todo a simulação desde o login até a listagem de produtos
    const {
      getByText, getByLabelText, getByTestId, history
    } = renderWithRouter(<Login />);
    const { pathname } = history.location;
    const labelLogin = getByText('Login');
    expect(labelLogin).toBeInTheDocument();
    const emailInput = getByLabelText('Email');
    const passwrodInput = getByLabelText('Password');
    const buttonLogin = getByTestId('signin-btn');
    fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });
    fireEvent.change(passwrodInput, { target: { value: '12345678' } });
    await fireEvent.click(buttonLogin);
    console.log(pathname);
    expect(pathname).toBe('/products');
  });
});
