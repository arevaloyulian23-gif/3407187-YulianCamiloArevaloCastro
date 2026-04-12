// ============================================
// PROYECTO SEMANA 07 — Librería de Funciones
// Dominio: sistema y gestión de flotas
// ============================================

// NOTA PARA EL APRENDIZ:
// Adapta este proyecto a tu dominio asignado.
// Todos los nombres genéricos (item, value, category, etc.)
// deben reemplazarse con nombres específicos de tu dominio.
//
// Ejemplos de adaptación:
// - Biblioteca: book, author, available, fine
// - Farmacia: medicine, price, stock, laboratory
// - Gimnasio: member, plan, active, bmi
// - Restaurante: dish, price, available, category
// - Banco: account, balance, interest, active
// - Hospital: patient, age, hasAppointment, doctor

"use strict";

// ============================================
// SECCIÓN 1: Constantes y datos del dominio
// ============================================

const DOMAIN_NAME = "Gestión de Flota Transmilenio";
const VALUE_LABEL = "Capacidad"; 
const TICKET_PRICE = 2950; // Valor actual del pasaje

const items = [
  { id: "BUS-01", type: "Articulado", capacity: 160, active: true, station: "Portal Norte" },
  { id: "BUS-02", type: "Biarticulado", capacity: 250, active: true, station: "Portal 80" },
  { id: "BUS-03", type: "Alimentador", capacity: 80, active: false, station: "Patio Bonito" },
  { id: "BUS-04", type: "Dual", capacity: 90, active: true, station: "Museo Nacional" },
  { id: "BUS-05", type: "Biarticulado", capacity: 250, active: false, station: "Portal Tunal" }
];

// ============================================
// SECCIÓN 2: Función de formato (Arrow Function)
// ============================================

const formatItem = (bus) => 
  `🚌 [${bus.id}] ${bus.type} — Ubicación: ${bus.station} — Capacidad: ${bus.capacity} pax`;

// ============================================
// SECCIÓN 3: Función de cálculo (Pura)
// ============================================

// Calcula el ingreso potencial por bus si se llena al 100%
const calculateValue = (capacity, price = TICKET_PRICE) => capacity * price;

// ============================================
// SECCIÓN 4: Función de validación
// ============================================

// Un bus es válido para operar solo si su estado es 'active'
const isValid = (bus) => bus.active === true;

// ============================================
// SECCIÓN 5: Función con parámetro por defecto
// ============================================

const formatWithDefault = (value, label = "Monto", currency = "COP") => {
  const formattedValue = new Intl.NumberFormat('es-CO').format(value);
  return `${label}: ${currency} $${formattedValue}`;
};

// ============================================
// SECCIÓN 6: Reporte usando las funciones
// ============================================

console.log(`\n${"═".repeat(50)}`);
console.log(`     SISTEMA INTEGRADO — ${DOMAIN_NAME.toUpperCase()}`);
console.log(`${"═".repeat(50)}`);

if (items.length === 0) {
  console.log("\n⚠️  Alerta: No hay buses registrados en el sistema.");
} else {
  // --- Listado ---
  console.log("\n📋 ESTADO ACTUAL DE LA FLOTA:");
  let lineNumber = 1;
  for (const bus of items) {
    const statusEmoji = isValid(bus) ? "✅" : "❌";
    console.log(`  ${lineNumber}. ${statusEmoji} ${formatItem(bus)}`);
    lineNumber++;
  }

  // --- Validación y Conteo ---
  let validCount = 0;
  for (const bus of items) {
    if (isValid(bus)) validCount++;
  }
  console.log(`\n📊 Resumen operativo: ${validCount} de ${items.length} buses en servicio.`);

  // --- Cálculo de Ingreso Proyectado ---
  let totalPotentialRevenue = 0;
  for (const bus of items) {
    if (isValid(bus)) {
      // Calculamos el ingreso solo de los buses que sí están operando
      totalPotentialRevenue += calculateValue(bus.capacity);
    }
  }

  console.log(`${"-".repeat(50)}`);
  console.log(formatWithDefault(totalPotentialRevenue, "Ingreso potencial (Buses activos)"));
}

console.log(`\n${"═".repeat(50)}\n`);