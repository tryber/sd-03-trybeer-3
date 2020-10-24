import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AdminOrders from './Index';
import renderWithRouter from '../../renderWithRouter';

Enzyme.configure({ adapter: new Adapter() });

describe('Pagina de checkout de um pedido', () => {
  test('Testando o componente renderiza corretamente', () => {
    const { debug } = renderWithRouter(<AdminOrders />);
    debug();
  });
  test('testando metodo', () => {
    const wrapper = mount(<AdminOrders />);
    console.log(wrapper.instance());
  });
});
