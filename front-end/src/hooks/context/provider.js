import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TrybeerContext from './context';
import { allProducts, allSales, allSalesProducts } from '../../services/trybeerUserAPI';

const RecipeAppProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [token, setToken] = useState([]);
  const [allSalesProduct, setAllSalesProduct] = useState([]);
  const [allSale, setAllSale] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchSaleAdmin = async (setAllSale, setAllSalesProduct) => {
    const listSales = await allSales();
    const listSalesProducts = await allSalesProducts();
    setAllSale(listSales.data);
    setAllSalesProduct(listSalesProducts.data);
  }

  const fetchSaleUser = async (user, setAllSale, setAllSalesProduct) => {
    const listSales = await allSales();
    const listSalesProducts = await allSalesProducts();
    setAllSale(listSales.data);
    setAllSalesProduct(listSalesProducts.data);
  }

  const fetchData = async(user) => {
    const listProducts = await allProducts();
    setProducts(listProducts.data);
    if (user.role === 'administrator') {
      await fetchSaleAdmin(setAllSale, setAllSalesProduct);
      return;
    }
    await fetchSaleUser(user, setAllSale, setAllSalesProduct);
    return;
  };

  const context = {
    user,
    setUser,
    token,
    setToken,
    allSalesProduct,
    setAllSalesProduct,
    allSale,
    setAllSale,
    products,
    fetchData,
  };

  return (
    <TrybeerContext.Provider value={context}>
      {children}
    </TrybeerContext.Provider>
  );
};

RecipeAppProvider.propTypes = { children: PropTypes.node.isRequired };

export default RecipeAppProvider;
