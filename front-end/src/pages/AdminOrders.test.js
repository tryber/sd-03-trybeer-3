import React from 'react';
import ReactDOM from 'react-dom';
import { fireEvent, getByTestId, render} from '@testing-library/react';
import AdminOrders from './AdminOrders';
import renderWithRouter from '../renderWithRouter';
import AdminOrdersDetails from './AdminOrdersDetails';

describe('Pagina de controle de pedidos, usuário administrador', () => {
<<<<<<< HEAD
  test('Testando onClick', () => {
    const  { getAllByText } = renderWithRouter(<AdminOrders  />);
    const ordersDivH2 = getAllByText(/Pedidos/i);
    expect(ordersDivH2[0]).toBeInTheDocument();
=======
  test('Testando o componente renderiza corretamente', () => {
    const AdminOrdersPage = renderWithRouter(<AdminOrders />);
    expect(AdminOrdersPage);
>>>>>>> deb3ae2217a92f083f6d0f10d66d67058210fe10
  });
});