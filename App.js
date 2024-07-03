// App.js
import React, { useState, useEffect } from 'eact';
import { BrowserRouter, Route, Switch } from 'eact-router-dom';
import axios from 'axios';
import ProductCard from './ProductCard';
import ProductDetail from './ProductDetail';
import Filter from './Filter';
import Sort from './Sort';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/products')
     .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data);
        setSortedProducts(response.data);
      })
     .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleFilterChange = (filter) => {
    const filteredProducts = products.filter((product) => {
      if (filter.category && product.category!== filter.category) return false;
      if (filter.company && product.company!== filter.company) return false;
      if (filter.rating && product.rating!== parseInt(filter.rating)) return false;
      if (filter.priceRange) {
        const [min, max] = filter.priceRange.split('-');
        if (product.price < min || product.price > max) return false;
      }
      if (filter.availability && product.availability!== (filter.availability === 'true')) return false;
      return true;
    });
    setFilteredProducts(filteredProducts);
  };

  const handleSortChange = (sort) => {
    const sortedProducts = [...filteredProducts];
    if (sort.field && sort.order) {
      sortedProducts.sort((a, b) => {
        if (sort.order === 'asc') {
          return a[sort.field] > b[sort.field]? 1 : -1;
        } else {
          return a[sort.field] < b[sort.field]? 1 : -1;
        }
      });
    }
    setSortedProducts(sortedProducts);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Filter onFilterChange={handleFilterChange} />
          <Sort onSortChange={handleSortChange} />
          <ul>
            {sortedProducts.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} onClick={handleProductClick} />
              </li>
            ))}
          </ul>
        </Route>
        <Route path="/products/:id">
          <ProductDetail product={selectedProduct} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;