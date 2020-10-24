import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import AdminOrders from './Index';
import renderWithRouter from '../../renderWithRouter';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });

describe('Pagina de checkout de um pedido', () => {
  test('Testando o componente renderiza corretamente',  () => {    
const purchase = localStorage.getItem('inProcessPurchase');
const { getByText, getByLabelText, getByTestId, debug } = renderWithRouter(<AdminOrders />);    
    debug();
    });
  test('testando metodo', () => {
    const wrapper = mount(<AdminOrders />);
   console.log(wrapper.instance())
  })

});
