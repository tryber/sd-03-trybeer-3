import React from 'react';

function SideMenu() {
    return (
        <div>
            <h1 data-testid="side-menu-item-products"> Produtos </h1>
            <h1 data-testid="side-menu-item-my-orders"> Meus Pedidos </h1>
            <h1 data-testid="side-menu-item-my-profile"> Meu Perfil </h1>
        </div>
    )
}

export default SideMenu;
