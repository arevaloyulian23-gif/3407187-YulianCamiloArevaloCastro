/**
 * UI Events Module - Vehicle Fleet Management
 */

import { manager } from '../services/index.js';
import { renderVehicles, updateVehicleCount } from './render.js';

/**
 * Initialize all event listeners
 */
export const initEvents = () => {
  // Vehicle form
  document.getElementById('vehicle-form')
    ?.addEventListener('submit', handleVehicleFormSubmit);

  // Filters
  document.getElementById('search')
    ?.addEventListener('input', handleFilterChange);
  document.getElementById('filter-type')
    ?.addEventListener('change', handleFilterChange);
  document.getElementById('filter-status')
    ?.addEventListener('change', handleFilterChange);

  // Edit modal
  document.getElementById('edit-form')
    ?.addEventListener('submit', handleEditSubmit);
  document.getElementById('cancel-edit')
    ?.addEventListener('click', closeModal);
  document.getElementById('modal-close')
    ?.addEventListener('click', closeModal);

  // Table actions (edit/delete buttons)
  document.getElementById('vehicles-table')
    ?.addEventListener('click', handleTableAction);

  // Reports
  document.getElementById('load-reports')
    ?.addEventListener('click', handleLoadReports);
};

/**
 * Handle vehicle form submission
 */
export const handleVehicleFormSubmit = event => {
  event.preventDefault();

  const formData = new FormData(event.target);

  const data = {
    name: formData.get('name'),
    type: formData.get('type'),
    licensePlate: formData.get('licensePlate'),
    capacity: Number(formData.get('capacity')),
  };

  // Basic validation
  if (!data.name || !data.type || !data.licensePlate || !data.capacity) {
    alert('Todos los campos son obligatorios');
    return;
  }

  manager.add(data);

  renderVehicles(manager.getAll(), document.getElementById('vehicles-body'));
  updateVehicleCount(manager.getCount());

  event.target.reset();

  alert('Vehículo agregado correctamente 🚛');
};

/**
 * Handle filter changes
 */
export const handleFilterChange = () => {
  const search = document.getElementById('search')?.value || '';
  const typeFilter = document.getElementById('filter-type')?.value || '';
  const statusFilter = document.getElementById('filter-status')?.value || '';

  const filtered = manager.getAll().filter(vehicle => {
    const matchesSearch = vehicle.name.toLowerCase().includes(search.toLowerCase()) ||
                         vehicle.licensePlate.toLowerCase().includes(search.toLowerCase());
    const matchesType = !typeFilter || vehicle.type === typeFilter;
    const matchesStatus = !statusFilter ||
                         (statusFilter === 'active' && vehicle.active) ||
                         (statusFilter === 'inactive' && !vehicle.active);

    return matchesSearch && matchesType && matchesStatus;
  });

  renderVehicles(filtered, document.getElementById('vehicles-body'));
};

/**
 * Handle table action (edit/delete buttons)
 */
export const handleTableAction = event => {
  const target = event.target;
  const row = target.closest('tr');
  const vehicleId = row?.dataset.id;

  if (!vehicleId) return;

  if (target.classList.contains('edit-btn')) {
    handleEdit(vehicleId);
  } else if (target.classList.contains('delete-btn')) {
    handleDelete(vehicleId);
  }
};

/**
 * Handle edit button click
 */
export const handleEdit = vehicleId => {
  const vehicle = manager.getById(vehicleId);

  if (!vehicle) return;

  openModal(vehicle);
};

/**
 * Handle delete button click
 */
export const handleDelete = vehicleId => {
  const confirmDelete = confirm('¿Eliminar este vehículo?');

  if (!confirmDelete) return;

  manager.remove(vehicleId);

  renderVehicles(manager.getAll(), document.getElementById('vehicles-body'));
  updateVehicleCount(manager.getCount());

  alert('Vehículo eliminado 🗑️');
};

/**
 * Handle edit form submission
 */
export const handleEditSubmit = event => {
  event.preventDefault();

  const formData = new FormData(event.target);

  const id = formData.get('edit-id');

  const updates = {
    name: formData.get('edit-name'),
    type: formData.get('edit-type'),
    licensePlate: formData.get('edit-licensePlate'),
    capacity: Number(formData.get('edit-capacity')),
  };

  // Basic validation
  if (!updates.name || !updates.type || !updates.licensePlate || !updates.capacity) {
    alert('Todos los campos son obligatorios');
    return;
  }

  manager.update(id, updates);

  closeModal();

  renderVehicles(manager.getAll(), document.getElementById('vehicles-body'));
  updateVehicleCount(manager.getCount());

  alert('Vehículo actualizado ✏️');
};

/**
 * Handle load reports button
 */
export const handleLoadReports = async () => {
  try {
    alert('Cargando reportes...');

    const reports = await import('../features/reports.js');

    reports.generateReport(manager.getAll());

    alert('Reportes generados 📊');
  } catch (error) {
    console.error(error);
    alert('Error al cargar reportes');
  }
};

/**
 * Open edit modal
 */
export const openModal = vehicle => {
  const modal = document.getElementById('edit-modal');
  const form = document.getElementById('edit-form');

  if (!modal || !form) return;

  form['edit-id'].value = vehicle.id;
  form['edit-name'].value = vehicle.name;
  form['edit-type'].value = vehicle.type;
  form['edit-licensePlate'].value = vehicle.licensePlate;
  form['edit-capacity'].value = vehicle.capacity;

  modal.classList.remove('hidden');
};

/**
 * Close edit modal
 */
export const closeModal = () => {
  const modal = document.getElementById('edit-modal');
  const form = document.getElementById('edit-form');

  if (!modal || !form) return;

  modal.classList.add('hidden');
  form.reset();
};