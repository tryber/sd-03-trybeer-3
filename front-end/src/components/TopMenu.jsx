import React, { useState } from 'react';
import SideMenu from './SideMenu';

function TopMenu(title) {
  const [sideMenuState, setSideMenuState] = useState(false);
  return (
    <div>
      <button onClick={() => setSideMenuState(!sideMenuState)}>
        <img data-testid="top-hamburguer" />
        teste
      </button>
      <h1 data-testid="top-title">{title}</h1>
      {SideMenu(sideMenuState)}
    </div>
  )
}

export default TopMenu;
