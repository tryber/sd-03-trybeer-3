import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TrybeerContext from './context';
import {
  allProducts, allSales, allSalesProducts, allSalesUser, allSalesProductsUser,
} from '../../services/trybeerUserAPI';

const RecipeAppProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [token, setToken] = useState([]);
  const [salesProduct, setSalesProduct] = useState([]);
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchSaleAdmin = async () => {
    const listSales = await allSales() || [];
    const listSalesProducts = await allSalesProducts() || [];
    setSales(listSales.data);
    setSalesProduct(listSalesProducts.data);
  };

  const fetchSaleUser = async () => {
    const listSales = await allSalesUser(user.data.id);
    setSales(listSales.data);
    const arrIds = listSales.data.reduce((acc, elem) => {
      acc = [...acc, elem.id];
      return acc;
    }, []);
    const listSalesProducts = await allSalesProductsUser(arrIds) || [];
    setSalesProduct(listSalesProducts.data);
  };

  const fetchData = async () => {
    const listProducts = await allProducts();
    setProducts(listProducts.data);
    if (user.data.role === 'administrator') {
      await fetchSaleAdmin(setSales, setSalesProduct);
      return;
    }
    await fetchSaleUser( setSales, setSalesProduct);
  };

  const context = {
    user,
    setUser,
    token,
    setToken,
    salesProduct,
    setSalesProduct,
    sales,
    setSales,
    products,
    fetchData,
  };

  return (
    <TrybeerContext.Provider value={ context }>
      {children}
    </TrybeerContext.Provider>
  );
};

RecipeAppProvider.propTypes = { children: PropTypes.node.isRequired };

export default RecipeAppProvider;
