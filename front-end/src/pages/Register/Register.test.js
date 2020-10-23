import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import Login from './Index';
import renderWithRouter from '../../renderWithRouter';

describe('Pagina Registro de Usuario', () => {
  test('Testando o componente renderiza corretamente',  () => {
    const { getByText, getByLabelText, getByTestId, debug } = renderWithRouter(<Login />);    
     expect(getByText(/cadastrar/i)).toBeDisabled();
    });
});
