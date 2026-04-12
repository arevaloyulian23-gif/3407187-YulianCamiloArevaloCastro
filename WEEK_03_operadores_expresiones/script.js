// ============================================
// SECCIÓN 1: Datos del dominio
// ============================================

// TODO: Define las constantes base de tu dominio
// Ejemplos con dominios no asignables:
//   Planetario:   TICKET_PRICE = 12_000, MAX_CAPACITY = 45
//   Acuario:      DAILY_FEEDING_KG = 150, ENTRY_PRICE = 35_000
//   Museo:        ADULT_TICKET = 20_000, GUIDED_TOUR = 15_000
//   Zoológico:    FOOD_COST_PER_DAY = 500_000, MAX_VISITORS = 800
//   Observatorio: SESSION_DURATION = 90, TICKET_PRICE = 18_000

// const EXAMPLE_CONSTANT = 0; // TODO: Reemplazar con tus constantes
// Dominio: sistema y gestion de flotas especificamente trasmilenio

const BusCapacity = 80;
const TicketPrice = 2_500;
const DailyRoutes = 10;
const FuelCostPerRoute = 150_000;
const MaintenanceCostPerBus = 500_000;
const NumberOfBuses = 50;
const SalaryPerDriver = 3_000_000;
const TotalProfitsPerMonth = 200_000_000;

// ============================================
// SECCIÓN 2: Operaciones aritméticas
// ============================================
console.log("=== Operaciones básicas ===");
console.log("");

// TODO: Calcula totales, subtotales o valores clave de tu dominio
// Usa: +, -, *, /, %, **
// Etiqueta cada resultado con console.log()

// Ejemplo con dominio Planetario (NO copiar):
// const ticketPrice = 12_000;
// const attendees = 38;
// const totalRevenue = ticketPrice * attendees;
// console.log("Ingresos función:", totalRevenue);
// const remainingSeats = 45 - attendees;
// console.log("Asientos disponibles:", remainingSeats);

console.log("Total de ganancias por ruta:", TicketPrice * BusCapacity);
console.log("Ganancias diarias por ruta:", TicketPrice * BusCapacity * DailyRoutes);
console.log("Costo total de combustible por día:", FuelCostPerRoute * DailyRoutes);
console.log("Costo total de mantenimiento por día:", MaintenanceCostPerBus * NumberOfBuses);
console.log("División de las ganancias por mes entre el número de buses:", TotalProfitsPerMonth / NumberOfBuses);
console.log("Resto de ganancias después de pagar salarios:", TotalProfitsPerMonth - (SalaryPerDriver * NumberOfBuses));

console.log("");

// ============================================
// SECCIÓN 3: Asignación compuesta
// ============================================
console.log("=== Asignación compuesta ===");
console.log("");

// TODO: Usa +=, -=, *=, /= para actualizar valores acumulados
// Muestra el valor antes y después de cada operación

// Ejemplo (NO copiar):
// let runningTotal = 0;
// runningTotal += 25_000;
// console.log("Tras primer item:", runningTotal);
// runningTotal += 18_000;
// console.log("Tras segundo item:", runningTotal);
// runningTotal *= 0.90; // descuento del 10%
// console.log("Con descuento:", runningTotal);

let TotalOperatingCost = 0;

TotalOperatingCost += (FuelCostPerRoute * DailyRoutes);
console.log("Tras sumar combustible diario:", TotalOperatingCost);

TotalOperatingCost += (MaintenanceCostPerBus * NumberOfBuses / 30);
console.log("Tras sumar mantenimiento diario prorrateado:", TotalOperatingCost);

// Supongamos que hay un cargo administrativo extra del 5% sobre los costos
TotalOperatingCost *= 1.05; 
console.log("Costos totales tras cargo administrativo (5%):", TotalOperatingCost);

// Restamos un subsidio gubernamental fijo
TotalOperatingCost -= 100_000;
console.log("Costos finales tras aplicar subsidio:", TotalOperatingCost);

console.log("");

// ============================================
// SECCIÓN 4: Comparación estricta
// ============================================
console.log("=== Validaciones con === ===");
console.log("");

// TODO: Valida condiciones usando === y operadores de orden
// NUNCA uses == (penalización en la rúbrica)

// Ejemplo (NO copiar):
// const daysLate = 5;
// const isOnTime = daysLate === 0;
// console.log("¿Entregado a tiempo?", isOnTime);
// const hasFine = daysLate > 0;
// console.log("¿Tiene multa?", hasFine);
const ActiveBuses = 48;
const fullFleet = ActiveBuses === NumberOfBuses;
console.log("¿Está la flota operando al 100%?:", fullFleet);

// 2. Verificar si se alcanzó la meta de ganancias mensual
const metaMinima = 180_000_000;
const MetTheGoal = TotalProfitsPerMonth >= metaMinima;
console.log("¿Se cumplió la meta de ingresos mensual?:", MetTheGoal);

// 3. Validar si el bus va con sobrecupo
const CurrentPassengers = 85;
const hasOvercrowding = CurrentPassengers > BusCapacity;
console.log("¿El bus actual excede la capacidad permitida?:", hasOvercrowding);

// 4. Comprobar si el costo de nómina es igual a una cifra específica proyectada
const PayrollBudget = 150_000_000;
const nominaExacta = (SalaryPerDriver * NumberOfBuses) === PayrollBudget;
console.log("¿La nómina coincide exactamente con el presupuesto?:", nominaExacta);

console.log("");

// ============================================
// SECCIÓN 5: Operadores lógicos
// ============================================
console.log("=== Condiciones lógicas ===");
console.log("");
// TODO: Combina condiciones con &&, ||, !
// Al menos una condición con && y una con ||

// Ejemplo (NO copiar):
// const isMember = true;
// const purchaseAmount = 150_000;
// const qualifiesForDiscount = isMember && purchaseAmount >= 100_000;
// console.log("¿Descuento aplicable?", qualifiesForDiscount);
const HasDriver = true;
const HasMaintenance = false;
const CanGoOnRoute = HasDriver && !HasMaintenance;
console.log("¿El bus cumple requisitos para salir?:", CanGoOnRoute);

const Mileage = 6200;
const YearsOfService = 3;
const   NeedsInspection = Mileage > 5000 || YearsOfService > 5;
console.log("¿Requiere revisión técnica inmediata?:", NeedsInspection);

// 3. Condición combinada: ¿Es una ruta rentable?
// Es rentable si los ingresos diarios superan los costos de combustible Y hay alta ocupación
const DailyRevenue = TicketPrice * BusCapacity * DailyRoutes;
const FuelCosts = FuelCostPerRoute * DailyRoutes;
const HighOccupancy = true;
const SuccessfulRoute = (DailyRevenue > FuelCosts) && HighOccupancy;
console.log("¿La ruta actual es considerada exitosa?:", SuccessfulRoute);

console.log("");

// ============================================
// SECCIÓN 6: Resumen final
// ============================================
console.log("=== Resumen ===");
console.log("");

// TODO: Muestra un resumen con los valores más importantes
// calculados en las secciones anteriores
const TotalSalaryMonthly = SalaryPerDriver * NumberOfBuses;
const FinalBalance = TotalProfitsPerMonth - TotalSalaryMonthly;

console.log("Nombre del Sistema: Transmilenio");
console.log("Número de buses en flota:", NumberOfBuses);
console.log("Capacidad total de pasajeros:", NumberOfBuses * BusCapacity);
console.log("Costo mensual de nómina: $", TotalSalaryMonthly);
console.log("Ganancia mensual neta (post-nómina): $", FinalBalance);

// Una validación final rápida
const HealthyFinancialStatus = FinalBalance > 0;
console.log("¿El sistema es financieramente autosostenible?:", HealthyFinancialStatus);

console.log("");