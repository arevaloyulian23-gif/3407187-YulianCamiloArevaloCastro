// la informacion se este trabajo esta basada en el sistema de la flota de buses de bogotaDC "Transmilenio"  
const DOMAIN_NAME = "SISTEMA DE GESTION DE FLOTAS";
const itemName = "Gestion Vehicular";
const itemCategory = "informacion del vehiculo";
const itemQuantityVehicle = 150;
const itemPrice = 3550;
const itemInOperation = true;
const assignedDriver = null;
//
console.log("===========================");
console.log(`FICHA DE DATOS: ${DOMAIN_NAME}`);
console.log("===========================");
//
console.log("");
console.log(`Nombre:                 ${itemName}`);
console.log(`Categoría:              ${itemCategory}`);
console.log(`Cantidad de Vehiculos:  ${itemQuantityVehicle}`);
console.log(`Precio Del Paje:        ${itemPrice}`);
console.log(`En Operación:           ${itemInOperation}`);
console.log(`Conductor Asignado:     ${assignedDriver}`);
console.log("");
//
console.log("--- Tipos de datos ---");
//
console.log("typeof itemName:     ", typeof itemName);
console.log("typeof itemCategory: ", typeof itemCategory);
console.log("typeof itemQuantityVehicle: ", typeof itemQuantityVehicle);
console.log("typeof itemPrice:    ", typeof itemPrice);
console.log("typeof itemInOperation: ", typeof itemInOperation);
console.log("typeof assignedDriver: ", typeof assignedDriver);
console.log("");
//
console.log("--- Conversiones ---");
//
const itemQuantity = 5;
const quantityAsText = String(itemQuantity);
console.log("Valor como texto:", quantityAsText);
console.log("typeof (convertido):", typeof quantityAsText);
console.log("");

console.log("--- Valor nulo ---");
console.log("Conductor Asignado:",  assignedDriver);
console.log("Sigue sin asignar:",   assignedDriver === null);
console.log("===========================");
console.log("FIN DE FICHA");
console.log("===========================");