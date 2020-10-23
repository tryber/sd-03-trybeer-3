import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import UserCheckout from './Index';

describe('Pagina de checkout de um pedido', () => {
  test('Testando o componente renderiza corretamente',  () => {
    const { getByText, getByLabelText, getByTestId, debug } = render(<UserCheckout />);    
    debug();
    });
});
