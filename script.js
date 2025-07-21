// Validación en tiempo real del nombre de usuario
document.getElementById('username').oninput = function () {
    const username = this.value;
    const feedback = document.getElementById('usernameFeedback');
  
    if (username.length < 4) {
      showFeedback('Mínimo 4 caracteres', 'invalido');
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      showFeedback('Solo letras, números y guiones bajos', 'invalido');
    } else {
      showFeedback('Nombre de usuario válido', 'valido');
    }
  
    function showFeedback(mensaje, tipo) {
      feedback.textContent = mensaje;
      feedback.className = `feedback ${tipo}`;
    }
  };
  
  // Evaluación de fuerza de contraseña
  document.getElementById('password').oninput = function () {
    const password = this.value;
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.getElementById('strengthText');
  
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
  
    const colors = ['red', 'orange', 'yellow', 'green'];
    const messages = ['Muy débil', 'Débil', 'Moderada', 'Fuerte'];
  
    const width = (strength / 4) * 100;
    strengthBar.style.width = `${width}%`;
    strengthBar.style.background = colors[strength - 1] || 'red';
    strengthText.textContent = messages[strength - 1] || 'Muy débil';
    strengthText.style.color = colors[strength - 1] || 'red';
  };
  
  // Validación en tiempo real de confirmación de contraseña
  document.getElementById('confirmPassword').oninput = function () {
    const password = document.getElementById('password').value;
    const confirm = this.value;
  
    if (confirm !== password) {
      mostrarError('confirmPasswordError', 'Las contraseñas no coinciden');
    } else {
      ocultarError('confirmPasswordError');
    }
  };
  
  // Validación al enviar el formulario
  document.getElementById('registroForm').onsubmit = function (e) {
    e.preventDefault();
    let valido = true;
  
    // Validar nombre
    const nombre = document.getElementById('nombre').value.trim();
    if (nombre === '') {
      mostrarError('nombreError', 'El nombre es obligatorio');
      valido = false;
    } else {
      ocultarError('nombreError');
    }
  
    // Validar nombre de usuario (también si está vacío)
    const username = document.getElementById('username').value.trim();
    if (username === '') {
      mostrarErrorPersonalizado('usernameFeedback', 'Nombre de usuario obligatorio');
      document.getElementById('username').classList.add('input-error');
      valido = false;
    } else {
      document.getElementById('usernameFeedback').textContent = '';
      document.getElementById('usernameFeedback').className = 'feedback';
      document.getElementById('username').classList.remove('input-error');
    }
  
    // Validar email
    const email = document.getElementById('email').value;
    if (!/\S+@\S+\.\S+/.test(email)) {
      mostrarError('emailError', 'Email inválido');
      valido = false;
    } else {
      ocultarError('emailError');
    }
  
    // Validar contraseña
    const password = document.getElementById('password').value;
    if (password.length < 6) {
      mostrarError('passwordError', 'Mínimo 6 caracteres');
      valido = false;
    } else {
      ocultarError('passwordError');
    }
  
    // Confirmar contraseña
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (confirmPassword !== password) {
      mostrarError('confirmPasswordError', 'Las contraseñas no coinciden');
      valido = false;
    } else {
      ocultarError('confirmPasswordError');
    }
  
    if (valido) {
      alert('Formulario enviado correctamente');
      this.reset();
      document.querySelector('.strength-bar').style.width = '0';
      document.getElementById('strengthText').textContent = '';
      document.getElementById('usernameFeedback').textContent = '';
    }
  };
  
  // Mostrar error estándar
  function mostrarError(id, mensaje) {
    const error = document.getElementById(id);
    const input = document.getElementById(id.replace('Error', ''));
    error.textContent = mensaje;
    error.style.display = 'block';
    input.classList.add('input-error');
  }
  
  // Ocultar error estándar
  function ocultarError(id) {
    const error = document.getElementById(id);
    const input = document.getElementById(id.replace('Error', ''));
    error.textContent = '';
    error.style.display = 'none';
    input.classList.remove('input-error');
  }
  
  // Mostrar error para feedback personalizado
  function mostrarErrorPersonalizado(id, mensaje) {
    const feedback = document.getElementById(id);
    feedback.textContent = mensaje;
    feedback.className = 'feedback invalido';
  }
  