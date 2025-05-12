const formLogin = document.querySelector('#form-login');

formLogin.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(formLogin);
  const email = formData.get('email');
  const password = formData.get('password');
  console.log('Email:', email);
  console.log('Senha:', password);
  if (email === 'admin@admin.com' && password === '123') {
    window.location.href = 'pages/dashboard.html';
  } else {
    alert('Email ou senha inválidos');
  }
});

// Inverter posição ao clicar em cadastrar
const containerLogin = document.querySelector('.container-login');
const registerSection = document.querySelector('.container-register');
const formRegister = document.getElementById('form-register');

  registerSection.addEventListener('click', (e) => {
    e.preventDefault();
    containerLogin.classList.toggle('invertido');
    formRegister.classList.toggle('register-open')
    formLogin.classList.toggle('close')
    console.log('aaaaa')
})
