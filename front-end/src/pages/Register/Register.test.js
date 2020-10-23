import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import Login from './Index';

describe('Pagina de controle de pedidos, usuário administrador', () => {
  test('Testando o componente renderiza corretamente',  () => {
    const { getByText, getByLabelText, getByTestId, debug } = render(<Login />);    
     expect(getByText(/cadastrar/i)).toBeDisabled();
    });
});
