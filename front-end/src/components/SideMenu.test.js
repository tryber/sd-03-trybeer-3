import React from 'react';
import { fireEvent } from '@testing-library/react';
import SideMenu from './SideMenu';
import renderWithRouter from '../renderWithRouter';

describe('Testa se os links estão redirecionando para as URLS de maneira'
+ 'correta depois do click', () => {
  test('testa o Botão de produtos', () => {
    const { getByTestId, history } = renderWithRouter(<SideMenu />);
    const productButton = getByTestId('side-menu-item-products');
    fireEvent.click(productButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/products');
  });
  test('testa o Botão de Pedidos', () => {
    const { getByTestId, history } = renderWithRouter(<SideMenu />);
    const ordersButton = getByTestId('side-menu-item-my-orders');
    fireEvent.click(ordersButton);
    const { pathname } = history.location;
    console.log(pathname);
    expect(pathname).toBe('/orders');
  });
  test('testa o Botão de Perfil', () => {
    const { getByTestId, history } = renderWithRouter(<SideMenu />);
    const profileButton = getByTestId('side-menu-item-my-profile');
    fireEvent.click(profileButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });
  test('testa o Botão de Sair', () => {
    const { getByTestId, history } = renderWithRouter(<SideMenu />);
    const logoutButton = getByTestId('side-menu-item-logout');
    fireEvent.click(logoutButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/login');
  });
});
