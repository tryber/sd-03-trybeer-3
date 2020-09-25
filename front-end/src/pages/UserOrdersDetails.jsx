import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { allProducts, allSales, allSalesProducts} from "../services/trybeerUserAPI";
import TopMenu from '../components/TopMenu';

const productsCards = (purchase) => (
  <div className="checkout-container-card">
    {purchase.map((e, index) => {
      console.log(e)
      const totalProduct = (parseFloat(e.price) * parseInt(e.amount)).toFixed(2);
      return (
        <div>
          <div className="products-card">
            <p data-testid={`${index}-product-qtd`}>{e.amount}</p>
            <p data-testid={`${index}-product-name`}>{e.name}</p>
            <p data-testid={`${index}-product-total-value`}>{totalProduct}</p>
            <p data-testid={`${index}-product-price`}>{`(R$ ${e.price}un)`}</p>
          </div>
        </div>
      );
    })}
  </div>
);

const itensList = async (actualUser, setPurchase, setTotal, id) => {
  const listProducts = await allProducts();
  const listSales = await allSales();
  const listSalesProducts = await allSalesProducts();
  const allSalesUser = listSales.data.filter((elem) => elem.userId === actualUser.data.id);
  const actualSale = allSalesUser[(id -1)];
  const actualPurchase = await listSalesProducts.data.reduce((acc, elem) => {
    if (elem.saleId === actualSale.id) {
      const product = listProducts.data.filter((elem) => elem.id === e.productId);
      acc = [...acc, product];
      return acc;
    }
    return acc;
  }, []);
  setPurchase(actualPurchase);
  const actualTotal = actualPurchase.reduce((acc, elem) => {
    return (parseFloat(acc) + parseFloat(elem.price) * elem.amount).toFixed(2);
  }, 0);
  console.log(actualPurchase)
  setTotal(actualTotal);
};

function UserCheckout() {
  const [purchase, setPurchase] = useState([]);
  const [total, setTotal] = useState(0);
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const actualUser = JSON.parse(localStorage.getItem('user'));
    if(!actualUser) return window.location.assign('http://localhost:3000/login');
    itensList(actualUser, setPurchase, setTotal, id);
    //setDay(actualSale.date.split('-')[2]);
    //setMonth(actualSale.date.split('-')[1]);
  }, []);

  return (
    <div>
      {TopMenu('Detalhes de Pedido')}
      <p data-testid="order-number" className="order-number">Pedido {id}</p>
      <p data-testid="order-date" className="order-date">{day}/{month}</p>
      {productsCards(purchase)}
      <h4 data-testid="order-total-value" className="order-total-value">
        Total: R${total}
      </h4>
    </div>
  );
}

export default UserCheckout;
