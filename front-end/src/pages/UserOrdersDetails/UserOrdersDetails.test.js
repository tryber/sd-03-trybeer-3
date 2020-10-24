import React from 'react';
import UseOrdersDetails from './Index';
import renderWithRouter from '../../renderWithRouter';

describe('Pagina de pedidos do usuário', () => {
  test('Testando o componente renderiza corretamente', () => {
    const { debug } = renderWithRouter(<UseOrdersDetails id={ 1 } />);
    debug();
  });
});
