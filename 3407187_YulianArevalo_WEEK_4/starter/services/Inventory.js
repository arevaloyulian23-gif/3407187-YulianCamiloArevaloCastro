/**
 * Inventory Service
 * Core business logic for inventory management
 */

import { Product } from '../models/index.js';
import storage from './storage.js';
import { APP_CONFIG } from '../config.js';

// In-memory products array
let products = [];

/**
 * Initialize inventory from localStorage
 */
export const init = () => {
  const data = storage.load(APP_CONFIG.storageKey) || [];

  products = data.map(item => Product.fromJSON(item));

  return products;
};

/**
 * Get all products
 */
export const getAll = () => {
  return [...products]; // copia para evitar mutaciones externas
};

/**
 * Get product by ID
 */
export const getById = id => {
  return products.find(p => p.id === id);
};

/**
 * Add new product
 */
export const add = ({ name, category, price, quantity }) => {
  const newProduct = new Product({ name, category, price, quantity });

  products.push(newProduct);
  persist();

  return newProduct;
};

/**
 * Update product
 */
export const update = (id, updates) => {
  const product = products.find(p => p.id === id);

  if (!product) return null;

  product.update(updates);
  persist();

  return product;
};

/**
 * Delete product
 */
export const remove = id => {
  const index = products.findIndex(p => p.id === id);

  if (index === -1) return false;

  products.splice(index, 1);
  persist();

  return true;
};

/**
 * Filter products
 */
export const filter = ({
  search = '',
  category = '',
  stockFilter = '',
} = {}) => {

  return products.filter(p => {

    // Buscar por nombre
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());

    // Filtrar por categoría
    const matchCategory = category ? p.category === category : true;

    // Filtrar por estado de stock
    let matchStock = true;

    if (stockFilter === 'low') {
      matchStock = p.isLowStock;
    } else if (stockFilter === 'out') {
      matchStock = p.isOutOfStock;
    } else if (stockFilter === 'available') {
      matchStock = !p.isOutOfStock;
    }

    return matchSearch && matchCategory && matchStock;
  });
};

/**
 * Get products by category
 */
export const getByCategory = categoryId => {
  return products.filter(p => p.category === categoryId);
};

/**
 * Save current state to localStorage
 */
const persist = () => {
  const plainData = products.map(p => p.toJSON());
  storage.save(APP_CONFIG.storageKey, plainData);
};

// Default export
export default {
  init,
  getAll,
  getById,
  add,
  update,
  remove,
  filter,
  getByCategory,
};