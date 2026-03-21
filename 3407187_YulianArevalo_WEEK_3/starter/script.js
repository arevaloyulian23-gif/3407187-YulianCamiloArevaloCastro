class BaseItem {
  // Campos privados
  #id;
  #name;
  #active;
  #location;
  #dateCreated;

  /**-------------*/
  constructor(name, location) {
    this.#id = crypto.randomUUID();
    this.#name = name;
    this.#location = location;
    this.#active = true;
    this.#dateCreated = new Date().toISOString();
  }

  // ============================
  // GETTERS
  // ============================

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get isActive() {
    return this.#active;
  }

  get location() {
    return this.#location;
  }

  get dateCreated() {
    return this.#dateCreated;
  }

  // ============================
  // SETTER
  // ============================

  set location(value) {
    if (!value || value.trim() === '') {
      throw new Error('La ubicación no puede estar vacía');
    }
    this.#location = value.trim();
  }

  // ============================
  // MÉTODOS
  // ============================

  activate() {
    if (this.#active) {
      return { success: false, message: 'El elemento ya está activo' };
    }
    this.#active = true;
    return { success: true, message: 'Elemento activado correctamente' };
  }

  deactivate() {
    if (!this.#active) {
      return { success: false, message: 'El elemento ya está inactivo' };
    }
    this.#active = false;
    return { success: true, message: 'Elemento desactivado correctamente' };
  }

  getInfo() {
    throw new Error('El método getInfo() debe ser implementado en la clase hija');
  }

  getType() {
    return this.constructor.name;
  }
}

class Bus extends BaseItem {
  #licensePlate;
  #capacity;

  constructor(name, location, licensePlate, capacity) {
    super(name, location);
    this.#licensePlate = licensePlate;
    this.#capacity = capacity;
  }

  get licensePlate() { return this.#licensePlate; }
  get capacity() { return this.#capacity; }

  getInfo() {
    return {
      id: this.id,
      name: this.name,
      location: this.location,
      type: "Bus",
      licensePlate: this.#licensePlate,
      capacity: this.#capacity,
      active: this.isActive
    };
  }
}
class Truck extends BaseItem {
  #loadCapacity;
  #wheels;

  constructor(name, location, loadCapacity, wheels) {
    super(name, location);
    this.#loadCapacity = loadCapacity;
    this.#wheels = wheels;
  }

  get loadCapacity() { return this.#loadCapacity; }
  get wheels() { return this.#wheels; }

  getInfo() {
    return {
      id: this.id,
      name: this.name,
      location: this.location,
      type: "Truck",
      loadCapacity: this.#loadCapacity,
      wheels: this.#wheels,
      active: this.isActive
    };
  }
}
class TravelCar extends BaseItem {
  #fuelType;     // tipo de combustible (gasolina, eléctrico, etc.)
  #passengers;   // número de pasajeros

  constructor(name, location, fuelType, passengers) {
    super(name, location);
    this.#fuelType = fuelType;
    this.#passengers = passengers;
  }

  get fuelType() { return this.#fuelType; }
  get passengers() { return this.#passengers; }

  getInfo() {
    return {
      id: this.id,
      name: this.name,
      location: this.location,
      type: "TravelCar",
      fuelType: this.#fuelType,
      passengers: this.#passengers,
      active: this.isActive
    };
  }
}
class Person {
  #id;
  #name;
  #email;
  #registrationDate;

  constructor(name, email) {
    this.#id = crypto.randomUUID();
    this.#name = name;
    this.#email = email;
    this.#registrationDate = new Date().toISOString();
  }

  get id() { return this.#id; }
  get name() { return this.#name; }
  get email() { return this.#email; }
  get registrationDate() { return this.#registrationDate; }

  set email(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      throw new Error('Formato de email inválido');
    }

    this.#email = value;
  }

  getInfo() {
    return {
      id: this.#id,
      name: this.#name,
      email: this.#email,
      registrationDate: this.#registrationDate
    };
  }
}

class Driver extends Person {
  #licenseNumber;
  #assignedVehicle;

  constructor(name, email, licenseNumber) {
    super(name, email);
    this.#licenseNumber = licenseNumber;
    this.#assignedVehicle = null;
  }

  assignVehicle(vehicle) {
    this.#assignedVehicle = vehicle;
  }

  get licenseNumber() { return this.#licenseNumber; }
  get assignedVehicle() { return this.#assignedVehicle; }

  getInfo() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: "Driver",
      licenseNumber: this.#licenseNumber,
      vehicle: this.#assignedVehicle ? this.#assignedVehicle.name : null
    };
  }
}

class FleetManager extends Person {
  #department;
  #vehiclesManaged;

  constructor(name, email, department) {
    super(name, email);
    this.#department = department;
    this.#vehiclesManaged = [];
  }

  addVehicle(vehicle) {
    this.#vehiclesManaged.push(vehicle);
  }

  get department() { return this.#department; }
  get vehiclesManaged() { return this.#vehiclesManaged; }

  getInfo() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: "FleetManager",
      department: this.#department,
      totalVehicles: this.#vehiclesManaged.length
    };
  }
}

class MainSystem {
  // Campos privados
  #items = [];
  #users = [];
  #transactions = [];

  // 🔥 Configuración inicial
  static {
    this.VERSION = '1.0.0';
    this.MAX_ITEMS = 1000;
    this.SYSTEM_NAME = 'Sistema de Flotas';

    console.log(`Sistema ${this.SYSTEM_NAME} v${this.VERSION} cargado`);
  }

  // ============================
  // MÉTODOS ESTÁTICOS
  // ============================

  static isValidId(id) {
    return typeof id === 'string' && id.length > 0;
  }

  static generateId() {
    return crypto.randomUUID();
  }

  // ============================
  // MÉTODOS DEL SISTEMA
  // ============================

  // Agregar vehículo
  addItem(item) {
    if (this.#items.length >= MainSystem.MAX_ITEMS) {
      throw new Error("Límite de vehículos alcanzado");
    }
    this.#items.push(item);
  }

  // Agregar usuario
  addUser(user) {
    this.#users.push(user);
  }

  // Obtener todos los vehículos
  getItems() {
    return this.#items;
  }

  // Obtener usuarios
  getUsers() {
    return this.#users;
  }

  // Buscar vehículo por ID
  findItemById(id) {
    return this.#items.find(item => item.id === id);
  }
}

// Crear el sistema
const system = new MainSystem();

// ============================
// 🚗 VEHÍCULOS
// ============================

const bus1 = new Bus("Bus Azul", "Terminal Norte", "ABC-123", 40);
const truck1 = new Truck("Camión Rojo", "Bodega Central", 5000, 8);
const car1 = new TravelCar("Carro Familiar", "Ciudad", "Gasolina", 5);

system.addItem(bus1);
system.addItem(truck1);
system.addItem(car1);

// ============================
//  USUARIOS
// ============================

const driver1 = new Driver("Carlos", "carlos@gmail.com", "LIC-999");
driver1.assignVehicle(bus1);

const manager1 = new FleetManager("Ana", "ana@gmail.com", "Transporte");
manager1.addVehicle(bus1);
manager1.addVehicle(truck1);

system.addUser(driver1);
system.addUser(manager1);

// ============================
//  MOSTRAR INFORMACIÓN
// ============================

console.log("=== VEHÍCULOS ===");
console.log(system.getItems().map(item => item.getInfo()));

console.log("=== USUARIOS ===");
console.log(system.getUsers().map(user => user.getInfo()));

// ============================================
// TODO 7: REFERENCIAS AL DOM
// ============================================

// TODO: Obtén referencias a los elementos del DOM
 const itemForm = document.getElementById('item-form');
 const itemList = document.getElementById('item-list');
 const statsContainer = document.getElementById('stats');
 const filterType = document.getElementById('filter-type');
 const filterStatus = document.getElementById('filter-status');
 const searchInput = document.getElementById('search-input');

 // ============================================
// TODO 8: FUNCIONES DE RENDERIZADO
// ============================================
const renderItem = item => {
  const info = item.getInfo();

  return `
    <div class="item ${item.isActive ? '' : 'inactive'}" data-id="${item.id}">
      
      <div class="item-header">
        <h3>${item.name}</h3>
        <span class="badge">${item.getType()}</span>
      </div>

      <div class="item-details">
        <p>📍 Ubicación: ${item.location}</p>
        <p>⚙️ Estado: ${item.isActive ? 'Activo' : 'Inactivo'}</p>

        ${
          info.licensePlate
            ? `<p>🚘 Placa: ${info.licensePlate}</p>`
            : ''
        }

        ${
          info.capacity
            ? `<p>👥 Capacidad: ${info.capacity}</p>`
            : ''
        }

        ${
          info.loadCapacity
            ? `<p>📦 Carga: ${info.loadCapacity} kg</p>`
            : ''
        }

        ${
          info.passengers
            ? `<p>👤 Pasajeros: ${info.passengers}</p>`
            : ''
        }

        ${
          info.fuelType
            ? `<p>⛽ Combustible: ${info.fuelType}</p>`
            : ''
        }
      </div>

      <div class="item-actions">
        <button class="btn-toggle" data-id="${item.id}">
          ${item.isActive ? 'Desactivar' : 'Activar'}
        </button>

        <button class="btn-delete" data-id="${item.id}">
          Eliminar
        </button>
      </div>

    </div>
  `;
};
const renderItems = (items = []) => {
  if (items.length === 0) {
    itemList.innerHTML = `
      <div class="empty">
        🚫 No hay vehículos registrados
      </div>
    `;
    return;
  }

  itemList.innerHTML = items.map(renderItem).join('');
};
const renderStats = stats => {
  document.getElementById('stat-total').textContent = stats.total;
  document.getElementById('stat-active').textContent = stats.active;
  document.getElementById('stat-inactive').textContent = stats.inactive;
  document.getElementById('stat-users').textContent = stats.users;
};
// ============================================
// TODO 9: EVENT HANDLERS
// ============================================
const handleFormSubmit = e => {
  e.preventDefault();

  const type = document.getElementById('item-type').value;
  const name = document.getElementById('item-name').value;
  const location = document.getElementById('item-location').value;

  let newItem;

  // 🔥 Crear según tipo
  if (type === 'Bus') {
    const licensePlate = prompt('Ingrese la placa');
    const capacity = prompt('Capacidad de pasajeros');

    newItem = new Bus(name, location, licensePlate, Number(capacity));
  }

  if (type === 'Truck') {
    const loadCapacity = prompt('Capacidad de carga (kg)');
    const wheels = prompt('Número de ruedas');

    newItem = new Truck(name, location, Number(loadCapacity), Number(wheels));
  }

  if (type === 'TravelCar') {
    const fuelType = prompt('Tipo de combustible');
    const passengers = prompt('Número de pasajeros');

    newItem = new TravelCar(name, location, fuelType, Number(passengers));
  }

  // Agregar al sistema
  system.addItem(newItem);

  // Re-renderizar
  renderItems(system.getItems());

  // Limpiar formulario
  itemForm.reset();
};
const handleFilterChange = () => {
  let filtered = system.getItems();

  const type = filterType.value;
  const status = filterStatus.value;
  const search = searchInput.value.toLowerCase();

  // 🔎 Filtrar por tipo
  if (type !== 'all') {
    filtered = filtered.filter(item => item.getType() === type);
  }

  // 🔎 Filtrar por estado
  if (status !== 'all') {
    filtered = filtered.filter(item =>
      status === 'active' ? item.isActive : !item.isActive
    );
  }

  // 🔎 Buscar por nombre
  if (search) {
    filtered = filtered.filter(item =>
      item.name.toLowerCase().includes(search)
    );
  }

  renderItems(filtered);
};
const handleItemAction = e => {
  const target = e.target;
  const itemId = target.dataset.id;

  if (!itemId) return;

  const item = system.findItemById(itemId);

  // 🔥 Activar / Desactivar
  if (target.classList.contains('btn-toggle')) {
    if (item.isActive) {
      item.deactivate();
    } else {
      item.activate();
    }
  }

  // 🔥 Eliminar
  if (target.classList.contains('btn-delete')) {
    if (confirm('¿Eliminar este vehículo?')) {
      const items = system.getItems();
      const index = items.findIndex(i => i.id === itemId);
      if (index !== -1) items.splice(index, 1);
    }
  }

  // 🔄 Re-render
  handleFilterChange();

  renderStats({
    total: system.getItems().length,
    active: system.getItems().filter(i => i.isActive).length,
    inactive: system.getItems().filter(i => !i.isActive).length,
    users: system.getUsers().length
  });
};
itemForm.addEventListener('submit', handleFormSubmit);

filterType.addEventListener('change', handleFilterChange);
filterStatus.addEventListener('change', handleFilterChange);
searchInput.addEventListener('input', handleFilterChange);

itemList.addEventListener('click', handleItemAction);
// ============================================
// TODO 11: INICIALIZACIÓN
// ============================================

/**
 * Inicializa la aplicación
 */
const init = () => {
  // TODO: Implementa la inicialización
   renderItems(system.getAllItems());
   renderStats(system.getStats());
   console.log('✅ Sistema inicializado correctamente');
};