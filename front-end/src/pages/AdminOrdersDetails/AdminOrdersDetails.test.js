import React from 'react';
import AdminOrdersDetails from './Index';
import renderWithRouter from '../../renderWithRouter';

describe('Pagina de detalhes de um pedido do administrador', () => {
  test('Testando o componente renderiza corretamente', () => {
    const purchase = localStorage.getItem('inProcessPurchase');
    const { debug } = renderWithRouter(<AdminOrdersDetails />);
    debug();
  });
});
