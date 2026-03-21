/**
 * ============================================
 * MÓDULO DE CONFIGURACIÓN - GESTIÓN DE FLOTAS
 * ============================================
 */

 // ============================================
 // CONFIGURACIÓN DE LA APLICACIÓN
 // ============================================
export const APP_CONFIG = {
  name: 'Sistema de Gestión de Flotas',
  version: '1.0.0',
  storageKey: 'fleet_vehicles', // key para localStorage
};

// ============================================
// UMBRALES Y LÍMITES
// ============================================
export const THRESHOLDS = {
  lowCapacity: 5,      
  criticalCapacity: 1,  
};

// ============================================
// TIPOS DE VEHÍCULO (CATEGORÍAS)
// ============================================
export const CATEGORIES = [
  { id: 'truck', name: 'Camión', icon: '🚛' },
  { id: 'bus', name: 'Bus', icon: '🚌' },
  { id: 'car', name: 'Auto', icon: '🚗' },
  { id: 'motorcycle', name: 'Moto', icon: '🏍️' },
  { id: 'van', name: 'Furgoneta', icon: '🚐' },
];

// ============================================
// ESTADOS POSIBLES
// ============================================
export const STATES = {
  ACTIVE: { id: 'active', name: 'Activo', color: '#22c55e' },
  INACTIVE: { id: 'inactive', name: 'Inactivo', color: '#ef4444' },
};

// ============================================
// DEFAULT EXPORT
// ============================================
export default {
  APP_CONFIG,
  THRESHOLDS,
  CATEGORIES,
  STATES,
};