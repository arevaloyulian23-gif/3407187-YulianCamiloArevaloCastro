/**
 * Services Barrel Export
 * Re-exports all services from a single entry point
 */

// TODO: Import and re-export all services
 export { default as storage } from './storage.js';
 export { manager } from './vehicleManager.js';

// You can also export named exports
 export * from './storage.js';