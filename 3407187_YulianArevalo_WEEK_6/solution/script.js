
// ============================================
// PATRONES REGEXP
// ============================================

//Define los patrones de validación para cada campo.
//Usa expresiones regulares modernas con flags apropiados.
const patterns = {
  // Nombre: 2-50 caracteres, letras, espacios y tildes
  // Ej: "Juan García", "María José López"
  name: /^(?=.{2,50}$)[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+(?:\s[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+)+$/u,

  // Email: formato estándar
  // Ej: "usuario@dominio.com"
  email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,

  // Teléfono: formato internacional o local
  // Ej: "+34 612 345 678", "612345678"
  phone: /^\+?\d{7,15}$/,

  // Contraseña: mín 8 chars, mayúscula, minúscula, número, especial
  // Cada requisito se valida por separado
  password: {
    minLength: /^.{8,}$/,
    uppercase: /[A-ZÁÉÍÓÚÑÜ]/,
    lowercase: /[a-záéíóúñü]/,
    number: /\d/,
    special: /[!@#$%^&*(),.?":{}|<>_\-\\[\]/+=;']/, 
  },

  // Fecha: DD/MM/YYYY
  // Usa grupos nombrados: (?<day>...) (?<month>...) (?<year>...)
  date: /^(?<day>0[1-9]|[12]\d|3[01])\/(?<month>0[1-9]|1[0-2])\/(?<year>\d{4})$/,

  // Código postal: 5 dígitos
  postal: /^\d{5}$/,

  // URL: http o https
  url: /^(https?:\/\/)([\w-]+\.)+[\w-]{2,}(\/[^\s]*)?$/i,
};

// ============================================
// FUNCIONES DE VALIDACIÓN
// ============================================

/**
 * Objeto con funciones de validación para cada campo.
 * Cada función retorna: { isValid, message, formatted? }
 */
const validators = {
  /**
   * Valida el nombre completo
   * @param {string} value - Valor a validar
   * @returns {{ isValid: boolean, message: string }}
   */
  validateName(value) {
    const clean = value.trim().replace(/\s+/g, ' ');

    if (!clean) {
      return {
        isValid: false,
        message: 'El nombre es obligatorio',
      };
    }

    if (!patterns.name.test(clean)) {
      return {
        isValid: false,
        message:
          'Ingresa nombre y apellido (2 a 50 caracteres, solo letras y espacios)',
      };
    }

    return {
      isValid: true,
      message: '',
    };
  },

  /**
   * Valida el email
   * @param {string} value - Valor a validar
   * @returns {{ isValid: boolean, message: string }}
   */
  validateEmail(value) {
    const clean = value.trim().toLowerCase();

    if (!clean) {
      return {
        isValid: false,
        message: 'El email es obligatorio',
      };
    }

    if (!patterns.email.test(clean)) {
      return {
        isValid: false,
        message: 'Ingresa un email válido',
      };
    }

    return {
      isValid: true,
      message: '',
    };
  },

  /**
   * Valida y formatea el teléfono
   * @param {string} value - Valor a validar
   * @returns {{ isValid: boolean, message: string, formatted: string }}
   */
  validatePhone(value) {
    let clean = value.trim();

    // Conservar + solo si está al inicio
    clean = clean.replace(/(?!^\+)[^\d]/g, '').replace(/[^\d+]/g, '');

    // Si tiene varios +, dejar solo uno al inicio
    clean = clean.replace(/(?!^)\+/g, '');

    const digitsOnly = clean.replace(/\D/g, '');

    if (!digitsOnly) {
      return {
        isValid: false,
        message: 'El teléfono es obligatorio',
        formatted: value,
      };
    }

    if (!patterns.phone.test(clean)) {
      return {
        isValid: false,
        message: 'Ingresa un teléfono válido (7 a 15 dígitos)',
        formatted: formatPhoneNumber(clean),
      };
    }

    return {
      isValid: true,
      message: '',
      formatted: formatPhoneNumber(clean),
    };
  },

  /**
   * Valida la contraseña y calcula fortaleza
   * @param {string} value - Valor a validar
   * @returns {{ isValid: boolean, message: string, strength: number }}
   */
  validatePassword(value) {
    const checks = {
      minLength: patterns.password.minLength.test(value),
      uppercase: patterns.password.uppercase.test(value),
      lowercase: patterns.password.lowercase.test(value),
      number: patterns.password.number.test(value),
      special: patterns.password.special.test(value),
    };

    const strength = Object.values(checks).filter(Boolean).length;

    if (!value) {
      return {
        isValid: false,
        message: 'La contraseña es obligatoria',
        strength: 0,
      };
    }

    const missing = [];
    if (!checks.minLength) missing.push('mínimo 8 caracteres');
    if (!checks.uppercase) missing.push('una mayúscula');
    if (!checks.lowercase) missing.push('una minúscula');
    if (!checks.number) missing.push('un número');
    if (!checks.special) missing.push('un carácter especial');

    const isValid = strength === 5;

    return {
      isValid,
      message: isValid
        ? ''
        : `Falta: ${missing.join(', ')}`,
      strength,
    };
  },

  /**
   * Valida que las contraseñas coincidan
   * @param {string} password - Contraseña original
   * @param {string} confirm - Confirmación
   * @returns {{ isValid: boolean, message: string }}
   */
  validateConfirmPassword(password, confirm) {
    if (!confirm.trim()) {
      return {
        isValid: false,
        message: 'Debes confirmar la contraseña',
      };
    }

    if (password !== confirm) {
      return {
        isValid: false,
        message: 'Las contraseñas no coinciden',
      };
    }

    return {
      isValid: true,
      message: '',
    };
  },

  /**
   * Valida la fecha de nacimiento y calcula edad
   * @param {string} value - Valor a validar (DD/MM/YYYY)
   * @returns {{ isValid: boolean, message: string, age: number }}
   */
  validateBirthdate(value) {
    const clean = value.trim();

    if (!clean) {
      return {
        isValid: false,
        message: 'La fecha de nacimiento es obligatoria',
        age: 0,
      };
    }

    const match = clean.match(patterns.date);

    if (!match || !match.groups) {
      return {
        isValid: false,
        message: 'Formato inválido. Usa DD/MM/YYYY',
        age: 0,
      };
    }

    const day = Number(match.groups.day);
    const month = Number(match.groups.month);
    const year = Number(match.groups.year);

    const birthDate = new Date(year, month - 1, day);

    // Validar fecha real
    const isRealDate =
      birthDate.getFullYear() === year &&
      birthDate.getMonth() === month - 1 &&
      birthDate.getDate() === day;

    if (!isRealDate) {
      return {
        isValid: false,
        message: 'La fecha ingresada no existe',
        age: 0,
      };
    }

    const today = new Date();
    let age = today.getFullYear() - year;

    const hasHadBirthdayThisYear =
      today.getMonth() > month - 1 ||
      (today.getMonth() === month - 1 && today.getDate() >= day);

    if (!hasHadBirthdayThisYear) {
      age--;
    }

    if (age < 18) {
      return {
        isValid: false,
        message: 'Debes ser mayor de 18 años',
        age,
      };
    }

    if (age > 120) {
      return {
        isValid: false,
        message: 'Ingresa una fecha válida',
        age,
      };
    }

    return {
      isValid: true,
      message: '',
      age,
    };
  },

  /**
   * Valida el código postal
   * @param {string} value - Valor a validar
   * @returns {{ isValid: boolean, message: string }}
   */
  validatePostal(value) {
    const clean = value.trim();

    if (!clean) {
      return {
        isValid: false,
        message: 'El código postal es obligatorio',
      };
    }

    if (!patterns.postal.test(clean)) {
      return {
        isValid: false,
        message: 'El código postal debe tener 5 dígitos',
      };
    }

    return {
      isValid: true,
      message: '',
    };
  },

  /**
   * Valida la URL (opcional)
   * @param {string} value - Valor a validar
   * @returns {{ isValid: boolean, message: string }}
   */
  validateUrl(value) {
    const clean = value.trim();

    // Campo opcional
    if (!clean) {
      return {
        isValid: true,
        message: '',
      };
    }

    if (!patterns.url.test(clean)) {
      return {
        isValid: false,
        message: 'Ingresa una URL válida (http:// o https://)',
      };
    }

    return {
      isValid: true,
      message: '',
    };
  },
};

// ============================================
// FUNCIONES AUXILIARES
// ============================================

/**
 * Sanitiza el input para prevenir XSS
 * @param {string} input - Texto a sanitizar
 * @returns {string} Texto sanitizado
 */
const sanitizeInput = input => {
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

/**
 * Obtiene el nivel de fortaleza como texto
 * @param {number} strength - Puntuación 0-5
 * @returns {{ class: string, text: string }}
 */
const getStrengthLevel = strength => {
  if (strength <= 1) {
    return { class: 'weak', text: 'Débil' };
  }

  if (strength === 2) {
    return { class: 'fair', text: 'Regular' };
  }

  if (strength === 3 || strength === 4) {
    return { class: 'good', text: 'Buena' };
  }

  if (strength === 5) {
    return { class: 'strong', text: 'Fuerte' };
  }

  return { class: '', text: '' };
};

/**
 * Formatea el teléfono con espacios
 * @param {string} phone - Teléfono limpio
 * @returns {string} Teléfono formateado
 */
const formatPhoneNumber = phone => {
  if (!phone) return '';

  const hasPlus = phone.startsWith('+');
  const digits = phone.replace(/\D/g, '');

  // Caso internacional (ej: +34 612 345 678)
  if (hasPlus && digits.length >= 10) {
    const country = digits.slice(0, 2);
    const rest = digits.slice(2);

    const groups = rest.match(/.{1,3}/g) || [];
    return `+${country} ${groups.join(' ')}`.trim();
  }

  // Caso local (ej: 612 345 678)
  if (!hasPlus && digits.length >= 7) {
    const groups = digits.match(/.{1,3}/g) || [];
    return groups.join(' ');
  }

  return hasPlus ? `+${digits}` : digits;
};

// ============================================
// MANEJO DEL DOM
// ============================================

/**
 * Actualiza el estado visual de un campo
 * @param {HTMLInputElement} input - Elemento input
 * @param {boolean} isValid - Estado de validación
 * @param {string} message - Mensaje de error
 */
const updateFieldState = (input, isValid, message) => {
  const errorElement = document.getElementById(`${input.id}Error`);

  // Remover clases anteriores
  input.classList.remove('valid', 'invalid');

  if (input.value.trim() === '') {
    // Campo vacío - sin estado
    if (errorElement) errorElement.textContent = '';
    return;
  }

  // Aplicar nuevo estado
  input.classList.add(isValid ? 'valid' : 'invalid');

  if (errorElement) {
    errorElement.textContent = isValid ? '' : message;
  }
};

/**
 * Actualiza el medidor de fortaleza de contraseña
 * @param {number} strength - Puntuación 0-5
 */
const updateStrengthMeter = strength => {
  const bar = document.getElementById('strengthBar');
  const text = document.getElementById('strengthText');

  if (!bar || !text) return;

  const level = getStrengthLevel(strength);

  // Remover clases anteriores
  bar.className = 'strength-bar';

  if (strength > 0) {
    bar.classList.add(level.class);
    text.textContent = level.text;
  } else {
    text.textContent = '';
  }
};

// ============================================
// EVENT LISTENERS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrationForm');
  const result = document.getElementById('result');
  const formData = document.getElementById('formData');

  // Obtener inputs
  const inputs = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    password: document.getElementById('password'),
    confirmPassword: document.getElementById('confirmPassword'),
    birthdate: document.getElementById('birthdate'),
    postal: document.getElementById('postal'),
    website: document.getElementById('website'),
  };

  // Estado de validación
  const validationState = {
    name: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false,
    birthdate: false,
    postal: false,
    website: true, // Opcional, válido por defecto
  };

  // ----------------------------------------
  // VALIDACIÓN EN TIEMPO REAL
  // ----------------------------------------

  // Nombre
  inputs.name?.addEventListener('input', e => {
    const { isValid, message } = validators.validateName(e.target.value);
    validationState.name = isValid;
    updateFieldState(e.target, isValid, message);
  });

  // Email
  inputs.email?.addEventListener('input', e => {
    const { isValid, message } = validators.validateEmail(e.target.value);
    validationState.email = isValid;
    updateFieldState(e.target, isValid, message);
  });

  // Teléfono
  inputs.phone?.addEventListener('input', e => {
    const { isValid, message, formatted } = validators.validatePhone(
      e.target.value
    );
    validationState.phone = isValid;
    updateFieldState(e.target, isValid, message);

    // Aplicar formateo automático
    if (formatted && formatted !== e.target.value) {
      e.target.value = formatted;
    }
  });

  // Contraseña
  inputs.password?.addEventListener('input', e => {
    const { isValid, message, strength } = validators.validatePassword(
      e.target.value
    );
    validationState.password = isValid;
    updateFieldState(e.target, isValid, message);
    updateStrengthMeter(strength);

    // Re-validar confirmación si tiene valor
    if (inputs.confirmPassword?.value) {
      const confirmResult = validators.validateConfirmPassword(
        e.target.value,
        inputs.confirmPassword.value
      );
      validationState.confirmPassword = confirmResult.isValid;
      updateFieldState(
        inputs.confirmPassword,
        confirmResult.isValid,
        confirmResult.message
      );
    }
  });

  // Confirmar contraseña
  inputs.confirmPassword?.addEventListener('input', e => {
    const { isValid, message } = validators.validateConfirmPassword(
      inputs.password?.value || '',
      e.target.value
    );
    validationState.confirmPassword = isValid;
    updateFieldState(e.target, isValid, message);
  });

  // Fecha de nacimiento
  inputs.birthdate?.addEventListener('input', e => {
    const { isValid, message } = validators.validateBirthdate(e.target.value);
    validationState.birthdate = isValid;
    updateFieldState(e.target, isValid, message);
  });

  // Código postal
  inputs.postal?.addEventListener('input', e => {
    const { isValid, message } = validators.validatePostal(e.target.value);
    validationState.postal = isValid;
    updateFieldState(e.target, isValid, message);
  });

  // URL (opcional)
  inputs.website?.addEventListener('input', e => {
    const { isValid, message } = validators.validateUrl(e.target.value);
    validationState.website = isValid;
    updateFieldState(e.target, isValid, message);
  });

  // ----------------------------------------
  // ENVÍO DEL FORMULARIO
  // ----------------------------------------

  form?.addEventListener('submit', e => {
    e.preventDefault();

    // Verificar que todos los campos sean válidos
    const allValid = Object.values(validationState).every(
      isValid => isValid === true
    );

    if (!allValid) {
      // Encontrar primer campo inválido
      const firstInvalid = Object.entries(validationState).find(
        ([, isValid]) => !isValid
      );

      if (firstInvalid && inputs[firstInvalid[0]]) {
        inputs[firstInvalid[0]].focus();
      }

      return;
    }

    // Recopilar datos sanitizados
    const data = {
      name: sanitizeInput(inputs.name?.value || ''),
      email: sanitizeInput(inputs.email?.value || ''),
      phone: sanitizeInput(inputs.phone?.value || ''),
      birthdate: sanitizeInput(inputs.birthdate?.value || ''),
      postal: sanitizeInput(inputs.postal?.value || ''),
      website: sanitizeInput(inputs.website?.value || ''),
    };

    // Mostrar resultado
    if (result && formData) {
      formData.textContent = JSON.stringify(data, null, 2);
      result.classList.remove('hidden');
      result.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // ----------------------------------------
  // RESET
  // ----------------------------------------

  form?.addEventListener('reset', () => {
    // Limpiar estados
    Object.keys(validationState).forEach(key => {
      validationState[key] = key === 'website';
    });

    // Limpiar clases
    Object.values(inputs).forEach(input => {
      input?.classList.remove('valid', 'invalid');
    });

    // Limpiar mensajes de error
    document.querySelectorAll('.error-message').forEach(el => {
      el.textContent = '';
    });

    // Limpiar medidor de fortaleza
    updateStrengthMeter(0);

    // Ocultar resultado
    result?.classList.add('hidden');
  });
});

// ============================================
// EXPORTACIONES (para testing)
// ============================================

// Si estamos en un entorno de módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    patterns,
    validators,
    sanitizeInput,
    getStrengthLevel,
    formatPhoneNumber,
  };
}