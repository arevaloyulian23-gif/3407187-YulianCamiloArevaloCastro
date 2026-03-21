/**
 * Product Model
 * Represents a fleet item (vehicle/resource)
 */

// import { CATEGORIES, STOCK_THRESHOLDS } from '../config.js';

class Product {
  // Auto-increment ID
  static nextId = 1;

  /**
   * Create a new Product
   */
  constructor({ name, category, price, quantity }) {
    this.id = Product.nextId++;
    this.name = name;           // Ej: "Bus Azul"
    this.category = category;   // Ej: "Bus"
    this.price = price;         // Ej: costo por unidad
    this.quantity = quantity;   // Ej: cantidad disponible

    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  /**
   * Calculate total value (price * quantity)
   */
  get totalValue() {
    return this.price * this.quantity;
  }

  /**
   * Check if stock is low
   */
  get isLowStock() {
    // Puedes reemplazar esto con STOCK_THRESHOLDS desde config
    const LOW_STOCK = 2; // Ej: pocos vehículos disponibles
    return this.quantity > 0 && this.quantity <= LOW_STOCK;
  }

  /**
   * Check if out of stock
   */
  get isOutOfStock() {
    return this.quantity === 0;
  }

  /**
   * Update product data
   */
  update({
    name = this.name,
    category = this.category,
    price = this.price,
    quantity = this.quantity
  }) {
    this.name = name;
    this.category = category;
    this.price = price;
    this.quantity = quantity;

    this.updatedAt = new Date();

    return this; // permite encadenar
  }

  /**
   * Convert to plain object
   */
  toJSON() {
    const { id, name, category, price, quantity, createdAt, updatedAt } = this;
    return { id, name, category, price, quantity, createdAt, updatedAt };
  }

  /**
   * Create Product from plain object
   */
  static fromJSON(data) {
    const product = new Product({
      name: data.name,
      category: data.category,
      price: data.price,
      quantity: data.quantity
    });

    // Restaurar valores originales
    product.id = data.id;
    product.createdAt = new Date(data.createdAt);
    product.updatedAt = new Date(data.updatedAt);

    // Ajustar auto-incremento
    if (data.id >= Product.nextId) {
      Product.nextId = data.id + 1;
    }

    return product;
  }
}

// Exportar
export default Product;