import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import TopMenu from '../components/SideMenu';

describe('teste de renderização do sideMenu', () => {
  test('fazendo teste do estado do componente',() => {
     // renderiza o componente . 
    const { getByTestId, getByText  } = render(<TopMenu />);
    // era para localizar o elemento com data-teste-id = top-hamburguer
    const topMenu = getByTestId('top-hamburguer');
    // clique no menu para abrir o sideMenu 
    fireEvent.click(topMenu);
    
    expect(getByText('Sair')).toBeInTheDocument();
    })
})



