import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { allSales } from "../../services/trybeerUserAPI";
import SideMenuAdmin from '../../components/SideMenuAdmin';
import Loading from '../../components/Loading/Index';

const productsCards = (purchase, clickToOrdersDetail) => (
  <div className="order-container-card">
    {purchase.map((e, index) => {
      return (
        <div
          key={e.id}
          onClick={() => clickToOrdersDetail((index + 1))}
          data-testid={`${index}-order-card-container`}
        >
          <p data-testid={`${index}-order-number`}>Pedido {(index + 1)}</p>
          <p data-testid={`${index}-order-address`}>{e.address}, {e.number}</p>
          <p data-testid={`${index}-order-total-value`}>
            R$ {parseFloat(e.total).toFixed(2).replace('.', ',')}
          </p>
          <p
            data-testid={`${index}-order-status`}
            className="order-status-pendente"
          >
            {e.status}
          </p>
        </div>
      );
    })}
  </div>
);

const itensList = async (setPurchase) => {
  const listSales = await allSales();
  return setPurchase(listSales.data);
};

function AdminOrders() {
  const [purchase, setPurchase] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const actualUser = JSON.parse(localStorage.getItem('user'));
    if(!actualUser) return window.location.assign('http://localhost:3000/login');
    itensList(setPurchase);
  }, []);

  const clickToOrdersDetail = async (id) => {
    history.push(`/admin/orders/${id}`);
  };

  return (    
    <div>
      {SideMenuAdmin()}
      <h2>Pedidos</h2>
      {productsCards(purchase, clickToOrdersDetail)}
    </div>
  );
}

export default AdminOrders;
