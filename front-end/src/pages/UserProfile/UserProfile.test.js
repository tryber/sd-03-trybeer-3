import React from 'react';
import { render } from '@testing-library/react';
import UserProfile from './Index';

describe('Pagina de pedidos do usuário', () => {
  test('Testando o componente renderiza corretamente', () => {
    const { debug } = render(<UserProfile />);
    debug();
  });
});
