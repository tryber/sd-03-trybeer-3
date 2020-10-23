import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import UserProducts from './Index';

describe('Pagina de pedidos do usuário', () => {
  test('Testando o componente renderiza corretamente',  () => {
    const { getByText, getByLabelText, getByTestId, debug } = render(<UserProducts />);    
    debug();
    });
});
