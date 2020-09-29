import React from 'react';
import ReactDOM from 'react-dom';
import { fireEvent, getByTestId, render} from '@testing-library/react';
import AdminOrders from './AdminOrders';
import renderWithRouter from '../renderWithRouter';

describe('Pagina de controle de pedidos, usuário administrador', () => {
  test('Testando onClick', () => {
    const  { getAllByText } = renderWithRouter(<AdminOrders  />);
    const ordersDivH2 = getAllByText(/Pedidos/i);
    expect(ordersDivH2[0]).toBeInTheDocument();
  });
});