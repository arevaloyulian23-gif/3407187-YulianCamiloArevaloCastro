const salesData = [
  {
    id: 'TRIP001',
    date: '2024-01-15',
    customer: 'Carlos Gómez', // driver
    region: 'Terminal Norte',
    items: [
      { product: 'Ruta A1', category: 'Bus', price: 120000, qty: 40 },
      { product: 'Ruta B2', category: 'Bus', price: 80000, qty: 25 },
    ],
    status: 'completed',
  },
  {
    id: 'TRIP002',
    date: '2024-01-18',
    customer: 'Laura Pérez', // driver
    region: 'Terminal Sur',
    items: [
      { product: 'Ruta C3', category: 'Van', price: 60000, qty: 12 },
      { product: 'Ruta D4', category: 'Van', price: 50000, qty: 10 },
    ],
    status: 'completed',
  },
  {
    id: 'TRIP003',
    date: '2024-02-05',
    customer: 'Miguel Torres', // driver
    region: 'Terminal Oriente',
    items: [{ product: 'Ruta E5', category: 'Bus', price: 150000, qty: 50 }],
    status: 'completed',
  },
  {
    id: 'TRIP004',
    date: '2024-02-12',
    customer: 'Carlos Gómez', // driver
    region: 'Terminal Occidente',
    items: [{ product: 'Ruta F6', category: 'Truck', price: 200000, qty: 0 }],
    status: 'pending',
  },
  {
    id: 'TRIP005',
    date: '2024-02-20',
    customer: 'Laura Pérez', // driver
    region: 'Terminal Norte',
    items: [
      { product: 'Ruta G7', category: 'Van', price: 70000, qty: 15 },
      { product: 'Ruta H8', category: 'Van', price: 65000, qty: 13 },
    ],
    status: 'completed',
  },
  {
    id: 'TRIP006',
    date: '2024-03-01',
    customer: 'Andrés Rojas', // driver
    region: 'Terminal Sur',
    items: [
      { product: 'Ruta I9', category: 'Bus', price: 90000, qty: 28 },
      { product: 'Ruta J10', category: 'Bus', price: 110000, qty: 35 },
    ],
    status: 'completed',
  },
  {
    id: 'TRIP007',
    date: '2024-03-10',
    customer: 'Sofía Ramírez', // driver
    region: 'Terminal Oriente',
    items: [
      { product: 'Ruta K11', category: 'Van', price: 55000, qty: 11 },
      { product: 'Ruta L12', category: 'Van', price: 65000, qty: 14 },
    ],
    status: 'completed',
  },
  {
    id: 'TRIP008',
    date: '2024-03-15',
    customer: 'Laura Pérez', // driver
    region: 'Terminal Sur',
    items: [{ product: 'Ruta M13', category: 'Van', price: 80000, qty: 18 }],
    status: 'pending',
  },
  {
    id: 'TRIP009',
    date: '2024-03-22',
    customer: 'Juan Castro', // driver
    region: 'Terminal Norte',
    items: [
      { product: 'Ruta N14', category: 'Bus', price: 100000, qty: 30 },
      { product: 'Ruta O15', category: 'Bus', price: 95000, qty: 27 },
    ],
    status: 'completed',
  },
  {
    id: 'TRIP010',
    date: '2024-04-02',
    customer: 'Valentina Díaz', // driver
    region: 'Terminal Occidente',
    items: [
      { product: 'Ruta P16', category: 'Truck', price: 180000, qty: 0 },
      { product: 'Ruta Q17', category: 'Truck', price: 95000, qty: 0 },
    ],
    status: 'cancelled',
  },
];

// ============================================
// FUNCIÓN 1: Obtener Todos los Items (flatMap)
// ============================================

const getAllItems = orders => {
  return orders.flatMap(order =>
    order.items.map(item => ({
      orderId: order.id,
      date: order.date,
      region: order.region,
      ...item,
    }))
  );
};

// ============================================
// FUNCIÓN 2: Calcular Total por Orden (map + reduce)
// ============================================

const getOrderTotals = orders => {
  return orders.map(order => {
    const total = order.items.reduce((sum, item) => sum + item.price, 0);

    return {
      id: order.id,
      customer: order.customer,
      date: order.date,
      status: order.status,
      total,
    };
  });
};

// ============================================
// FUNCIÓN 3: Top N Clientes (chaining + sort)
// ============================================

const getTopCustomers = (orders, n = 5) => {
  const completedOrders = orders.filter(order => order.status === 'completed');

  const customers = completedOrders.reduce((acc, order) => {
    const totalOrder = order.items.reduce((sum, item) => sum + item.price, 0);

    if (!acc[order.customer]) {
      acc[order.customer] = {
        customer: order.customer,
        total: 0,
        orderCount: 0,
      };
    }

    acc[order.customer].total += totalOrder;
    acc[order.customer].orderCount += 1;

    return acc;
  }, {});

  const result = Object.values(customers);
  const sortedCustomers = result.toSorted((a, b) => b.total - a.total);

  return sortedCustomers.slice(0, n);
};

// ============================================
// FUNCIÓN 4: Ventas por Región (reduce - groupBy)
// ============================================

const getSalesByRegion = orders => {
  const completedOrders = orders.filter(order => order.status === 'completed');

  const salesByRegion = completedOrders.reduce((acc, order) => {
    const totalOrder = order.items.reduce((sum, item) => sum + item.price, 0);

    if (!acc[order.region]) {
      acc[order.region] = 0;
    }

    acc[order.region] += totalOrder;
    return acc;
  }, {});

  return salesByRegion;
};

// ============================================
// FUNCIÓN 5: Ventas por Categoría (flatMap + reduce)
// ============================================

const getSalesByCategory = orders => {
  const completedOrders = orders.filter(order => order.status === 'completed');
  const allItems = completedOrders.flatMap(order => order.items);

  const salesByCategory = allItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = 0;
    }

    acc[item.category] += item.price;
    return acc;
  }, {});

  return salesByCategory;
};

// ============================================
// FUNCIÓN 6: Productos Más Vendidos (flatMap + reduce + sort)
// ============================================

const getTopProducts = (orders, limit = 10) => {
  const completedOrders = orders.filter(order => order.status === 'completed');
  const allItems = completedOrders.flatMap(order => order.items);

  const groupedProducts = allItems.reduce((acc, item) => {
    if (!acc[item.product]) {
      acc[item.product] = {
        product: item.product,
        totalQty: 0,
        totalRevenue: 0,
      };
    }

    // qty = pasajeros
    acc[item.product].totalQty += item.qty;
    // revenue = ingreso
    acc[item.product].totalRevenue += item.price;

    return acc;
  }, {});

  const result = Object.values(groupedProducts);
  const sortedProducts = result.toSorted((a, b) => b.totalQty - a.totalQty);

  return sortedProducts.slice(0, limit);
};

// ============================================
// FUNCIÓN 7: Filtrar Órdenes por Fecha (filter + chaining)
// ============================================

const filterOrdersByDate = (orders, startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  return orders.filter(order => {
    const orderDate = new Date(order.date);
    return orderDate >= start && orderDate <= end;
  });
};

// ============================================
// FUNCIÓN 8: Estadísticas Generales (reduce)
// ============================================

const getGeneralStats = orders => {
  const completedOrders = orders.filter(order => order.status === 'completed');

  const totals = completedOrders.map(order => {
    return order.items.reduce((sum, item) => sum + item.price, 0);
  });

  const totalSales = totals.reduce((sum, total) => sum + total, 0);
  const orderCount = completedOrders.length;
  const avgPerOrder = orderCount > 0 ? totalSales / orderCount : 0;
  const maxOrder = orderCount > 0 ? Math.max(...totals) : 0;
  const minOrder = orderCount > 0 ? Math.min(...totals) : 0;

  // totalItems = pasajeros totales
  const totalItems = completedOrders.reduce((sum, order) => {
    const itemsQty = order.items.reduce((itemSum, item) => itemSum + item.qty, 0);
    return sum + itemsQty;
  }, 0);

  return {
    totalSales,
    orderCount,
    avgPerOrder,
    maxOrder,
    minOrder,
    totalItems,
  };
};

// ============================================
// FUNCIÓN 9: Tendencia Mensual (groupBy por mes)
// ============================================

const getMonthlyTrend = orders => {
  const completedOrders = orders.filter(order => order.status === 'completed');

  const groupedByMonth = completedOrders.reduce((acc, order) => {
    const month = order.date.slice(0, 7);

    const totalOrder = order.items.reduce((sum, item) => sum + item.price, 0);

    if (!acc[month]) {
      acc[month] = {
        month,
        total: 0,
        orderCount: 0,
      };
    }

    acc[month].total += totalOrder;
    acc[month].orderCount += 1;

    return acc;
  }, {});

  const result = Object.values(groupedByMonth);
  return result.toSorted((a, b) => a.month.localeCompare(b.month));
};

// ============================================
// FUNCIÓN 10: Generar Reporte Completo (pipeline)
// ============================================

const generateReport = orders => {
  return {
    generatedAt: new Date().toISOString(),
    stats: getGeneralStats(orders),
    topCustomers: getTopCustomers(orders, 5),
    salesByRegion: getSalesByRegion(orders),
    salesByCategory: getSalesByCategory(orders),
    topProducts: getTopProducts(orders, 5),
    monthlyTrend: getMonthlyTrend(orders),
  };
};

// ============================================
// FUNCIONES DE RENDERIZADO (NO MODIFICAR)
// ============================================

const formatCurrency = amount =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(amount);

const renderStats = stats => {
  document.getElementById('total-sales').textContent = formatCurrency(
    stats.totalSales
  );
  document.getElementById('total-orders').textContent = stats.orderCount;
  document.getElementById('avg-order').textContent = formatCurrency(
    stats.avgPerOrder
  );
  document.getElementById('total-items').textContent = stats.totalItems;
};

const renderTopCustomers = customers => {
  const container = document.getElementById('top-customers');
  if (!customers.length) {
    container.innerHTML = '<p class="loading">Sin datos</p>';
    return;
  }
  container.innerHTML = customers
    .map(
      (c, i) => `
    <div class="list-item">
      <span class="rank">${i + 1}</span>
      <span class="name">${c.customer} (${c.orderCount} órdenes)</span>
      <span class="value">${formatCurrency(c.total)}</span>
    </div>
  `
    )
    .join('');
};

const renderSalesByRegion = regionData => {
  const container = document.getElementById('sales-by-region');
  const entries = Object.entries(regionData);
  if (!entries.length) {
    container.innerHTML = '<p class="loading">Sin datos</p>';
    return;
  }
  const max = Math.max(...entries.map(([, v]) => v));
  container.innerHTML = entries
    .sort((a, b) => b[1] - a[1])
    .map(
      ([region, total]) => `
    <div class="list-item">
      <span class="name">${region}</span>
      <span class="value">${formatCurrency(total)}</span>
    </div>
    <div class="progress-bar">
      <div class="fill" style="width: ${(total / max) * 100}%"></div>
    </div>
  `
    )
    .join('');
};

const renderSalesByCategory = categoryData => {
  const container = document.getElementById('sales-by-category');
  const entries = Object.entries(categoryData);
  if (!entries.length) {
    container.innerHTML = '<p class="loading">Sin datos</p>';
    return;
  }
  const max = Math.max(...entries.map(([, v]) => v));
  container.innerHTML = entries
    .sort((a, b) => b[1] - a[1])
    .map(
      ([category, total]) => `
    <div class="list-item">
      <span class="name">${category}</span>
      <span class="value">${formatCurrency(total)}</span>
    </div>
    <div class="progress-bar">
      <div class="fill" style="width: ${(total / max) * 100}%"></div>
    </div>
  `
    )
    .join('');
};

const renderTopProducts = products => {
  const container = document.getElementById('top-products');
  if (!products.length) {
    container.innerHTML = '<p class="loading">Sin datos</p>';
    return;
  }
  container.innerHTML = products
    .map(
      (p, i) => `
    <div class="list-item">
      <span class="rank">${i + 1}</span>
      <span class="name">${p.product} (${p.totalQty} uds)</span>
      <span class="value">${formatCurrency(p.totalRevenue)}</span>
    </div>
  `
    )
    .join('');
};

const renderMonthlyTrend = trendData => {
  const container = document.getElementById('monthly-trend');
  if (!trendData.length) {
    container.innerHTML = '<p class="loading">Sin datos</p>';
    return;
  }
  const max = Math.max(...trendData.map(t => t.total));
  container.innerHTML = trendData
    .map(
      t => `
    <div class="trend-bar" style="height: ${(t.total / max) * 100}%">
      <span class="amount">${formatCurrency(t.total)}</span>
      <span class="label">${t.month}</span>
    </div>
  `
    )
    .join('');
};

const renderRecentOrders = orders => {
  const container = document.getElementById('recent-orders');
  const orderTotals = getOrderTotals(orders);
  const recent = [...orderTotals]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  if (!recent.length) {
    container.innerHTML = '<p class="loading">Sin datos</p>';
    return;
  }

  container.innerHTML = `
    <table class="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Fecha</th>
          <th>Cliente</th>
          <th>Total</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        ${recent
          .map(
            o => `
          <tr>
            <td>${o.id}</td>
            <td>${o.date}</td>
            <td>${o.customer}</td>
            <td>${formatCurrency(o.total)}</td>
            <td><span class="status ${o.status}">${o.status}</span></td>
          </tr>
        `
          )
          .join('')}
      </tbody>
    </table>
  `;
};

// ============================================
// INICIALIZACIÓN
// ============================================

const initDashboard = () => {
  console.log('🚀 Inicializando Dashboard...');
  console.log('🚛 Datos cargados:', salesData.length, 'servicios/viajes');

  const report = generateReport(salesData);
  console.log('📈 Reporte generado:', report);

  // Renderizar todas las secciones (SIN tocar HTML)
  renderStats(report.stats);
  renderTopCustomers(report.topCustomers);
  renderSalesByRegion(report.salesByRegion);
  renderSalesByCategory(report.salesByCategory);
  renderTopProducts(report.topProducts);
  renderMonthlyTrend(report.monthlyTrend);
  renderRecentOrders(salesData);

  console.log('✅ Dashboard listo');
};

document.addEventListener('DOMContentLoaded', initDashboard);