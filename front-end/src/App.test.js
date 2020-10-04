import React from 'react';
import App from './App';
import renderWithRouter from './renderWithRouter';

test('renderiza App componente e seus subcomponentes com router', () => {
  const { getByText } = renderWithRouter(<App />);
  const linkElement = getByText(/Ainda não tenho conta/i);
  expect(linkElement).toBeInTheDocument();
});
