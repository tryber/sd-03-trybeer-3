import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { allSales } from "../../services/trybeerUserAPI";
import TopMenu from '../../components/TopMenu';

const productsCards = (purchase, clickToCart) => (
  <div className="order-container-card">
    {purchase.map((e, index) => {
      const month = new Date(e.date).getMonth() + 1;
      const day = new Date(e.date).getUTCDate();
      return (
        <div
          key={ e.id }
          onClick={ () => clickToCart((index + 1)) }
          data-testid={ `${index}-order-card-container` }
        >
          <p data-testid={ `${index}-order-number` }>
            Pedido
            {(index + 1)}
          </p>
          <p data-testid={ `${index}-order-date` }>{`${(`0${day}`).slice(-2)}/${(`0${month}`).slice(-2)}`}</p>
          <p data-testid={ `${index}-order-total-value` }>
            R$
            {' '}
            {parseFloat(e.total).toFixed(2).replace('.', ',')}
          </p>
        </div>
      );
    })}
  </div>
);

const itensList = async (actualUser, setPurchase) => {
  const listSales = await allSales();
  const actualPurchase = await listSales.data.filter((elem) => elem.userId === actualUser.data.id);
  setPurchase(actualPurchase);
};

function UserOrders() {
  const [purchase, setPurchase] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const actualUser = JSON.parse(localStorage.getItem('user'));
    if (!actualUser) return window.location.assign('http://localhost:3000/login');
    itensList(actualUser, setPurchase);
  }, []);

  const clickToCart = async (id) => {
    history.push(`/orders/${id}`);
  };

  return (
    <div>
      {TopMenu('Meus Pedidos')}
      {productsCards(purchase, clickToCart)}
    </div>
  );
}

export default UserOrders;
