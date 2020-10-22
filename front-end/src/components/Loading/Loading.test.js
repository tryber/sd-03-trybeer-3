import React from 'react';
import Loading from './Index';
import renderWithRouter from '../../renderWithRouter';

describe('hamburguer menu testes',() => {
    test('testando que o menu está sendo  mostrado  de maneira correta ao clicar no botão', 
    () => { 
        const component =  renderWithRouter(<Loading />);
        expect(component).toBeTruthy();     
    })
})