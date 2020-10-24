import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import AdminOrdersDetails from './Index';
import renderWithRouter from '../../renderWithRouter';

describe('Pagina de detalhes de um pedido do administrador', () => {
  test('Testando o componente renderiza corretamente',  () => {
const purchase = localStorage.getItem('inProcessPurchase');
const { getByText, getByLabelText, getByTestId, debug } = renderWithRouter(<AdminOrdersDetails />);    
    debug();
    });
});
