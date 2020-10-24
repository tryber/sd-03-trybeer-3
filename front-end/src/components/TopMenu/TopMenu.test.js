import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import TopMenu from './Index';

describe('hamburguer menu testes', () => {
  test('testando que o menu está sendo  mostrado  de maneira correta ao clicar no botão',
    () => {
      const { getByTestId, getByText } = render(<TopMenu />);
      const menuHamburger = getByTestId('top-hamburguer');
      fireEvent.click(menuHamburger);
      const textMenuHamburger = getByText('Sair');
      expect(textMenuHamburger).toBeInTheDocument();
    });
});
