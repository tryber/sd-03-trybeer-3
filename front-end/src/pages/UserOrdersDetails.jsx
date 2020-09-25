import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { allProducts, allSales, allSalesProducts} from "../services/trybeerUserAPI";

const productsCards = (purchase, products) => (
  <div className="checkout-container-card">
    {purchase.map((e, index) => {
      const product = products.filter((elem) => elem.id === e.productId);
      const totalProduct = (parseFloat(product.price) * parseInt(product.amount)).toFixed(2);
      return (
        <div>
          <div className="products-card">
            <p data-testid={`${index}-product-qtd`}>{product.amount}</p>
            <p data-testid={`${index}-product-name`}>{product.name}</p>
            <p data-testid={`${index}-product-total-value`}>{totalProduct}</p>
            <p data-testid={`${index}-product-price`}>{`(R$ ${product.price}un)`}</p>
          </div>
        </div>
      );
    })}
  </div>
);

const itensList = async (setProducts, setSales, setSalesProducts) => {
  const listProducts = await allProducts();
  const listSales = await allSales();
  const listSalesProducts = await allSalesProducts();
  setProducts(listProducts.data);
  setSales(listSales.data);
  setSalesProducts(listSalesProducts.data)
};

function UserCheckout() {
  const [products, setProducts] = useState([]);
  const [purchase, setPurchase] = useState([]);
  const [sales, setSales] = useState([]);
  const [salesProducts, setSalesProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const actualUser = JSON.parse(localStorage.getItem('user'));
    if(!actualUser) return window.location.assign('http://localhost:3000/login');
    itensList(setProducts, setSales, setSalesProducts);
    const allSales = sales.filter((elem) => elem.userId === actualUser.data.id);
    const actualSale = allSales[(id -1)];
    setDay(actualSale.date.split('-')[2]);
    setMonth(actualSale.date.split('-')[1]);
    const actualPurchase = salesProducts.filter((elem) => elem.saleId === actualUser.id);
    setPurchase(actualPurchase);
    const actualTotal = actualPurchase.reduce((acc, elem) => {
      return (parseFloat(acc) + parseFloat(elem.price) * elem.amount).toFixed(2);
    }, 0);
    setTotal(actualTotal);
  }, []);

  return (
    <div>
      <h1 data-testid="top-title">Finalizar Pedido</h1>
      <p data-testid="order-number" className="order-number">Pedido {id}</p>
      <p data-testid="order-date" className="order-date">{day}/{month}</p>
      {productsCards(purchase, products)}
      <h4 data-testid="order-total-value" className="order-total-value">
        Total: R${total}
      </h4>
    </div>
  );
}

export default UserCheckout;
