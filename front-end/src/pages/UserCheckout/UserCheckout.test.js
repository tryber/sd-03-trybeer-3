import React from 'react';
import UserCheckout from './Index';
import renderWithRouter from '../../renderWithRouter';

describe('Pagina de checkout de um pedido', () => {
  test('Testando o componente renderiza corretamente', () => {
    const { debug } = renderWithRouter(<UserCheckout />);
    debug();
  });
});
