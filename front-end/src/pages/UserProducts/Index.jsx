import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { allProducts } from "../../services/trybeerUserAPI";
import TopMenu from '../../components/TopMenu/Index';
import "./styles.css";

const decrement = async (product, purchase, setPurchase, setTotal) => {
  const {
    id, name, image, price, amount,
  } = product;
  const purchaseWithoutItem = await purchase.filter((elem) => elem.id !== product.id) || [];
  if (!amount) {
    return;
  }
  if (amount === 1) {
    setPurchase(purchaseWithoutItem);
    localStorage.setItem('inProcessPurchase', JSON.stringify(purchaseWithoutItem));
    const newtotal = purchaseWithoutItem.reduce((acc, elem) => (parseFloat(acc) + parseFloat(elem.price) * elem.amount).toFixed(2).replace('.', ','), 0);
    return newtotal === 0 ? setTotal('0,00') : setTotal(newtotal);
  }
  const newAmount = (parseInt(amount) - 1);
  const newItem = {
    id, name, image, price, amount: newAmount,
  };
  const newPurchase = [...purchaseWithoutItem, newItem];
  setPurchase(newPurchase);
  localStorage.setItem('inProcessPurchase', JSON.stringify(newPurchase));
  const newtotal = newPurchase.reduce((acc, elem) => (parseFloat(acc) + parseFloat(elem.price) * elem.amount).toFixed(2).replace('.', ','), 0);
  return setTotal(newtotal);
};

const increment = async (product, purchase, setPurchase, setTotal) => {
  const {
    id, name, image, price, amount,
  } = product;
  const purchaseWithoutItem = await purchase.filter((elem) => elem.id !== product.id) || [];
  const newAmount = (amount) ? (parseInt(amount) + 1) : 1;
  const newItem = {
    id, name, image, price, amount: newAmount,
  };
  const newPurchase = [...purchaseWithoutItem, newItem];
  setPurchase(newPurchase);
  const newtotal = newPurchase.reduce((acc, elem) => (parseFloat(acc) + parseFloat(elem.price) * elem.amount).toFixed(2).replace('.', ','), 0);
  localStorage.setItem('inProcessPurchase', JSON.stringify(newPurchase));
  return setTotal(newtotal);
};

const renderButtons = (id, e, purchase, setPurchase, setTotal) => {
  const product = purchase.filter((e) => e.id === id)[0] || e;
  return (
    <div className="card-buttons">
      <button
        onClick={ () => decrement(product, purchase, setPurchase, setTotal) }
        type="button"
        data-testid={ `${(id - 1)}-product-minus` }
        className="product-minus"
      >
        -
      </button>
      <span
        data-testid={`${(id -1)}-spanroduct-qtd`}
        className="product-qtd"
      > {(product.amount) ? product.amount : 0} </span>
      <button
        onClick={ () => increment(product, purchase, setPurchase, setTotal) }
        type="button"
        data-testid={ `${(id - 1)}-product-plus` }
        className="product-plus"
      >
        +
      </button>
    </div>
  );
};

const productsCards = (products, purchase, setPurchase, total, setTotal) => {
  return (
    <div className="products-container-card">
      {products.map((e) => (
        <div key={e.id - 1}>
          <div className="products-card">
            <img data-testid={`${(e.id -1)}-product-img`} src={e.image} width="100px" alt={e.name} />
            <p data-testid={`${(e.id -1)}-product-name`}>{e.name}</p>
            <p data-testid={`${(e.id -1)}-product-price`}>R$ {(e.price).toFixed(2).replace('.', ',')}</p>
            {renderButtons(e.id, e, purchase, setPurchase, total, setTotal)}
          </div>
        </div>
      ))}
    </div>
  )
};

const cartButton = (total, clickToCart, isDisabled) => (
  <div>
    <button
      type="button"
      className={isDisabled() ? "notAble" : "checkout-bottom-btn"}
      data-testid="checkout-bottom-btn"
      onClick={ () => clickToCart() }
      disabled={ isDisabled() }
    >
      Ver Carrinho
      {' '}
      <h4 data-testid="checkout-bottom-btn-value">
        R$
        {total}
      </h4>
    </button>
  </div>
);

const itensList = async (setProducts) => {
  const listProducts = await allProducts();
  setProducts(listProducts.data);
};

function UserProducts() {
  const [products, setProducts] = useState([]);
  const [purchase, setPurchase] = useState([]);
  const [total, setTotal] = useState(0);
  const history = useHistory();

  useEffect(() => {
    const actualUser = JSON.parse(localStorage.getItem('user'));
    if (!actualUser) return window.location.assign('http://localhost:3000/login');
    itensList(setProducts);
    const actualPurchase = JSON.parse(localStorage.getItem('inProcessPurchase')) || [];
    const actualTotal = actualPurchase.reduce((acc, elem) => (parseFloat(acc) + parseFloat(elem.price) * elem.amount).toFixed(2).replace('.', ','), 0);
    setPurchase(actualPurchase);
    actualTotal === 0 ? setTotal('0,00') : setTotal(actualTotal);
  }, []);

  const clickToCart = async () => {
    history.push('/checkout');
  };

  const isDisabled = () => {
    if (total !== '0,00') {
      return false;
    }
    return true;
  };

  return (
    <div>
      {TopMenu('TryBeer')}
      {productsCards(products, purchase, setPurchase, setTotal)}
      {cartButton(total, clickToCart, isDisabled)}
    </div>
  );
}

export default UserProducts;
