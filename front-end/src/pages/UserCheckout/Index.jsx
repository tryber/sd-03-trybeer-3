import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { createSale, saveSaleProducts } from "../../services/trybeerUserAPI";
import TopMenu from '../../components/TopMenu/Index';
import "./styles.css";

const addressInput = (address, setAddress) => (
  <div>
    <label htmlFor="address">
      Rua
      <input
        type="text"
        data-testid="checkout-street-input"
        id="address"
        onChange={ (event) => setAddress(event.target.value) }
        value={ address }
        placeholder="Address"
        className="checkout-street-input"
      />
    </label>
  </div>
);

const numberInput = (number, setNumber) => (
  <div>
    <label htmlFor="number">
      Número da casa
      <input
        type="text"
        data-testid="checkout-house-number-input"
        id="number"
        onChange={ (event) => setNumber(event.target.value) }
        value={ number }
        placeholder="number"
        className="checkout-house-number-input"
      />
    </label>
  </div>
);

const excludeProduct = async (
  product, purchase, setPurchase, setTotal, setMessage,
) => {
  const purchaseWithoutItem = await purchase.filter((elem) => elem.id !== product.id);
  setPurchase(purchaseWithoutItem);
  localStorage.setItem('inProcessPurchase', JSON.stringify(purchaseWithoutItem));
  if (purchaseWithoutItem.length === 0) {
    setMessage('Não há produtos no carrinho');
  }
  const newtotal = purchaseWithoutItem.reduce((acc, elem) => (parseFloat(acc) + (parseFloat(elem.price) * parseFloat(elem.amount))), 0);
  setTotal(parseFloat(newtotal).toFixed(2).replace('.', ','));
};

const renderButtons = (
  index, id, purchase, setPurchase, setTotal, setMessage,
) => {
  const product = purchase.filter((e) => e.id === id)[0];
  return (
    <div className="removal-button-container">
      <button
        onClick={ () => excludeProduct(
          product, purchase, setPurchase, setTotal, setMessage,
        ) }
        type="button"
        data-testid={ `${index}-removal-button` }
        className="removal-button"
      >
        x
      </button>
    </div>
  );
};

const productsCards = (purchase, setPurchase, setTotal, setMessage) => (
  <div className="checkout-container-card">
    {purchase.map((e, index) => {
      const totalProduct = (parseFloat(e.price) * parseInt(e.amount)).toFixed(2).replace('.', ',');
      return (
        <div>
          <div className="products-card">
            <p data-testid={ `${index}-product-qtd-input` }>{e.amount}</p>
            <p data-testid={ `${index}-product-name` }>{e.name}</p>
            <p data-testid={ `${index}-product-total-value` }>
              R$
              {totalProduct}
            </p>
            <p data-testid={ `${index}-product-unit-price` }>
              {`(R$ ${parseFloat(e.price).toFixed(2).replace('.', ',')} un)`}
            </p>
            {renderButtons(
              index, e.id, purchase, setPurchase, setTotal, setMessage,
            )}
          </div>
        </div>
      );
    })}
  </div>
);

const checkoutButton = (clickToProducts, isDisabled) => (
  <div>
    <button
      type="button"
      className={isDisabled() ? "disabled-checkout-finish-btn" : "checkout-finish-btn"}
      data-testid="checkout-finish-btn"
      onClick={ () => clickToProducts() }
      disabled={ isDisabled() }
    >
      Finalizar Pedido
    </button>
  </div>
);

const saveIndividualProduct = async (elem, saleId) => {
  await saveSaleProducts(saleId, elem.id, elem.amount);
};

const savePurchase = async (saleId, purchase) => (
  Promise.all(purchase.map((elem) => saveIndividualProduct(elem, saleId)))
);

function UserCheckout() {
  const [purchase, setPurchase] = useState([]);
  const [total, setTotal] = useState(0);
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory();

  useEffect(() => {
    const actualUser = JSON.parse(localStorage.getItem('user'));
    if (!actualUser) return window.location.assign('http://localhost:3000/login');
    setEmail(actualUser.data.email);
    const actualPurchase = JSON.parse(localStorage.getItem('inProcessPurchase'));
    setPurchase(actualPurchase);
    const actualTotal = actualPurchase.reduce((acc, elem) => (parseFloat(acc) + parseFloat(elem.price) * elem.amount).toFixed(2).replace('.', ','), 0);
    setTotal(actualTotal);
  }, []);

  const clickToProducts = async () => {
    let date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    date = `${year}-${month}-${day}`;
    const registerResponse = await createSale(email, total, address, number, date);
    setMessage(registerResponse.data.message);
    savePurchase(registerResponse.data.saleId, purchase);
    localStorage.setItem('inProcessPurchase', JSON.stringify([]));
    setTimeout(() => {
      setMessage('');
      history.push('/products');
    }, 4000);
  };

  const isDisabled = () => {
    if (total !== '0,00' && address !== '' && number !== '') {
      return false;
    }
    return true;
  };

  return (
    <div className="checkout-container">
      {TopMenu('Finalizar Pedido')}
      <h3>{message}</h3>
      {productsCards(purchase, setPurchase, setTotal, setMessage)}
      <h4 data-testid="order-total-value" className="order-total-value">
        Total: R$
        {' '}
        {total === 0 ? '0,00' : total}
      </h4>
      {addressInput(address, setAddress)}
      {numberInput(number, setNumber)}
      {checkoutButton(clickToProducts, isDisabled)}
    </div>
  );
}

export default UserCheckout;
