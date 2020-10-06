import React from 'react';
import AdminOrders from './Index';
import renderWithRouter from '../../renderWithRouter';

describe('Pagina de controle de pedidos, usuário administrador', () => {
  test('Testando o componente renderiza corretamente', () => {
    const AdminOrdersPage = renderWithRouter(<AdminOrders />);
    expect(AdminOrdersPage);
  });
});
