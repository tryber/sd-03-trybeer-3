import React, { useState } from 'react';
import SideMenu from './SideMenu';
import cardapio from '../utils/images/cardapio.svg';

function TopMenu(title) {
  const [sideMenuState, setSideMenuState] = useState(false);
  return (
    <div>
      <img
        onClick={ () => setSideMenuState(!sideMenuState) }
        data-testid="top-hamburguer"
        src={ cardapio }
        alt="side-menu"
        height="42"
      />
      <h1 data-testid="top-title">{title}</h1>
      {SideMenu(sideMenuState)}
    </div>
  );
}

export default TopMenu;
