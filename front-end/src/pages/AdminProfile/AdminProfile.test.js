import React from 'react';
import AdminProfile from './Index';
import renderWithRouter from '../../renderWithRouter';

describe('Pagina de checkout de um pedido', () => {
  test('Testando o componente renderiza corretamente', () => {
    const { getByText } = renderWithRouter(<AdminProfile />);

  });
});
