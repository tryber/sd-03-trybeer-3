import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import AdminOrders from './Index';
import renderWithRouter from '../../renderWithRouter';

describe('Pagina de checkout de um pedido', () => {
  test('Testando o componente renderiza corretamente',  () => {
const purchase = localStorage.getItem('inProcessPurchase');
const { getByText, getByLabelText, getByTestId, debug } = renderWithRouter(<AdminOrders />);    
    debug();
    });
});
