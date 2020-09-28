import React from 'react';
import { fireEvent} from '@testing-library/react';
import SideMenuAdmin  from '../components/SideMenuAdmin';
import renderWithRouter from '../renderWithRouter';

describe('Testa se os links estão redirecionando para as URLS de maneira' +
'correta depois do click para o Admin', () => {
    test('testa o Botão de pedidos para o administrador', () => {
        const { getByTestId, history } = renderWithRouter(<SideMenuAdmin />);
        const ordersButton = getByTestId('side-menu-item-orders');
        fireEvent.click(ordersButton);
        const pathname = history.location.pathname;
        expect(pathname).toBe('/admin/orders');
      });

      test('testa o Botão de perfil para o administrador', () => {
        const { getByTestId, history } = renderWithRouter(<SideMenuAdmin />);
        const profileButton = getByTestId('side-menu-item-profile');
        fireEvent.click(profileButton);
        const pathname = history.location.pathname;
        expect(pathname).toBe('/admin/profile');
      });

      test('testa o Botão de  Sair para o administrador', () => {
        const { getByTestId, history } = renderWithRouter(<SideMenuAdmin />);
        const logoutButton = getByTestId('side-menu-item-logout');
        fireEvent.click(logoutButton);
        const pathname = history.location.pathname;
        expect(pathname).toBe('/login');
      });
}
);