import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { allProducts, allSales, allSalesProducts } from '../../services/trybeerUserAPI';
import TopMenu from '../../components/TopMenu/Index';
import './styles.css';

const productsCards = (purchase) => (
  <div className="checkout-container-card">
    {purchase.map((e, index) => {
      const totalProduct = (parseFloat(e.price) * parseInt(e.amount)).toFixed(2).replace('.', ',');
      return (
        <div>
          <div className="products-card">
            <p data-testid={ `${index}-product-qtd` }>{e.amount}</p>
            <p data-testid={ `${index}-product-name` }>{e.name}</p>
            <p data-testid={ `${index}-product-total-value` }>
              R$
              {totalProduct}
            </p>
            <p data-testid={ `${index}-product-price` }>{`(R$ ${parseFloat(e.price).toFixed(2).replace('.', ',')}un)`}</p>
          </div>
        </div>
      );
    })}
  </div>
);

const itensList = async (actualUser, setPurchase, setTotal, id, setDay, setMonth) => {
  const listProducts = await allProducts();
  const listSales = await allSales();
  const listSalesProducts = await allSalesProducts();
  const allSalesUser = listSales.data.filter((elem) => elem.userId === actualUser.data.id);
  const actualSale = allSalesUser[(parseInt(id) - 1)];
  const actualPurchase = await listSalesProducts.data.reduce((acc, elem) => {
    if (elem.saleId === actualSale.id) {
      const product = listProducts.data.filter((e) => e.id === elem.productId);
      const obj = { ...product[0], amount: elem.quantity };
      acc = [...acc, obj];
      return acc;
    }
    return acc;
  }, []);
  setPurchase(actualPurchase);
  const actualTotal = actualPurchase.reduce((acc, elem) => (parseFloat(acc) + parseFloat(elem.price) * elem.amount).toFixed(2).replace('.', ','), 0);
  setDay(new Date(actualSale.date).getUTCDate());
  setMonth(new Date(actualSale.date).getMonth() + 1);
  setTotal(actualTotal);
};

const dateFunc = (time) => (`0${time}`).slice(-2);

function UserOrdersDetails() {
  const [purchase, setPurchase] = useState([]);
  const [total, setTotal] = useState(0);
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const actualUser = JSON.parse(localStorage.getItem('user'));
    if (!actualUser) return window.location.assign('http://localhost:3000/login');
    itensList(actualUser, setPurchase, setTotal, id, setDay, setMonth);
  }, []);

  return (
    <div>
      {TopMenu('Detalhes de Pedido')}
      <div className="container-checkout-container-card">
        <p data-testid="order-number" className="order-number">
          Pedido
          {id}
        </p>
        <p data-testid="order-date" className="order-date">
          {dateFunc(day)}
          /
          {dateFunc(month)}
        </p>
        {productsCards(purchase)}
        <h4 data-testid="order-total-value" className="order-total-value">
          Total: R$
          {' '}
          {total}
        </h4>
      </div>
    </div>
  );
}

export default UserOrdersDetails;
