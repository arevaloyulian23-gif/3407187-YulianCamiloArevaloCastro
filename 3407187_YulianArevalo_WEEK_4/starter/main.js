/**
 * ============================================
 * SISTEMA DE GESTIÓN DE FLOTAS - MAIN.JS
 * ============================================
 */

// ============================================
// IMPORTAR DEPENDENCIAS
// ============================================
import { CATEGORIES } from './config.js'; // tipos de vehículo
import { manager } from './services/index.js'; // manager de vehículos
import {
  initEvents,
  renderVehicles,
  renderCategoryOptions,
  updateVehicleCount
} from './ui/index.js';

// ============================================
// INICIALIZAR LA APLICACIÓN
// ============================================
const init = () => {
  console.log('🚌 Iniciando sistema de flotas...');

  // 1. Cargar vehículos desde localStorage
  manager.loadFromStorage();

  // 2. Renderizar tipos en todos los selects
  const selects = [
    document.getElementById('type'),
    document.getElementById('edit-type'),
    document.getElementById('filter-type')
  ];
  renderCategoryOptions(selects, CATEGORIES);

  // 3. Renderizar tabla de vehículos
  renderVehicles(manager.getAll(), document.getElementById('vehicles-body'));

  // 4. Actualizar contador de vehículos
  updateVehicleCount(manager.getCount());

  // 5. Inicializar event listeners (agregar, editar, filtrar)
  initEvents();

  console.log('✅ Sistema de flotas inicializado correctamente');
};

// ============================================
// CARGAR REPORTES (DYNAMIC IMPORT)
// ============================================
const loadReports = async () => {
  try {
    const { generateReport, getStatistics } = await import('./features/reports.js');

    const vehicles = manager.getAll();
    const report = generateReport(vehicles);
    const stats = getStatistics(vehicles);

    console.log('📊 Reporte generado:', report);
    return { report, stats };
  } catch (error) {
    console.error('Error cargando módulo de reportes:', error);
    throw error;
  }
};

// ============================================
// EXPORTAR DATOS (DYNAMIC IMPORT)
// ============================================
const loadExport = async format => {
  try {
    const exportModule = await import('./features/export.js');
    const vehicles = manager.getAll();

    if (format === 'csv') {
      exportModule.exportToCSV(vehicles);
    } else {
      exportModule.exportToJSON(vehicles);
    }
  } catch (error) {
    console.error('Error cargando módulo de exportación:', error);
  }
};

// ============================================
// EJECUTAR CUANDO EL DOM ESTÉ LISTO
// ============================================
document.addEventListener('DOMContentLoaded', init);

// ============================================
// EXPORTAR FUNCIONES
// ============================================
export { init, loadReports, loadExport };