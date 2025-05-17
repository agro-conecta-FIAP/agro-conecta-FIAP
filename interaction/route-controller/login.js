const formLogin = document.querySelector("#form-login");

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(formLogin);
  const email = formData.get("email");
  const password = formData.get("password");
  console.log("Email:", email);
  console.log("Senha:", password);
  if (email === "admin@admin.com" && password === "123") {
    window.location.href = "pages/dashboard.html";
  } else {
    alert("Email ou senha inválidos");
  }
});

// Inverter posição ao clicar em cadastrar
const containerLogin = document.querySelector(".container-login");
const registerSection = document.querySelector(".container-register");
const formRegister = document.getElementById("form-register");

registerSection.addEventListener("click", (e) => {
  e.preventDefault();
  containerLogin.classList.toggle("invertido");
  formRegister.classList.toggle("register-open");
  formLogin.classList.toggle("close");
});

// Trocar o texto em baixo de cadastrar e o link

const toggleText = document.getElementById("toggle-text");
const toggleLink = document.getElementById("toggle-link");

// Colocando o evento

toggleLink.addEventListener("click", (e) => {
  e.preventDefault();

  if (formLogin.style.display === "none") {
    // Se estiver mostrando a tela de login
    formLogin.style.display = "block";
    formRegister.style.display = "none";

    // Atualizar o texto e o link
    toggleLink.textContent = "Cadastre-se";
    toggleText.firstChild.textContent = "Não tem uma conta? ";
  } else {
    // Se estiver mostrando a tela de Registro
    formLogin.style.display = "none";
    formRegister.style.display = "block";

    // Atualizar o texto do link
    toggleLink.textContent = "Login";
    toggleText.firstChild.textContent = "Já tem uma conta? ";
  }
});

// Validando o campo de registro

document
  .getElementById("form-register")
  .addEventListener("submit", function (e) {
    const nome = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("password").value;
    const confSenha = document.getElementById("confpassword").value;
    const celular = document.getElementById("pnumber").value.trim();
    const genero = document.getElementById("genre").value;

    // Verifica se as senhas as senhas são iguais
    if (senha !== confSenha) {
      alert("As senhas não são iguais.");
      e.preventDefault();
      return;
    }

    // ver se tem algum campo vazio:
    if (!nome || !email || !senha || !confSenha || !celular || !genero) {
      alert("Preencher todos os campos.");
      e.preventDefault();
      return;
    }
  });
