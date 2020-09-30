import React from 'react';
import ReactDOM from 'react-dom';
import { fireEvent, getByTestId, render} from '@testing-library/react';
import AdminOrders from './AdminOrders';
import renderWithRouter from '../renderWithRouter';
import AdminOrdersDetails from './AdminOrdersDetails';

describe('Pagina de controle de pedidos, usuário administrador', () => {
  test('Testando o componente renderiza corretamente', () => {
    const AdminOrdersPage = renderWithRouter(<AdminOrders />);
    expect(AdminOrdersPage);
  });
});