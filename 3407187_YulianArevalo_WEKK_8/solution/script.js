// ============================================
// PAGINADOR CON GENERADORES - GESTIÓN DE FLOTAS
// ============================================

// ============================================
// GENERADOR DE DATOS
// ============================================

/**
 * Generador que produce buses simulados
 * @param {number} total - Cantidad total de buses a generar
 * @yields {Object} Bus con id, title y description
 */
function* dataGenerator(total) {
  const routes = [
    'Ruta Norte',
    'Ruta Sur',
    'Ruta Centro',
    'Ruta Occidente',
    'Ruta Oriente',
  ];

  const terminals = [
    'Terminal Norte',
    'Terminal Sur',
    'Patio Central',
    'Estación 80',
    'Portal Industrial',
  ];

  const statuses = [
    'En servicio',
    'En mantenimiento',
    'Disponible',
    'En ruta',
    'Fuera de operación',
  ];

  for (let i = 1; i <= total; i++) {
    const route = routes[(i - 1) % routes.length];
    const terminal = terminals[(i - 1) % terminals.length];
    const status = statuses[(i - 1) % statuses.length];

    yield {
      id: i,
      title: `Bus ${String(i).padStart(3, '0')} - ${route}`,
      description: `Asignado a ${terminal} | Estado: ${status}`,
    };
  }
}

// ============================================
// UTILIDADES DE GENERADORES
// ============================================

/**
 * Toma los primeros n elementos de un iterador
 * @param {Iterator} iterator - Iterador fuente
 * @param {number} n - Cantidad de elementos a tomar
 * @yields {*} Elementos del iterador
 */
function* take(iterator, n) {
  let count = 0;

  for (const item of iterator) {
    if (count >= n) break;
    yield item;
    count++;
  }
}

/**
 * Salta los primeros n elementos de un iterador
 * @param {Iterator} iterator - Iterador fuente
 * @param {number} n - Cantidad de elementos a saltar
 * @yields {*} Elementos restantes del iterador
 */
function* skip(iterator, n) {
  let skipped = 0;

  for (const item of iterator) {
    if (skipped < n) {
      skipped++;
      continue;
    }
    yield item;
  }
}

// ============================================
// CLASE PAGINATOR
// ============================================

/**
 * Paginador que usa generadores para lazy loading
 */
class Paginator {
  /**
   * @param {Function} generatorFn - Función generadora de datos
   * @param {number} totalItems - Total de items disponibles
   * @param {number} itemsPerPage - Items a mostrar por página
   */
  constructor(generatorFn, totalItems, itemsPerPage = 5) {
    this.generatorFn = generatorFn;
    this.totalItems = totalItems;
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
  }

  /**
   * Calcula el total de páginas
   * @returns {number} Total de páginas
   */
  get totalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  /**
   * Verifica si hay página siguiente
   * @returns {boolean}
   */
  get hasNext() {
    return this.currentPage < this.totalPages;
  }

  /**
   * Verifica si hay página anterior
   * @returns {boolean}
   */
  get hasPrevious() {
    return this.currentPage > 1;
  }

  /**
   * Obtiene los items de la página actual usando generadores
   * @returns {Array} Items de la página actual
   */
  getPageItems() {
    const generator = this.generatorFn(this.totalItems);
    const itemsToSkip = (this.currentPage - 1) * this.itemsPerPage;

    const skipped = skip(generator, itemsToSkip);
    const pagedItems = take(skipped, this.itemsPerPage);

    return [...pagedItems];
  }

  /**
   * Va a la página siguiente
   * @returns {boolean} true si cambió de página
   */
  next() {
    if (this.hasNext) {
      this.currentPage++;
      return true;
    }
    return false;
  }

  /**
   * Va a la página anterior
   * @returns {boolean} true si cambió de página
   */
  previous() {
    if (this.hasPrevious) {
      this.currentPage--;
      return true;
    }
    return false;
  }

  /**
   * Va a una página específica
   * @param {number} page - Número de página
   * @returns {boolean} true si la página es válida
   */
  goToPage(page) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      return true;
    }
    return false;
  }

  /**
   * Va a la primera página
   */
  first() {
    this.currentPage = 1;
  }

  /**
   * Va a la última página
   */
  last() {
    this.currentPage = this.totalPages;
  }

  /**
   * Cambia la cantidad de items por página
   * @param {number} newItemsPerPage - Nueva cantidad
   */
  setItemsPerPage(newItemsPerPage) {
    const firstVisibleItem = (this.currentPage - 1) * this.itemsPerPage + 1;

    this.itemsPerPage = newItemsPerPage;
    this.currentPage = Math.ceil(firstVisibleItem / this.itemsPerPage);

    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
  }

  /**
   * Obtiene el rango de items mostrados
   * @returns {Object} { start, end } del rango actual
   */
  getRange() {
    const start = (this.currentPage - 1) * this.itemsPerPage + 1;
    const end = Math.min(this.currentPage * this.itemsPerPage, this.totalItems);

    return { start, end };
  }
}

// ============================================
// CONTROLADOR DE UI
// ============================================

// Estado de la aplicación
let paginator = null;

// Referencias al DOM
const elements = {
  totalItems: document.getElementById('totalItems'),
  itemsPerPage: document.getElementById('itemsPerPage'),
  btnGenerate: document.getElementById('btnGenerate'),
  dataList: document.getElementById('dataList'),
  pagination: document.getElementById('pagination'),
  btnFirst: document.getElementById('btnFirst'),
  btnPrev: document.getElementById('btnPrev'),
  btnNext: document.getElementById('btnNext'),
  btnLast: document.getElementById('btnLast'),
  pageInput: document.getElementById('pageInput'),
  totalPages: document.getElementById('totalPages'),
  stats: document.getElementById('stats'),
  itemRange: document.getElementById('itemRange'),
  totalItemsDisplay: document.getElementById('totalItemsDisplay'),
};

/**
 * Renderiza los items de la página actual
 */
function renderItems() {
  if (!paginator) return;

  const items = paginator.getPageItems();

  elements.dataList.innerHTML = items
    .map(item => createItemHTML(item))
    .join('');

  updatePaginationUI();
}

/**
 * Crea el HTML para un item
 * @param {Object} item - Item a renderizar
 * @returns {string} HTML del item
 */
function createItemHTML(item) {
  return `
    <div class="data-item">
      <div class="data-item-id">#${item.id}</div>
      <div class="data-item-content">
        <div class="data-item-title">${item.title}</div>
        <div class="data-item-description">${item.description}</div>
      </div>
    </div>
  `;
}

/**
 * Actualiza la UI de paginación
 */
function updatePaginationUI() {
  if (!paginator) return;

  elements.btnFirst.disabled = !paginator.hasPrevious;
  elements.btnPrev.disabled = !paginator.hasPrevious;
  elements.btnNext.disabled = !paginator.hasNext;
  elements.btnLast.disabled = !paginator.hasNext;

  elements.pageInput.value = paginator.currentPage;
  elements.totalPages.textContent = paginator.totalPages;

  const range = paginator.getRange();
  elements.itemRange.textContent = `${range.start}-${range.end}`;
  elements.totalItemsDisplay.textContent = paginator.totalItems;
}

/**
 * Inicializa el paginador con los valores seleccionados
 */
function initializePaginator() {
  const totalItems = Number(elements.totalItems.value);
  const itemsPerPage = Number(elements.itemsPerPage.value);

  paginator = new Paginator(dataGenerator, totalItems, itemsPerPage);

  elements.pagination.style.display = 'flex';
  elements.stats.style.display = 'block';

  renderItems();
}

// ============================================
// EVENT LISTENERS
// ============================================

// Botón generar
elements.btnGenerate.addEventListener('click', () => {
  initializePaginator();
});

// Botones de navegación
elements.btnFirst.addEventListener('click', () => {
  if (!paginator) return;
  paginator.first();
  renderItems();
});

elements.btnPrev.addEventListener('click', () => {
  if (!paginator) return;
  paginator.previous();
  renderItems();
});

elements.btnNext.addEventListener('click', () => {
  if (!paginator) return;
  paginator.next();
  renderItems();
});

elements.btnLast.addEventListener('click', () => {
  if (!paginator) return;
  paginator.last();
  renderItems();
});

// Input de página
elements.pageInput.addEventListener('change', e => {
  if (!paginator) return;

  const page = Number(e.target.value);
  const valid = paginator.goToPage(page);

  if (valid) {
    renderItems();
  } else {
    e.target.value = paginator.currentPage;
  }
});

// Selector de items por página
elements.itemsPerPage.addEventListener('change', e => {
  if (!paginator) return;

  paginator.setItemsPerPage(Number(e.target.value));
  renderItems();
});

// ============================================
// INICIALIZACIÓN
// ============================================

console.log('🚍 Paginador con Generadores - Gestión de Flotas');
console.log('Sistema listo para paginar buses de forma eficiente');