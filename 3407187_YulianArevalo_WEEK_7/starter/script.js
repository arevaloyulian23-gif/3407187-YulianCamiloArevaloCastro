// ============================================
// PROYECTO: Sistema de Gestión de Usuarios
// Semana 07: Sets y Maps
// ============================================

// ============================================
// ALMACENAMIENTO DE DATOS
// ============================================

// Map para almacenar usuarios por ID
const users = new Map();

// Set para emails únicos (evitar duplicados)
const registeredEmails = new Set();

// Map para roles de cada usuario (userId -> Set de roles)
const userRoles = new Map();

// WeakMap para datos privados (contraseñas hasheadas)
const privateData = new WeakMap();

// WeakSet para tracking de sesiones activas
const activeSessions = new WeakSet();

// Set para tracking de IDs con sesión activa (para UI)
const activeSessionIds = new Set();

// Roles disponibles
const AVAILABLE_ROLES = new Set(['admin', 'editor', 'viewer']);

// ============================================
// UTILIDADES
// ============================================

/**
 * Genera un ID único
 * @returns {string} ID único
 */
const generateId = () => {
  return 'user_' + Math.random().toString(36).substr(2, 9);
};

/**
 * Simula hash de contraseña (en producción usar bcrypt)
 * @param {string} password - Contraseña en texto plano
 * @returns {string} Hash simulado
 */
const hashPassword = password => {
  // TODO: Implementar hash simple (para propósitos educativos)
  // Pista: Puedes usar btoa() para codificar en base64
  return null;
};

/**
 * Log a consola visual
 * @param {string} message - Mensaje
 * @param {string} type - Tipo: info, success, error, warning
 */
const logToConsole = (message, type = 'info') => {
  const consoleEl = document.getElementById('console');
  const line = document.createElement('div');
  line.className = `console-line ${type}`;
  line.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
  consoleEl.appendChild(line);
  consoleEl.scrollTop = consoleEl.scrollHeight;
};

// ============================================
// GESTIÓN DE USUARIOS
// ============================================

/**
 * Registra un nuevo usuario
 * @param {string} name - Nombre del usuario
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña
 * @returns {object|null} Usuario creado o null si falla
 */
const registerUser = (name, email, password) => {
  // TODO: Implementar registro de usuario
  // 1. Verificar que el email no esté registrado (usar registeredEmails Set)
  // 2. Crear objeto usuario con id, name, email, createdAt
  // 3. Agregar email al Set de emails registrados
  // 4. Guardar usuario en el Map de usuarios
  // 5. Guardar contraseña hasheada en WeakMap privateData
  // 6. Inicializar roles vacíos para el usuario
  // 7. Retornar el usuario creado

  return null;
};

/**
 * Obtiene un usuario por ID
 * @param {string} userId - ID del usuario
 * @returns {object|undefined} Usuario o undefined
 */
const getUserById = userId => {
  // TODO: Implementar obtención de usuario por ID
  // Pista: Usar users.get()
  return null;
};

/**
 * Obtiene todos los usuarios
 * @returns {Array} Array de usuarios
 */
const getAllUsers = () => {
  // TODO: Implementar obtención de todos los usuarios
  // Pista: Convertir users.values() a array
  return [];
};

/**
 * Elimina un usuario
 * @param {string} userId - ID del usuario
 * @returns {boolean} true si se eliminó
 */
const deleteUser = userId => {
  // TODO: Implementar eliminación de usuario
  // 1. Obtener el usuario
  // 2. Eliminar su email del Set de emails
  // 3. Eliminar sus roles
  // 4. Cerrar sesión si está activa
  // 5. Eliminar del Map de usuarios

  return false;
};

// ============================================
// GESTIÓN DE ROLES
// ============================================

/**
 * Asigna roles a un usuario
 * @param {string} userId - ID del usuario
 * @param {Array} roles - Array de roles a asignar
 * @returns {boolean} true si se asignaron
 */
const assignRoles = (userId, roles) => {
  // TODO: Implementar asignación de roles
  // 1. Verificar que el usuario existe
  // 2. Filtrar solo roles válidos (usar AVAILABLE_ROLES)
  // 3. Crear o actualizar el Set de roles del usuario
  // 4. Retornar true si se asignó al menos un rol

  return false;
};

/**
 * Obtiene los roles de un usuario
 * @param {string} userId - ID del usuario
 * @returns {Set} Set de roles
 */
const getUserRoles = userId => {
  // TODO: Implementar obtención de roles
  // Pista: Usar userRoles.get() con valor por defecto
  return new Set();
};

/**
 * Verifica si un usuario tiene un rol específico
 * @param {string} userId - ID del usuario
 * @param {string} role - Rol a verificar
 * @returns {boolean} true si tiene el rol
 */
const hasRole = (userId, role) => {
  // TODO: Implementar verificación de rol
  return false;
};

// ============================================
// OPERACIONES DE CONJUNTOS
// ============================================

/**
 * Obtiene usuarios con un rol específico
 * @param {string} role - Rol a buscar
 * @returns {Array} Array de usuarios con ese rol
 */
const getUsersByRole = role => {
  // TODO: Implementar búsqueda por rol
  // Pista: Iterar sobre users y filtrar por rol
  return [];
};

/**
 * Obtiene usuarios que tienen TODOS los roles especificados (intersección)
 * @param {Array} roles - Roles requeridos
 * @returns {Array} Array de usuarios
 */
const getUsersWithAllRoles = roles => {
  // TODO: Implementar intersección de roles
  // Pista: Usar every() para verificar que tiene todos los roles
  return [];
};

/**
 * Obtiene usuarios que tienen AL MENOS UNO de los roles (unión)
 * @param {Array} roles - Roles a buscar
 * @returns {Array} Array de usuarios
 */
const getUsersWithAnyRole = roles => {
  // TODO: Implementar unión de roles
  // Pista: Usar some() para verificar que tiene al menos un rol
  return [];
};

/**
 * Obtiene usuarios sin ningún rol asignado
 * @returns {Array} Array de usuarios sin roles
 */
const getUsersWithoutRoles = () => {
  // TODO: Implementar búsqueda de usuarios sin roles
  return [];
};

// ============================================
// GESTIÓN DE SESIONES
// ============================================

/**
 * Inicia sesión de un usuario
 * @param {string} userId - ID del usuario
 * @returns {boolean} true si se inició sesión
 */
const login = userId => {
  // TODO: Implementar login
  // 1. Obtener el usuario
  // 2. Verificar que no tenga sesión activa
  // 3. Agregar a activeSessions (WeakSet)
  // 4. Agregar a activeSessionIds (para UI)
  // 5. Retornar true si se inició sesión

  return false;
};

/**
 * Cierra sesión de un usuario
 * @param {string} userId - ID del usuario
 * @returns {boolean} true si se cerró sesión
 */
const logout = userId => {
  // TODO: Implementar logout
  // 1. Obtener el usuario
  // 2. Verificar que tenga sesión activa
  // 3. Eliminar de activeSessions (WeakSet)
  // 4. Eliminar de activeSessionIds
  // 5. Retornar true si se cerró sesión

  return false;
};

/**
 * Verifica si un usuario tiene sesión activa
 * @param {string} userId - ID del usuario
 * @returns {boolean} true si tiene sesión activa
 */
const isLoggedIn = userId => {
  // TODO: Implementar verificación de sesión
  // Pista: Usar activeSessions.has()
  return false;
};

/**
 * Obtiene la cantidad de sesiones activas
 * @returns {number} Número de sesiones activas
 */
const getActiveSessionCount = () => {
  // TODO: Implementar conteo de sesiones
  // Pista: Usar activeSessionIds.size
  return 0;
};

// ============================================
// RENDERIZADO DE UI
// ============================================

/**
 * Renderiza la lista de usuarios
 */
const renderUsersList = () => {
  const container = document.getElementById('usersList');
  const allUsers = getAllUsers();

  if (allUsers.length === 0) {
    container.innerHTML =
      '<p class="empty-state">No hay usuarios registrados</p>';
  } else {
    container.innerHTML = allUsers
      .map(user => {
        const roles = getUserRoles(user.id);
        const online = isLoggedIn(user.id);

        return `
          <div class="user-item">
            <div class="user-info">
              <div class="user-name">${user.name}</div>
              <div class="user-email">${user.email}</div>
              <div class="user-id">ID: ${user.id}</div>
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

  // Update stats
  document.getElementById('totalUsers').textContent = allUsers.length;
  document.getElementById('activeUsers').textContent = getActiveSessionCount();
};

/**
 * Renderiza las sesiones activas
 */
const renderActiveSessions = () => {
  const list = document.getElementById('sessionsList');
  const activeUsers = getAllUsers().filter(u => isLoggedIn(u.id));

  if (activeUsers.length === 0) {
    list.innerHTML = '<li class="empty-state">No hay sesiones activas</li>';
  } else {
    list.innerHTML = activeUsers
      .map(u => `<li>🟢 ${u.name} (${u.id})</li>`)
      .join('');
  }
};

/**
 * Muestra un mensaje en un elemento
 * @param {string} elementId - ID del elemento
 * @param {string} message - Mensaje
 * @param {string} type - success, error, info
 */
const showMessage = (elementId, message, type) => {
  const el = document.getElementById(elementId);
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
  // Registro de usuario
  document.getElementById('registerForm').addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('userName').value.trim();
    const email = document.getElementById('userEmail').value.trim();
    const password = document.getElementById('userPassword').value;

    if (password.length < 6) {
      showMessage(
        'registerMessage',
        'La contraseña debe tener al menos 6 caracteres',
        'error'
      );
      return;
    }

    const user = registerUser(name, email, password);

    if (user) {
      showMessage(
        'registerMessage',
        `Usuario ${user.name} registrado con ID: ${user.id}`,
        'success'
      );
      logToConsole(`Usuario registrado: ${user.name} (${user.id})`, 'success');
      e.target.reset();
      renderUsersList();
    } else {
      showMessage('registerMessage', 'El email ya está registrado', 'error');
      logToConsole(`Error: Email ${email} ya registrado`, 'error');
    }
  });

  // Asignar roles
  document.getElementById('assignRolesBtn').addEventListener('click', () => {
    const userId = document.getElementById('roleUserId').value.trim();
    const checkboxes = document.querySelectorAll(
      '.roles-checkboxes input:checked'
    );
    const roles = [...checkboxes].map(cb => cb.value);

    if (!userId) {
      showMessage('rolesMessage', 'Ingresa un ID de usuario', 'error');
      return;
    }

    if (roles.length === 0) {
      showMessage('rolesMessage', 'Selecciona al menos un rol', 'error');
      return;
    }

    const success = assignRoles(userId, roles);

    if (success) {
      showMessage(
        'rolesMessage',
        `Roles asignados: ${roles.join(', ')}`,
        'success'
      );
      logToConsole(
        `Roles [${roles.join(', ')}] asignados a ${userId}`,
        'success'
      );
      renderUsersList();
    } else {
      showMessage('rolesMessage', 'Usuario no encontrado', 'error');
      logToConsole(`Error: Usuario ${userId} no encontrado`, 'error');
    }
  });

  // Operaciones de conjuntos
  document.querySelectorAll('[data-op]').forEach(btn => {
    btn.addEventListener('click', () => {
      const op = btn.dataset.op;
      let result = [];
      let title = '';

      switch (op) {
        case 'admins':
          result = getUsersByRole('admin');
          title = 'Usuarios Admin';
          break;
        case 'editors':
          result = getUsersByRole('editor');
          title = 'Usuarios Editor';
          break;
        case 'admin-and-editor':
          result = getUsersWithAllRoles(['admin', 'editor']);
          title = 'Admin Y Editor';
          break;
        case 'admin-or-editor':
          result = getUsersWithAnyRole(['admin', 'editor']);
          title = 'Admin O Editor';
          break;
        case 'only-viewers':
          result = getUsersByRole('viewer').filter(
            u => !hasRole(u.id, 'admin') && !hasRole(u.id, 'editor')
          );
          title = 'Solo Viewers';
          break;
        case 'no-roles':
          result = getUsersWithoutRoles();
          title = 'Sin Roles';
          break;
      }

      const container = document.getElementById('operationResult');
      container.innerHTML = `
        <h4>${title} (${result.length})</h4>
        ${
          result.length === 0
            ? '<p class="empty-state">No se encontraron usuarios</p>'
            : `<ul>${result
                .map(u => `<li>${u.name} (${u.id})</li>`)
                .join('')}</ul>`
        }
      `;

      logToConsole(
        `Operación "${title}": ${result.length} usuarios encontrados`,
        'info'
      );
    });
  });

  // Sesiones
  document.getElementById('loginBtn').addEventListener('click', () => {
    const userId = document.getElementById('sessionUserId').value.trim();

    if (!userId) {
      showMessage('sessionMessage', 'Ingresa un ID de usuario', 'error');
      return;
    }

    const success = login(userId);

    if (success) {
      showMessage('sessionMessage', 'Sesión iniciada', 'success');
      logToConsole(`Login exitoso: ${userId}`, 'success');
    } else {
      const user = getUserById(userId);
      if (!user) {
        showMessage('sessionMessage', 'Usuario no encontrado', 'error');
        logToConsole(`Error: Usuario ${userId} no existe`, 'error');
      } else {
        showMessage('sessionMessage', 'Ya tiene sesión activa', 'error');
        logToConsole(`Error: ${userId} ya tiene sesión activa`, 'warning');
      }
    }

    renderUsersList();
    renderActiveSessions();
  });

  document.getElementById('logoutBtn').addEventListener('click', () => {
    const userId = document.getElementById('sessionUserId').value.trim();

    if (!userId) {
      showMessage('sessionMessage', 'Ingresa un ID de usuario', 'error');
      return;
    }

    const success = logout(userId);

    if (success) {
      showMessage('sessionMessage', 'Sesión cerrada', 'success');
      logToConsole(`Logout exitoso: ${userId}`, 'success');
    } else {
      showMessage(
        'sessionMessage',
        'No tiene sesión activa o usuario no existe',
        'error'
      );
      logToConsole(`Error: No se pudo cerrar sesión de ${userId}`, 'error');
    }

    renderUsersList();
    renderActiveSessions();
  });

  document.getElementById('checkSessionBtn').addEventListener('click', () => {
    const userId = document.getElementById('sessionUserId').value.trim();

    if (!userId) {
      showMessage('sessionMessage', 'Ingresa un ID de usuario', 'error');
      return;
    }

    const logged = isLoggedIn(userId);
    const user = getUserById(userId);

    if (!user) {
      showMessage('sessionMessage', 'Usuario no encontrado', 'error');
    } else {
      showMessage(
        'sessionMessage',
        logged ? 'Sesión activa ✅' : 'Sin sesión ❌',
        'info'
      );
      logToConsole(
        `Verificación: ${userId} ${
          logged ? 'tiene' : 'no tiene'
        } sesión activa`,
        'info'
      );
    }
  });

  // Limpiar consola
  document.getElementById('clearConsole').addEventListener('click', () => {
    document.getElementById('console').innerHTML = '';
  });

  // Render inicial
  renderUsersList();
  renderActiveSessions();
  logToConsole('Sistema de Gestión de Usuarios inicializado', 'info');
});