import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { allProducts, allSales, allSalesProducts, deliverySale } from "../services/trybeerUserAPI";
import SideMenuAdmin from '../components/SideMenuAdmin';

const productsCards = (purchase) => (
  <div className="checkout-container-card">
    {purchase.map((e, index) => {
      const totalProduct = (parseFloat(e.price) * parseInt(e.amount)).toFixed(2).replace('.', ',');
      return (
        <div>
          <div className="products-card">
            <p data-testid={`${index}-product-qtd`}>{e.amount}</p>
            <p data-testid={`${index}-product-name`}>{e.name}</p>
            <p data-testid={`${index}-product-total-value`}>R$ {totalProduct}</p>
            <p data-testid={`${index}-order-unit-price`}>{`(R$ ${parseFloat(e.price).toFixed(2).replace('.', ',')})`}</p>
          </div>
        </div>
      );
    })}
  </div>
);

const deliveredButton = (clickToDeliver, id) => (
  <div>
    <button
      type="button"
      className="mark-as-delivered-btn"
      data-testid="mark-as-delivered-btn"
      onClick={() => clickToDeliver()}
    >
      Marcar como entregue
    </button>
  </div>
);

const itensList = async (setPurchase, setTotal, id, setSale, setStatus) => {
  const listProducts = await allProducts();
  const listSales = await allSales();
  const listSalesProducts = await allSalesProducts();
  const actualSale = listSales.data[(parseInt(id) - 1)];
  setSale(actualSale);
  setStatus(actualSale.status);
  const actualPurchase = await listSalesProducts.data.reduce((acc, elem) => {
    if (elem.saleId === actualSale.id) {
      const product = listProducts.data.filter((e) => e.id === elem.productId);
      const obj = {...product[0], amount: elem.quantity}
      acc = [...acc, obj];
      return acc;
    }
    return acc;
  }, []);
  setPurchase(actualPurchase);
  const actualTotal = actualPurchase.reduce((acc, elem) => {
    return (parseFloat(acc) + parseFloat(elem.price) * elem.amount).toFixed(2).replace('.', ',');
  }, 0);
  setTotal(actualTotal);
};

function AdminOrdersDetails() {
  const [purchase, setPurchase] = useState([]);
  const [sale, setSale] = useState([]);
  const [status, setStatus] = useState('Pendente');
  const [total, setTotal] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    const actualUser = JSON.parse(localStorage.getItem('user'));
    if(!actualUser) return window.location.assign('http://localhost:3000/login');
    itensList(setPurchase, setTotal, id, setSale, setStatus);
  }, []);


  const clickToDeliver = async () => {
    await deliverySale(sale.id)
    setStatus('Entregue');
  };

  return (
    <div>
      {SideMenuAdmin()}
      <h1>Detalhes de Pedido</h1>
      <div>
        <p data-testid="order-number" className="order-number">Pedido {id}</p>
        <p> - </p>
        <p data-testid="order-status" className="order-status">{status}</p>
      </div>
      {productsCards(purchase)}
      <h4 data-testid="order-total-value" className="order-total-value">
        Total: R$ {total}
      </h4>
      {(status === 'Pendente') ? deliveredButton(clickToDeliver, id) : null}
    </div>
  );
}

export default AdminOrdersDetails;
