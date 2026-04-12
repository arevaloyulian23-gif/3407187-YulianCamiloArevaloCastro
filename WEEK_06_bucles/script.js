// ============================================
// SECCIÓN 1: Datos del dominio (Flota Transmilenio)
// ============================================
 
const fleet = [
  { name: "Bus A-102", category: "Alimentador", capacity: 80 },
  { name: "Bus T-500", category: "Troncal", capacity: 160 },
  { name: "Bus B-099", category: "Biarticulado", capacity: 250 },
  { name: "Bus D-210", category: "Dual", capacity: 90 },
  { name: "Bus T-501", category: "Troncal", capacity: 160 },
  { name: "Bus B-100", category: "Biarticulado", capacity: 250 }
];

const categories = ["Alimentador", "Troncal", "Biarticulado", "Dual"];

const valueLabel = "Capacidad de Pasajeros";

// ============================================
// SECCIÓN 2: Listado completo con for...of
// ============================================
console.log("=== LISTADO COMPLETO DE FLOTA ===");

let lineNumber = 0;
for (const bus of fleet) {
  lineNumber++;
  console.log(`${lineNumber}. ${bus.name} — [${bus.category}] — ${valueLabel}: ${bus.capacity}`);
}

console.log("");

// ============================================
// SECCIÓN 3: Contadores por categoría
// ============================================
console.log("=== CONTEO POR TIPO DE VEHÍCULO ===");

for (const category of categories) {
  let count = 0;

  for (const bus of fleet) {
    if (bus.category === category) {
      count++;
    }
  }
  console.log(`${category}: ${count} unidad(es)`);
}

console.log("");

// ============================================
// SECCIÓN 4: Totales y promedio
// ============================================
console.log("=== ESTADÍSTICAS DE CAPACIDAD ===");

let totalCapacity = 0;

for (const bus of fleet) {
  totalCapacity += bus.capacity;
}

const averageCapacity = fleet.length > 0 ? totalCapacity / fleet.length : 0;

console.log(`Capacidad Total del Sistema: ${totalCapacity} pasajeros`);
console.log(`Promedio de Capacidad por Bus: ${averageCapacity.toFixed(1)} pasajeros`);

console.log("");

// ============================================
// SECCIÓN 5: Máximo y mínimo
// ============================================
console.log("=== VEHÍCULOS DE MAYOR Y MENOR IMPACTO ===");

let maxBus = fleet[0] ?? null;
let minBus = fleet[0] ?? null;

if (fleet.length > 0) {
  for (const bus of fleet) {
    if (bus.capacity > maxBus.capacity) maxBus = bus;
    if (bus.capacity < minBus.capacity) minBus = bus;
  }

  console.log(`Mayor ${valueLabel}: ${maxBus.name} (${maxBus.capacity} pax)`);
  console.log(`Menor ${valueLabel}: ${minBus.name} (${minBus.capacity} pax)`);
}

console.log("");

// ============================================
// SECCIÓN 6: Reporte detallado con for clásico
// ============================================
console.log("=== REPORTE DE EFICIENCIA (vs Promedio) ===");

for (let i = 0; i < fleet.length; i++) {
  const bus = fleet[i];

  // Determinar si está sobre o bajo el promedio
  const comparison = bus.capacity >= averageCapacity 
    ? "ALTA CAPACIDAD (Superior al promedio)" 
    : "BAJA CAPACIDAD (Inferior al promedio)";

  console.log(`${i + 1}. ${bus.name} — ${comparison}`);
}

console.log("");
console.log("=== FIN DEL REPORTE DE GESTIÓN ===");