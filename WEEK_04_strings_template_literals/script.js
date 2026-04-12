// ============================================
// SECCIÓN 1: Datos del dominio - Transmilenio
// ============================================

const DOMAIN_NAME = "Sistema Transmilenio";
const rawEntityName = "   estación avenida caracas   ";
const entityCategory = "Troncal";
const entityCode = "TR-CAR-001";
const entityDescription = "Estación de alta densidad ubicada en el corazón de la troncal Caracas.";
const mainValue = 85000; 
const isActive = true;


// ============================================
// SECCIÓN 2: Transformaciones de string
// ============================================


const entityName = rawEntityName.trim();
const entityNameUpper = entityName.toUpperCase();
const entityNameLower = entityName.toLowerCase();
const codePrefix = entityCode.slice(0, 3);


// ============================================
// SECCIÓN 3: Validaciones con búsqueda
// ============================================

const hasValidPrefix = entityCode.startsWith(codePrefix);
const descriptionIsRelevant = entityDescription.includes("Caracas");
const hasValidSuffix = entityCode.endsWith("001");


// ============================================
// SECCIÓN 4: Generación de la ficha principal
// ============================================

const separator = "=".repeat(50);
const subSeparator = "-".repeat(50);

const mainCard = `
${separator}
   ${DOMAIN_NAME.toUpperCase()} — FICHA TÉCNICA
${separator}
Nombre Limpio:   ${entityNameUpper}
Categoría:       ${entityCategory}
Código Interno:  ${entityCode}
Prefijo Ruta:    ${codePrefix}
Flujo Diario:    ${mainValue.toLocaleString()} pasajeros
Estado Operativo: ${isActive ? "✅ OPERATIVA" : "❌ CERRADA"}

${subSeparator}
Descripción Detallada:
${entityDescription}
${separator}
`;

console.log(mainCard);


// ============================================
// SECCIÓN 5: Validaciones de Integridad
// ============================================

console.log("--- Reporte de Integridad de Datos ---");
console.log(`¿El código mantiene el prefijo '${codePrefix}'?: ${hasValidPrefix}`);
console.log(`¿La descripción menciona el sector clave?: ${descriptionIsRelevant}`);
console.log(`¿El sufijo de ID es correcto (001)?: ${hasValidSuffix}`);
console.log("");


// ============================================
// SECCIÓN 6: Mensaje de notificación corto
// ============================================

console.log("--- Notificación de Sistema ---");

const notification = ` ALERTA: La estación ${entityName} [ID: ${entityCode}] ha actualizado su estado operativo.`;
console.log(notification);
console.log("");