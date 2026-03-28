// ============================================
// PROYECTO: Sistema de Gestión de Flotas
// Semana 07: Sets y Maps
// Dominio: Buses / Transporte
// ============================================

// ============================================
// ALMACENAMIENTO DE DATOS
// ============================================

// Map para almacenar personal por ID
const fleetStaff = new Map();

// Set para emails únicos (evitar duplicados)
const registeredEmails = new Set();

// Map para roles de cada miembro del personal (staffId -> Set de roles)
const staffRoles = new Map();

// WeakMap para datos privados (credenciales simuladas)
const privateData = new WeakMap();

// WeakSet para tracking de sesiones activas
const activeSessions = new WeakSet();

// Set para tracking de IDs con sesión activa (para UI)
const activeSessionIds = new Set();

// Roles disponibles
const AVAILABLE_ROLES = new Set([
  'dispatcher',
  'driver',
  'maintenance',
  'supervisor',
]);

// ============================================
// UTILIDADES
// ============================================

/**
 * Genera un ID único
 * @returns {string} ID único
 */
const generateId = () => {
  return 'staff_' + Math.random().toString(36).substr(2, 9);
};

/**
 * Simula hash de contraseña (para fines educativos)
 * @param {string} password - Contraseña en texto plano
 * @returns {string} Hash simulado
 */
const hashPassword = password => {
  return btoa(password).split('').reverse().join('');
};

/**
 * Log a consola visual
 * @param {string} message - Mensaje
 * @param {string} type - Tipo: info, success, error, warning
 */
const logToConsole = (message, type = 'info') => {
  const consoleEl = document.getElementById('console');
  if (!consoleEl) return;

  const line = document.createElement('div');
  line.className = `console-line ${type}`;
  line.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
  consoleEl.appendChild(line);
  consoleEl.scrollTop = consoleEl.scrollHeight;
};

// ============================================
// GESTIÓN DE PERSONAL DE FLOTA
// ============================================

/**
 * Registra un nuevo miembro del personal
 * @param {string} name - Nombre
 * @param {string} email - Correo
 * @param {string} password - Contraseña
 * @returns {object|null} Personal creado o null si falla
 */
const registerStaff = (name, email, password) => {
  const normalizedEmail = email.trim().toLowerCase();

  // 1. Verificar email duplicado
  if (registeredEmails.has(normalizedEmail)) {
    return null;
  }

  // 2. Crear objeto de personal
  const staff = {
    id: generateId(),
    name: name.trim(),
    email: normalizedEmail,
    createdAt: new Date().toISOString(),
  };

  // 3. Agregar email al Set
  registeredEmails.add(normalizedEmail);

  // 4. Guardar en Map
  fleetStaff.set(staff.id, staff);

  // 5. Guardar credencial simulada en WeakMap
  privateData.set(staff, {
    passwordHash: hashPassword(password),
  });

  // 6. Inicializar roles vacíos
  staffRoles.set(staff.id, new Set());

  // 7. Retornar
  return staff;
};

/**
 * Obtiene un miembro del personal por ID
 * @param {string} staffId - ID
 * @returns {object|undefined}
 */
const getStaffById = staffId => {
  return fleetStaff.get(staffId);
};

/**
 * Obtiene todo el personal
 * @returns {Array}
 */
const getAllStaff = () => {
  return [...fleetStaff.values()];
};

/**
 * Elimina un miembro del personal
 * @param {string} staffId - ID
 * @returns {boolean}
 */
const deleteStaff = staffId => {
  const staff = getStaffById(staffId);

  if (!staff) return false;

  // Eliminar email
  registeredEmails.delete(staff.email);

  // Eliminar roles
  staffRoles.delete(staffId);

  // Cerrar sesión si está activa
  activeSessionIds.delete(staffId);

  // Eliminar del Map
  return fleetStaff.delete(staffId);
};

// ============================================
// GESTIÓN DE ROLES
// ============================================

/**
 * Asigna roles a un miembro del personal
 * @param {string} staffId - ID
 * @param {Array} roles - Roles
 * @returns {boolean}
 */
const assignRoles = (staffId, roles) => {
  const staff = getStaffById(staffId);
  if (!staff) return false;

  const validRoles = roles.filter(role => AVAILABLE_ROLES.has(role));

  if (validRoles.length === 0) return false;

  const roleSet = new Set(validRoles);
  staffRoles.set(staffId, roleSet);

  return true;
};

/**
 * Obtiene roles de un miembro del personal
 * @param {string} staffId - ID
 * @returns {Set}
 */
const getStaffRoles = staffId => {
  return staffRoles.get(staffId) || new Set();
};

/**
 * Verifica si tiene un rol específico
 * @param {string} staffId - ID
 * @param {string} role - Rol
 * @returns {boolean}
 */
const hasRole = (staffId, role) => {
  return getStaffRoles(staffId).has(role);
};

// ============================================
// OPERACIONES DE CONJUNTOS
// ============================================

/**
 * Obtiene personal con un rol específico
 * @param {string} role
 * @returns {Array}
 */
const getStaffByRole = role => {
  return getAllStaff().filter(staff => hasRole(staff.id, role));
};

/**
 * Obtiene personal con TODOS los roles especificados
 * @param {Array} roles
 * @returns {Array}
 */
const getStaffWithAllRoles = roles => {
  return getAllStaff().filter(staff =>
    roles.every(role => hasRole(staff.id, role))
  );
};

/**
 * Obtiene personal con AL MENOS UNO de los roles
 * @param {Array} roles
 * @returns {Array}
 */
const getStaffWithAnyRole = roles => {
  return getAllStaff().filter(staff =>
    roles.some(role => hasRole(staff.id, role))
  );
};

/**
 * Obtiene personal sin roles
 * @returns {Array}
 */
const getStaffWithoutRoles = () => {
  return getAllStaff().filter(staff => getStaffRoles(staff.id).size === 0);
};

// ============================================
// GESTIÓN DE SESIONES
// ============================================

/**
 * Inicia sesión de un miembro del personal
 * @param {string} staffId
 * @returns {boolean}
 */
const login = staffId => {
  const staff = getStaffById(staffId);

  if (!staff) return false;

  if (activeSessionIds.has(staffId)) return false;

  activeSessions.add(staff);
  activeSessionIds.add(staffId);

  return true;
};

/**
 * Cierra sesión
 * @param {string} staffId
 * @returns {boolean}
 */
const logout = staffId => {
  const staff = getStaffById(staffId);

  if (!staff) return false;

  if (!activeSessionIds.has(staffId)) return false;

  activeSessionIds.delete(staffId);

  return true;
};

/**
 * Verifica si tiene sesión activa
 * @param {string} staffId
 * @returns {boolean}
 */
const isLoggedIn = staffId => {
  const staff = getStaffById(staffId);
  if (!staff) return false;

  return activeSessions.has(staff) && activeSessionIds.has(staffId);
};

/**
 * Obtiene la cantidad de sesiones activas
 * @returns {number}
 */
const getActiveSessionCount = () => {
  return activeSessionIds.size;
};

// ============================================
// RENDERIZADO DE UI
// ============================================

/**
 * Renderiza la lista del personal
 */
const renderUsersList = () => {
  const container = document.getElementById('usersList');
  const allStaff = getAllStaff();

  if (!container) return;

  if (allStaff.length === 0) {
    container.innerHTML =
      '<p class="empty-state">No hay personal registrado en la flota</p>';
  } else {
    container.innerHTML = allStaff
      .map(staff => {
        const roles = getStaffRoles(staff.id);
        const online = isLoggedIn(staff.id);

        return `
          <div class="user-item">
            <div class="user-info">
              <div class="user-name">${staff.name}</div>
              <div class="user-email">${staff.email}</div>
              <div class="user-id">ID: ${staff.id}</div>
              <div class="user-roles">
                ${[...roles]
                  .map(
                    role =>
                      `<span class="role-badge role-${role}">${role}</span>`
                  )
                  .join('')}
              </div>
            </div>
            <div class="user-status ${online ? 'online' : 'offline'}"></div>
          </div>
        `;
      })
      .join('');
  }

  // Stats
  const totalUsersEl = document.getElementById('totalUsers');
  const activeUsersEl = document.getElementById('activeUsers');

  if (totalUsersEl) totalUsersEl.textContent = allStaff.length;
  if (activeUsersEl) activeUsersEl.textContent = getActiveSessionCount();
};

/**
 * Renderiza sesiones activas
 */
const renderActiveSessions = () => {
  const list = document.getElementById('sessionsList');
  if (!list) return;

  const activeStaff = getAllStaff().filter(staff => isLoggedIn(staff.id));

  if (activeStaff.length === 0) {
    list.innerHTML =
      '<li class="empty-state">No hay operadores activos en el sistema</li>';
  } else {
    list.innerHTML = activeStaff
      .map(staff => `<li>🟢 ${staff.name} (${staff.id})</li>`)
      .join('');
  }
};

/**
 * Muestra un mensaje en un elemento
 * @param {string} elementId
 * @param {string} message
 * @param {string} type
 */
const showMessage = (elementId, message, type) => {
  const el = document.getElementById(elementId);
  if (!el) return;

  el.textContent = message;
  el.className = `message ${type}`;

  setTimeout(() => {
    el.className = 'message';
  }, 3000);
};

// ============================================
// EVENT LISTENERS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Registro de personal
  document.getElementById('registerForm')?.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('userName')?.value.trim() || '';
    const email = document.getElementById('userEmail')?.value.trim() || '';
    const password = document.getElementById('userPassword')?.value || '';

    if (password.length < 6) {
      showMessage(
        'registerMessage',
        'La clave debe tener al menos 6 caracteres',
        'error'
      );
      return;
    }

    const staff = registerStaff(name, email, password);

    if (staff) {
      showMessage(
        'registerMessage',
        `Personal registrado: ${staff.name} | ID: ${staff.id}`,
        'success'
      );
      logToConsole(`Registro exitoso: ${staff.name} (${staff.id})`, 'success');
      e.target.reset();
      renderUsersList();
    } else {
      showMessage(
        'registerMessage',
        'Ese correo ya está registrado en la flota',
        'error'
      );
      logToConsole(`Error: Email ${email} ya registrado`, 'error');
    }
  });

  // Asignar roles
  document.getElementById('assignRolesBtn')?.addEventListener('click', () => {
    const staffId = document.getElementById('roleUserId')?.value.trim() || '';
    const checkboxes = document.querySelectorAll(
      '.roles-checkboxes input:checked'
    );
    const roles = [...checkboxes].map(cb => cb.value);

    if (!staffId) {
      showMessage('rolesMessage', 'Ingresa un ID del personal', 'error');
      return;
    }

    if (roles.length === 0) {
      showMessage('rolesMessage', 'Selecciona al menos un rol', 'error');
      return;
    }

    const success = assignRoles(staffId, roles);

    if (success) {
      showMessage(
        'rolesMessage',
        `Roles operativos asignados: ${roles.join(', ')}`,
        'success'
      );
      logToConsole(
        `Roles [${roles.join(', ')}] asignados a ${staffId}`,
        'success'
      );
      renderUsersList();
    } else {
      showMessage('rolesMessage', 'Personal no encontrado', 'error');
      logToConsole(`Error: Personal ${staffId} no encontrado`, 'error');
    }
  });

  // Operaciones de conjuntos
  document.querySelectorAll('[data-op]').forEach(btn => {
    btn.addEventListener('click', () => {
      const op = btn.dataset.op;
      let result = [];
      let title = '';

      switch (op) {
        case 'dispatchers':
          result = getStaffByRole('dispatcher');
          title = 'Despachadores';
          break;
        case 'drivers':
          result = getStaffByRole('driver');
          title = 'Conductores';
          break;
        case 'dispatcher-and-supervisor':
          result = getStaffWithAllRoles(['dispatcher', 'supervisor']);
          title = 'Despachador Y Supervisor';
          break;
        case 'driver-or-maintenance':
          result = getStaffWithAnyRole(['driver', 'maintenance']);
          title = 'Conductor O Mantenimiento';
          break;
        case 'only-maintenance':
          result = getStaffByRole('maintenance').filter(
            s => !hasRole(s.id, 'driver') && !hasRole(s.id, 'dispatcher')
          );
          title = 'Solo Mantenimiento';
          break;
        case 'no-roles':
          result = getStaffWithoutRoles();
          title = 'Sin Roles Operativos';
          break;
      }

      const container = document.getElementById('operationResult');
      if (!container) return;

      container.innerHTML = `
        <h4>${title} (${result.length})</h4>
        ${
          result.length === 0
            ? '<p class="empty-state">No se encontraron registros</p>'
            : `<ul>${result
                .map(s => `<li>${s.name} (${s.id})</li>`)
                .join('')}</ul>`
        }
      `;

      logToConsole(
        `Operación "${title}": ${result.length} resultados encontrados`,
        'info'
      );
    });
  });

  // Sesiones
  document.getElementById('loginBtn')?.addEventListener('click', () => {
    const staffId = document.getElementById('sessionUserId')?.value.trim() || '';

    if (!staffId) {
      showMessage('sessionMessage', 'Ingresa un ID del personal', 'error');
      return;
    }

    const success = login(staffId);

    if (success) {
      showMessage('sessionMessage', 'Sesión iniciada', 'success');
      logToConsole(`Ingreso exitoso al sistema: ${staffId}`, 'success');
    } else {
      const staff = getStaffById(staffId);
      if (!staff) {
        showMessage('sessionMessage', 'Personal no encontrado', 'error');
        logToConsole(`Error: ${staffId} no existe`, 'error');
      } else {
        showMessage('sessionMessage', 'Ya tiene sesión activa', 'error');
        logToConsole(`Advertencia: ${staffId} ya estaba activo`, 'warning');
      }
    }

    renderUsersList();
    renderActiveSessions();
  });

  document.getElementById('logoutBtn')?.addEventListener('click', () => {
    const staffId = document.getElementById('sessionUserId')?.value.trim() || '';

    if (!staffId) {
      showMessage('sessionMessage', 'Ingresa un ID del personal', 'error');
      return;
    }

    const success = logout(staffId);

    if (success) {
      showMessage('sessionMessage', 'Sesión cerrada', 'success');
      logToConsole(`Salida del sistema: ${staffId}`, 'success');
    } else {
      showMessage(
        'sessionMessage',
        'No tiene sesión activa o no existe',
        'error'
      );
      logToConsole(`Error al cerrar sesión de ${staffId}`, 'error');
    }

    renderUsersList();
    renderActiveSessions();
  });

  document.getElementById('checkSessionBtn')?.addEventListener('click', () => {
    const staffId = document.getElementById('sessionUserId')?.value.trim() || '';

    if (!staffId) {
      showMessage('sessionMessage', 'Ingresa un ID del personal', 'error');
      return;
    }

    const logged = isLoggedIn(staffId);
    const staff = getStaffById(staffId);

    if (!staff) {
      showMessage('sessionMessage', 'Personal no encontrado', 'error');
    } else {
      showMessage(
        'sessionMessage',
        logged ? 'Operador activo ✅' : 'Sin sesión ❌',
        'info'
      );
      logToConsole(
        `Verificación de sesión: ${staffId} ${
          logged ? 'activo' : 'inactivo'
        }`,
        'info'
      );
    }
  });

  // Limpiar consola
  document.getElementById('clearConsole')?.addEventListener('click', () => {
    const consoleEl = document.getElementById('console');
    if (consoleEl) consoleEl.innerHTML = '';
  });

  // Render inicial
  renderUsersList();
  renderActiveSessions();
  logToConsole('Sistema de Gestión de Flotas inicializado', 'info');
});