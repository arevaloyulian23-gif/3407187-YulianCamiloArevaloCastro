/**
 * Vehicle Manager Service
 * Core business logic for vehicle fleet management
 */

import storage from './storage.js';
import { APP_CONFIG } from '../config.js';

// In-memory vehicles array
let vehicles = [];

/**
 * Vehicle class
 */
class Vehicle {
  constructor(id, name, type, licensePlate, capacity, active = true) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.licensePlate = licensePlate;
    this.capacity = capacity;
    this.active = active;
  }

  static fromJSON(data) {
    return new Vehicle(data.id, data.name, data.type, data.licensePlate, data.capacity, data.active);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      licensePlate: this.licensePlate,
      capacity: this.capacity,
      active: this.active
    };
  }
}

/**
 * Initialize vehicles from localStorage
 */
export const init = () => {
  const data = storage.load(APP_CONFIG.storageKey) || [];
  vehicles = data.map(item => Vehicle.fromJSON(item));
};

/**
 * Get all vehicles
 */
export const getAll = () => {
  return [...vehicles];
};

/**
 * Get vehicle by ID
 */
export const getById = (id) => {
  return vehicles.find(vehicle => vehicle.id === id);
};

/**
 * Add new vehicle
 */
export const add = (vehicleData) => {
  const id = Date.now().toString();
  const vehicle = new Vehicle(id, vehicleData.name, vehicleData.type, vehicleData.licensePlate, vehicleData.capacity);
  vehicles.push(vehicle);
  saveToStorage();
  return vehicle;
};

/**
 * Update vehicle
 */
export const update = (id, updates) => {
  const vehicle = getById(id);
  if (vehicle) {
    Object.assign(vehicle, updates);
    saveToStorage();
    return vehicle;
  }
  return null;
};

/**
 * Remove vehicle
 */
export const remove = (id) => {
  const index = vehicles.findIndex(vehicle => vehicle.id === id);
  if (index !== -1) {
    vehicles.splice(index, 1);
    saveToStorage();
    return true;
  }
  return false;
};

/**
 * Get vehicle count
 */
export const getCount = () => {
  return vehicles.length;
};

/**
 * Save to localStorage
 */
const saveToStorage = () => {
  storage.save(APP_CONFIG.storageKey, vehicles.map(v => v.toJSON()));
};

// Initialize on module load
init();

// Export the manager object
export const manager = {
  init,
  loadFromStorage: init, // alias for compatibility
  getAll,
  getById,
  add,
  update,
  remove,
  getCount
};