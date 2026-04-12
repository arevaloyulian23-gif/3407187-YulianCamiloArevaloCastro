// ============================================
// PROYECTO SEMANA 05: Clasificador
// Condicionales — if/else, ternario, switch, ??, ?.
// ============================================
//
// NOTA PARA EL APRENDIZ:
// Adapta este script a tu dominio asignado.
// Reemplaza los comentarios TODO con tu propia implementación.
// Usa los conceptos aprendidos esta semana.
//
// Ejecuta con: node starter/script.js
// ============================================

// ============================================
// SECCIÓN 1: Datos del elemento de tu dominio
// ============================================

// TODO: Define al menos 5 variables con datos de un elemento de tu dominio.
// Ejemplos orientativos:
// - Un libro, medicamento, miembro, estudiante, producto, etc.
// - Incluye: nombre, estado, valor numérico, tipo (string), y alguna propiedad opcional

const elementName = "Bus Articulado J23"; 
const elementStatus = "en_ruta";        // "en_ruta", "mantenimiento", "fuera_servicio"
const elementValue = 75;                // Porcentaje de ocupación (0-100)
const elementType = "biarticulado";     // "articulado", "biarticulado", "dual"
const elementInfo = {                   // Objeto opcional
    sensorId: "S-992",
    lastMaintenance: "2026-03-15",
    driverName: "Yulian Arevalo"
};
// ============================================
// SECCIÓN 2: Clasificación con if / else if / else
// ============================================

// TODO: Clasifica el elemento en al menos 3 niveles según elementValue.
// Ejemplo de estructura:
// let classification;
// if (elementValue >= ...) {
//   classification = "...";
// } else if (elementValue >= ...) {
//   classification = "...";
// } else {
//   classification = "...";
// }

let classification;
if (elementValue >= 90) {
    classification = "Crítica (Sobrecupo)";
} else if (elementValue >= 50) {
    classification = "Media (Sostenible)";
} else if (elementValue >= 10) {
    classification = "Baja (Baja demanda)";
} else {
    classification = "Vacío / En tránsito";
}
// ============================================
// SECCIÓN 3: Estado binario con operador ternario
// ============================================

// TODO: Usa el ternario para determinar un estado de dos opciones.
// Ejemplo: const statusLabel = elementStatus === "active" ? "Activo" : "Inactivo";

const statusLabel = elementStatus === "en_ruta" ? "🟢 En Operación" : "🔴 Fuera de Servicio"; // TODO: implementar con ternario

// ============================================
// SECCIÓN 4: Tipo con switch
// ============================================

// TODO: Usa switch sobre elementType para asignar una etiqueta.
// Ejemplo:
// switch (elementType) {
//   case "typeA": typeLabel = "..."; break;
//   case "typeB": typeLabel = "..."; break;
//   default: typeLabel = "Tipo desconocido";
// }

let typeLabel;
switch (elementType) {
    case "articulado":
        typeLabel = "Bus Estándar (160 pax)";
        break;
    case "biarticulado":
        typeLabel = "Bus Extra Largo (250 pax)";
        break;
    case "dual":
        typeLabel = "Bus Híbrido (Dual)";
        break;
    default:
        typeLabel = "Tipo de flota no identificado";
} // TODO: implementar con switch

// ============================================
// SECCIÓN 5: Valor por defecto con ??
// ============================================

// TODO: Usa ?? para obtener un valor de fallback cuando sea null o undefined.
// Ejemplo: const displayName = elementName ?? "Sin nombre";

const displayName = elementName ?? "Unidad Anónima";
const infoDetail = elementInfo?.driverName ?? "Conductor no asignado";
// ============================================
// SECCIÓN 6: Acceso seguro con ?.
// ============================================

// TODO: Accede de forma segura a una propiedad de elementInfo.
// Ejemplo: const location = elementInfo?.location ?? "Ubicación no especificada";

const safeProperty = elementInfo?.sensorId ?? "Sin sensor activo"; // TODO: elementInfo?.tuPropiedad ?? "valor por defecto"

// ============================================
// SECCIÓN 7: Ficha de salida
// ============================================

// TODO: Muestra la ficha en consola con template literals (sin concatenación +)
// Incluye todos los resultados de las secciones anteriores

console.log("=".repeat(45));
console.log("   SISTEMA TRANSMILENIO - REPORTE OPERATIVO");
console.log("=".repeat(45));
console.log(`Vehículo:       ${displayName}`);
console.log(`Estado:         ${statusLabel}`);
console.log(`Capacidad:      ${elementValue}% - ${classification}`);
console.log(`Tipo de Flota:  ${typeLabel}`);
console.log(`Responsable:    ${infoDetail}`);
console.log(`ID Técnico:     ${safeProperty}`);
console.log("=".repeat(45));