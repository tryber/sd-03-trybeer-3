import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { allSales } from "../services/trybeerUserAPI";

const productsCards = (purchase, clickToCart) => (
  <div className="order-container-card">
    {purchase.map((e, index) => {
      const day = e.date.split('-')[2];
      const month = e.date.split('-')[1];
      return (
        <div
          key={e.id}
          onClick={() => clickToCart(e.id)}
          data-testid={`${index}-order-card-container`}
        >
          <p data-testid={`${index}-order-number`}>Produto {(index + 1)}</p>
          <p data-testid={`${index}-order-date`}>{day}/{month}</p>
          <p data-testid={`${index}-order-total-value`}>R$ {e.total}</p>
        </div>
      );
    })}
  </div>
);

const itensList = async (setSales) => {
  const listProducts = await allSales();
  setSales(listProducts.data);
};

function UserOrders() {
  const [sales, setSales] = useState([]);
  const [purchase, setPurchase] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const actualUser = JSON.parse(localStorage.getItem('user'));
    if(!actualUser) return window.location.assign('http://localhost:3000/login');
    itensList(setSales);
    const actualPurchase = sales.data.filter((elem) => elem.userId === actualUser.data.id);
    setPurchase(actualPurchase);
  }, []);

  const clickToCart = async (id) => {
    history.push(`/orders/${id}`);
  };

  return (
    <div>
      <h1 data-testid="top-title">Meus Pedidos</h1>
      {productsCards(purchase, clickToCart)}
    </div>
  );
}

export default UserOrders;
