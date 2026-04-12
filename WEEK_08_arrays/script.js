// ============================================
// SEMANA 08 — PROYECTO: Gestión de Inventario
// ============================================
// INSTRUCCIONES:
// 1. Reemplaza DOMAIN_NAME con el nombre de tu dominio asignado
// 2. Reemplaza VALUE_LABEL con la etiqueta de tu unidad de valor
//    Ejemplos: "unidades", "libros", "medicamentos", "miembros"
// 3. Define tu array items con objetos de tu dominio
// 4. Completa cada TODO con la implementación contextualizada
// ============================================

// ---- CONFIGURA TU DOMINIO ----
const DOMAIN_NAME = "Mi Inventario"; // TODO: Cambiar por tu dominio
const VALUE_LABEL = "elementos";     // TODO: Cambiar por unidad de tu dominio

// ============================================
// 1. ARRAY INICIAL — Define tu inventario
// ============================================

// TODO: Definir el array con mínimo 5 objetos de tu dominio.
// Cada objeto debe tener:
//   - id: número único
//   - name: nombre del elemento
//   - [propiedad numérica]: precio, cantidad, puntuación, etc.
//   - [propiedad booleana]: active, available, inStock, etc.
//   - [otras 2+ propiedades relevantes a tu dominio]
//
// Ejemplos por dominio:
// Biblioteca:  { id, name, author, year, available: true }
// Farmacia:    { id, name, price, stock, requiresPrescription: false }
// Gimnasio:    { id, name, memberSince, plan, active: true }
// Restaurante: { id, name, price, category, available: true }

const items = [
  { id: 101, name: "Bus Articulado A1", capacity: 160, active: true, model: 2018, fuel: "Diesel" },
  { id: 102, name: "Bus Biarticulado B2", capacity: 250, active: true, model: 2022, fuel: "Gas" },
  { id: 103, name: "Bus Alimentador L1", capacity: 80, active: false, model: 2015, fuel: "Diesel" },
  { id: 104, name: "Bus Dual D4", capacity: 90, active: true, model: 2020, fuel: "Híbrido" },
  { id: 105, name: "Bus Eléctrico E5", capacity: 80, active: true, model: 2023, fuel: "Eléctrico" }
];

// ============================================
// 2. FUNCIONES DE GESTIÓN
// ============================================

/**
 * Agrega un nuevo elemento al inventario
 * @param {Object} newItem - Elemento a agregar
 */
const addItem = (newItem) => {
  items.push(newItem);
  console.log(` Agregado al inventario: ${newItem.name}`);
};

/**
 * Elimina el último elemento del inventario
 * @returns {Object} El elemento eliminado
 */
const removeLastItem = () => {
  const removed = items.pop();
  console.log(` Bus retirado del patio (último): ${removed?.name}`);
  return removed;
};

/**
 * Agrega un elemento prioritario al inicio del inventario
 * @param {Object} priorityItem - Elemento a agregar con prioridad
 */
const addPriorityItem = (priorityItem) => {
  items.unshift(priorityItem);
  console.log(` Bus prioritario en plataforma: ${priorityItem.name}`);
};

/**
 * Elimina un elemento por su posición (índice)
 * @param {number} index - Posición del elemento a eliminar
 */
const removeByIndex = (index) => {
  if (index >= 0 && index < items.length) {
    const removed = items.splice(index, 1);
    console.log(`🗑️ Eliminado por índice [${index}]: ${removed[0].name}`);
  }
};

/**
 * Obtiene todos los elementos activos/disponibles
 * @returns {Array} Array de elementos activos
 */
const getActiveItems = () => {
  // Filtramos buses que están operativos (active: true)
  return items.filter(bus => bus.active === true);
};

/**
 * Busca un elemento por su nombre
 * @param {string} name - Nombre a buscar
 * @returns {Object|undefined} El elemento encontrado o undefined
 */
const findByName = (name) => {
  return items.find(bus => bus.name.toLowerCase() === name.toLowerCase());
};

/**
 * Formatea un elemento para mostrar en el reporte
 * @param {Object} item - Elemento a formatear
 * @returns {string} Texto formateado
 */
const formatItem = (bus) => {
  const status = bus.active ? "🟢 OK" : "🔴 MANTENIMIENTO";
  return `[ID: ${bus.id}] ${bus.name.padEnd(20)} | Cap: ${bus.capacity} | ${bus.fuel} | ${status}`;
};

// ============================================
// 3. REPORTE
// ============================================

console.log(`\n${"=".repeat(60)}`);
console.log(`📦 GESTIÓN DE ${DOMAIN_NAME.toUpperCase()}`);
console.log(`${"=".repeat(60)}\n`);

// Estado inicial
console.log(`📋 Inventario inicial (${items.length} ${VALUE_LABEL}):`);
items.forEach(bus => console.log(`  ${formatItem(bus)}`));

console.log("\n--- Operaciones de movimiento en Patio ---\n");

addItem({ id: 106, name: "Bus Refuerzo R6", capacity: 160, active: true, model: 2021, fuel: "Gas" });

addPriorityItem({ id: 99, name: "Bus Ambulancia S1", capacity: 20, active: true, model: 2024, fuel: "Eléctrico" });

removeByIndex(3); // Eliminamos el bus en la posición 3

removeLastItem(); // Quitamos el último de la fila

console.log("\n--- Inventario después de movimientos ---\n");
items.forEach(bus => console.log(`  ${formatItem(bus)}`));

console.log("\n--- Búsqueda y filtrado ---\n");

const busBuscado = findByName("Bus Biarticulado B2");
console.log(`🔍 Resultado de búsqueda:`, busBuscado ? formatItem(busBuscado) : "No encontrado");

const activos = getActiveItems();
console.log(`📊 Buses operativos hoy: ${activos.length}`);

console.log("\n--- Transformación de Datos ---\n");

// Usar map para obtener solo los nombres
const soloNombres = items.map(bus => bus.name);
console.log("📝 Listado rápido de nombres:", soloNombres.join(" | "));

// Usar map para proyectar capacidad al 110% (Sobrecupo permitido en hora pico)
const capacidadHoraPico = items.map(bus => ({
  nombre: bus.name,
  maxPaxPico: Math.floor(bus.capacity * 1.1)
}));
console.log("⚡ Proyección de capacidad en Hora Pico (110%):");
capacidadHoraPico.forEach(p => console.log(`   - ${p.nombre}: ${p.maxPaxPico} pasajeros`));

console.log("\n--- Resumen final ---\n");
const totalBuses = items.length;
const totalActivos = getActiveItems().length;
console.log(`Total en patio: ${totalBuses} ${VALUE_LABEL}`);
console.log(`Operativos: ${totalActivos} | En taller: ${totalBuses - totalActivos}`);

console.log(`\n${"=".repeat(60)}`);
console.log("✅ Sistema de inventario sincronizado");
console.log(`${"=".repeat(60)}\n`);