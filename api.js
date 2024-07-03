// api.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const getProducts = () => {
  return axios.get(`${API_URL}/products`);
};

export const getProduct = (id) => {
  return axios.get(`${API_URL}/products/${id}`);
};