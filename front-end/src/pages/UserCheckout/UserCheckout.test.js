import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import UserCheckout from './Index';
import renderWithRouter from '../../renderWithRouter';

describe('Pagina de checkout de um pedido', () => {
  test('Testando o componente renderiza corretamente',  () => {
    const { getByText, getByLabelText, getByTestId, debug } = renderWithRouter(<UserCheckout />);    
    debug();
    });
});
