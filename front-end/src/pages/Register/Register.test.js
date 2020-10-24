import React from 'react';
import Login from './Index';
import renderWithRouter from '../../renderWithRouter';

describe('Pagina Registro de Usuario', () => {
  test('Testando o componente renderiza corretamente', () => {
    const { getByText } = renderWithRouter(<Login />);
    expect(getByText(/cadastrar/i)).toBeDisabled();
  });
});
