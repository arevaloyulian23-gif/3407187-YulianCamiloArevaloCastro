/**
 * UI Render Module
 * Functions for rendering UI components in Fleet Management System
 */

// Import dependencies (descomenta si tienes utils y config)
// import { formatPrice, formatStock, formatDate } from '../utils/index.js';
// import { CATEGORIES } from '../config.js';

/**
 * Render vehicles table
 * @param {Array} vehicles
 * @param {HTMLElement} container
 */
export const renderVehicles = (vehicles, container) => {
  container.innerHTML = '';

  if (!vehicles || vehicles.length === 0) {
    container.innerHTML = `<tr><td colspan="6" class="text-center">No hay vehículos registrados</td></tr>`;
    return;
  }

  vehicles.forEach(vehicle => {
    const rowHTML = createVehicleRow(vehicle);
    container.insertAdjacentHTML('beforeend', rowHTML);
  });

  updateVehicleCount(vehicles.length);
};

/**
 * Create vehicle row HTML
 * @param {Object} vehicle
 * @returns {string} - HTML string
 */
export const createVehicleRow = ({ id, name, type, licensePlate, capacity, active }) => {
  const statusClass = active ? 'text-success' : 'text-danger';
  const statusText = active ? 'Activo' : 'Inactivo';

  return `
    <tr data-id="${id}">
      <td>${name}</td>
      <td>${type}</td>
      <td>${licensePlate}</td>
      <td>${capacity}</td>
      <td class="${statusClass}">${statusText}</td>
      <td>
        <button class="btn btn-sm btn-primary edit-btn">Editar</button>
        <button class="btn btn-sm btn-danger delete-btn">Eliminar</button>
      </td>
    </tr>
  `;
};

/**
 * Render category options in select elements
 * @param {Array<HTMLSelectElement>} selects
 * @param {Array<Object>} categories - Array of category objects with id, name, icon
 */
export const renderCategoryOptions = (selects, categories) => {
  selects.forEach(select => {
    select.innerHTML = '<option value="">Seleccionar...</option>';
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category.id;
      option.textContent = `${category.icon} ${category.name}`;
      select.appendChild(option);
    });
  });
};

/**
 * Update vehicle count badge
 * @param {number} count
 */
export const updateVehicleCount = count => {
  const badge = document.getElementById('vehicle-count');
  if (badge) {
    badge.textContent = `${count} vehículo${count !== 1 ? 's' : ''}`;
  }
};

/**
 * Show notification message
 * @param {string} message
 * @param {string} type - 'success' | 'error' | 'info'
 */
export const showNotification = (message, type = 'info') => {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
};

/**
 * Render reports section
 * @param {Object} stats
 * @param {HTMLElement} container
 */
export const renderReports = ({ totalVehicles, totalCapacity, inactiveCount, typeBreakdown }, container) => {
  container.innerHTML = `
    <div class="report-card">
      <h4>Total de vehículos</h4>
      <p>${totalVehicles}</p>
    </div>
    <div class="report-card">
      <h4>Capacidad total</h4>
      <p>${totalCapacity}</p>
    </div>
    <div class="report-card">
      <h4>Vehículos inactivos</h4>
      <p>${inactiveCount}</p>
    </div>
    <div class="report-card">
      <h4>Por tipo</h4>
      <ul>
        ${Object.entries(typeBreakdown).map(([type, count]) => `<li>${type}: ${count}</li>`).join('')}
      </ul>
    </div>
  `;
};