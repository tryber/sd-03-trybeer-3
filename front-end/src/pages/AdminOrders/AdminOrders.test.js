import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Login from '../Login/Index';
// import AdminOrders from './Index';
import renderWithRouter from '../../renderWithRouter';

const purchase = [{
  id: 12,
  address:'rua teste',
  number: 150,
  status:'pendente'
}];

Enzyme.configure({ adapter: new Adapter() });
const clickToOrdersDetail = async (id) => {
  history.push(`/admin/orders/${id}`);
};

describe('Pagina de checkout de um pedido', () => {
  test('Testando a listagem de produtos', () => {
    // fazer todo a simulação desde o login até a listagem de produtos
    const loginScreen = mount(<Login/>);
    const labelLogin = loginScreen.find('Login');
    const emailInput = loginScreen.find('Email');
    const passwrodInput = loginScreen.find('Password');
    const buttonLogin = loginScreen.find('[data-testid="signin-btn"]');
/*    emailInput.simulate({ target: {name: '' value: 'test@gmail.com' } }) ;
   passwrodInput, { target: { value: '12345678' } });
    fireEvent.click(buttonLogin);
    console.log(labelLogin.html()); */
    console.log(loginScreen.html());
  });
});
