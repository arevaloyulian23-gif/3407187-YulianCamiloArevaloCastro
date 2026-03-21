/**
 * Category Model
 * Represents a vehicle category (fleet system)
 */

class Category {
  /**
   * Create a new Category
   */
  constructor({ id, name, icon = '🚗' }) {
    this.id = id;
    this.name = name;
    this.icon = icon;
  }

  /**
   * Get display name with icon
   * @returns {string}
   */
  get displayName() {
    return `${this.icon} ${this.name}`;
  }

  /**
   * Convert to option element data
   * @returns {Object} - { value, text }
   */
  toOption() {
    return {
      value: this.id,
      text: this.displayName
    };
  }
}

// Exportar
export default Category;