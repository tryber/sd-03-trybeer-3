import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import UseOrders from './Index';
import renderWithRouter from '../../renderWithRouter';

describe('Pagina de pedidos do usuário', () => {
  test('Testando o componente renderiza corretamente',  () => {
    const { getByText, getByLabelText, getByTestId, debug } = renderWithRouter(<UseOrders />);    
    debug();
    });
});
