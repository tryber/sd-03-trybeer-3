import React from 'react';
import renderWithRouter from '../../renderWithRouter';
import UserProfile from './Index';

describe('Pagina de pedidos do usuário', () => {
  test('Testando o componente renderiza corretamente', () => {
    const { debug } = renderWithRouter(<UserProfile />);
    debug();
  });
});
