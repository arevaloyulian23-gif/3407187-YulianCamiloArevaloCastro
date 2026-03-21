/**
 * Storage Service
 * Handles localStorage operations
 */

// TODO: Import APP_CONFIG from config
 //import { APP_CONFIG } from '../config.js';

/**
 * Save data to localStorage
 * @param {string} key - Storage key
 * @param {*} data - Data to save
 */
export const save = (key, data) => {
  try {
    const json = JSON.stringify(data);
    localStorage.setItem(key, json);
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

/**
 * Load data from localStorage
 */
export const load = (key, defaultValue = null) => {
  try {
    const data = localStorage.getItem(key);

    if (!data) return defaultValue;

    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
};

/**
 * Remove data from localStorage
 */
export const remove = key => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

/**
 * Clear all app data
 */
export const clear = () => {
  try {
    // ⚠️ Opción segura: solo borrar lo de tu app
    // localStorage.removeItem(APP_CONFIG.storageKey);

    // ⚠️ Opción fuerte: borra TODO el localStorage
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

// Export default
export default {
  save,
  load,
  remove,
  clear,
};