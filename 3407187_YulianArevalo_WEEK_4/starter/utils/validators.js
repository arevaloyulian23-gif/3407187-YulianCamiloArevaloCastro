/**
 * Validators Utility Module
 * Functions for validating data (vehicles or products)
 */

/**
 * Validate product or vehicle data
 * @param {Object} data
 * @returns {Object} - { isValid, errors }
 */
export const validateProduct = ({ name, category, price, quantity } = {}) => {
  const errors = [];

  // name: required, min 2 characters
  if (!name || name.trim().length < 2) {
    errors.push('El nombre debe tener al menos 2 caracteres');
  }

  // category: required
  if (!category || category.trim() === '') {
    errors.push('La categoría es obligatoria');
  }

  // price: required, >= 0
  if (!isValidPrice(price)) {
    errors.push('El precio debe ser un número mayor o igual a 0');
  }

  // quantity: required, integer >= 0
  if (!isValidQuantity(quantity)) {
    errors.push('La cantidad debe ser un número entero mayor o igual a 0');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate price
 * @param {*} value
 * @returns {boolean}
 */
export const isValidPrice = value => {
  return typeof value === 'number' && !isNaN(value) && value >= 0;
};

/**
 * Validate quantity
 * @param {*} value
 * @returns {boolean}
 */
export const isValidQuantity = value => {
  return Number.isInteger(value) && value >= 0;
};

/**
 * Sanitize string input
 * @param {string} input
 * @returns {string}
 */
export const sanitize = input => {
  if (typeof input !== 'string') return '';
  return input
    .trim()
    .replace(/&/g, '&amp;')    // primero escapar &
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');   // opcional: escapar comilla simple
};