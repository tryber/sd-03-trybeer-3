import React from 'react';
import UseOrders from './Index';
import renderWithRouter from '../../renderWithRouter';

describe('Pagina de pedidos do usuário', () => {
  test('Testando o componente renderiza corretamente', () => {
    const { debug } = renderWithRouter(<UseOrders />);
    debug();
  });
});
