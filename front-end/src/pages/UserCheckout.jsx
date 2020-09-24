import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { createSale } from "../services/trybeerUserAPI";

const adressInput = (adress, setAdress) => {
  return (
    <div>
      <label htmlFor="adress">
        Rua
        <input
            type="text"
            data-testid="checkout-street-input"
            id="adress"
            onChange={(event) => setAdress(event.target.value) }
            value={adress}
            placeholder="Adress"
            className="checkout-street-input"
        />
      </label>
    </div>
  );
};

const numberInput = (number, setNumber) => {
  return (
    <div>
      <label htmlFor="number">
        Número da casa
        <input
            type="text"
            data-testid="checkout-house-number-input"
            id="number"
            onChange={(event) => setNumber(event.target.value) }
            value={number}
            placeholder="number"
            className="checkout-house-number-input"
        />
      </label>
    </div>
  );
};

const excludeProduct = async (
  product, purchase, setPurchase, total, setTotal, totalProduct, setMessage,
) => {
  const purchaseWithoutItem = await purchase.filter((elem) => elem.id !== product.id);
  setPurchase(purchaseWithoutItem);
  localStorage.setItem('inProcessPurchase', JSON.stringify(purchaseWithoutItem));
  if ( purchaseWithoutItem.length === 0) {
    setMessage('Não há produtos no carrinho');
  }
  const newtotal = await (parseFloat(total) - parseFloat(totalProduct)).toFixed(2);
  setTotal(newtotal);
};

const renderButtons = (
  index, id, purchase, setPurchase, total, setTotal, totalProduct, setMessage,
) => {
  const product = purchase.filter((e) => e.id === id)[0];
  return (
    <div className="removal-button-container">
      <button
        onClick={() => excludeProduct(
          product, purchase, setPurchase, total, setTotal, totalProduct, setMessage,
        )}
        type="button"
        data-testid={`${index}-removal-button`}
        className="removal-button"
      >
        x
      </button>
    </div>
  );
}

const productsCards = (purchase, setPurchase, total, setTotal, setMessage) => (
  <div className="checkout-container-card">
    {purchase.map((e, index) => {
      const totalProduct = (parseFloat(e.price) * parseInt(e.amount)).toFixed(2);
      return (
        <div>
          <div className="products-card">
            <p data-testid={`${index}-qtd-input`}>{e.amount}</p>
            <p data-testid={`${index}-product-name`}>{e.name}</p>
            <p data-testid={`${index}-product-total-value`}>{totalProduct}</p>
            <p data-testid={`${index}-product-price`}>{`(R$ ${e.price}un)`}</p>
          </div>
          {renderButtons(
            index, e.id, purchase, setPurchase, total, setTotal, totalProduct, setMessage,
          )}
        </div>
      );
    })}
  </div>
);

const checkoutButton = (clickToProducts, isDisabled) => (
  <div>
    <button
      type="button"
      className="checkout-finish-btn"
      data-testid="checkout-finish-btn"
      onClick={() => clickToProducts()}
      disabled={isDisabled()}
    >
      Finalizar Pedido
    </button>
  </div>
);

function UserCheckout() {
  const [purchase, setPurchase] = useState([]);
  const [total, setTotal] = useState(0);
  const [email, setEmail] = useState('');
  const [adress, setAdress] = useState('');
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory();

  useEffect(() => {
    const actualUser = JSON.parse(localStorage.getItem('user'));
    if(!actualUser) return window.location.assign('http://localhost:3000/login');
    setEmail(actualUser.data.email);
    const actualPurchase = JSON.parse(localStorage.getItem('inProcessPurchase'));
    setPurchase(actualPurchase);
    const actualTotal = actualPurchase.reduce((acc, elem) => {
      return (parseInt(acc) + parseFloat(elem.price) * elem.amount).toFixed(2);
    }, 0);
    setTotal(actualTotal);
  }, []);

  const clickToProducts = async () => {
    let date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    date = `${day} / ${month} / ${year}`;
    const registerResponse = await createSale(email, total, adress, number, date);
    setMessage(registerResponse.data.message);
    setTimeout(() => {
      setMessage('');
      history.push('/products');
    }, 4000);
  };

  const isDisabled = () => {
    if (total !== 0 && adress && number) {
      return false;
    }
    return true;
  };

  return (
    <div>
      <h1 data-testid="top-title">Finalizar Pedido</h1>
      <h3>{message}</h3>
      {productsCards(purchase, setPurchase, total, setTotal, setMessage)}
      <h4 data-testid="order-total-value" className="order-total-value">
        Total: R${total}
      </h4>
      {adressInput(adress, setAdress)}
      {numberInput(number, setNumber)}
      {checkoutButton(total , clickToProducts, isDisabled)}
    </div>
  );
}

export default UserCheckout;
