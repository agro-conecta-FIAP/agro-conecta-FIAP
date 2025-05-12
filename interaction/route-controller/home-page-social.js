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

