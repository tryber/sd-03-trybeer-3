import React from 'react';
import { useHistory } from 'react-router-dom';

const test = (history, pathName) => {
    if (pathName == null) {
        localStorage.setItem('user', JSON.stringify({}));
        return history.push('/login');
    };
    return history.push(`/${pathName}`);
}

function SideMenu(sideMenuState) {
    const history = useHistory();
    return (
        sideMenuState &&
        <div className="side-menu-container">
            <button data-testid="side-menu-item-products" onClick={() => test(history, 'products')}>
                Produtos
            </button>
            <button data-testid="side-menu-item-my-orders" onClick={() => test(history, 'orders')}>
                Meus Pedidos
            </button>
            <button data-testid="side-menu-item-my-profile" onClick={() => test(history, 'profile')}>
                Meus Perfil
            </button>
            <button data-testid="side-menu-item-logout" onClick={() => test(history, null)}>
                Sair
            </button>
        </div>
    )
}

export default SideMenu;
