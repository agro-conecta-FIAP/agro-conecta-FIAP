document.getElementById('form-contato').addEventListener('submit', function (e) {
  e.preventDefault(); // Impede o envio se houver erros

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();
  const msgErro = document.getElementById('mensagem-erro');

  let erros = [];

  // Validação do Nome
  if (nome === '') {
    erros.push("O campo Nome é obrigatório.");
  } else if (nome.split(' ').length < 2) {
    erros.push("Informe pelo menos um nome e um sobrenome.");
  }

  // Validação do E-mail
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === '') {
    erros.push("O campo E-mail é obrigatório.");
  } else if (!regexEmail.test(email)) {
    erros.push("Informe um e-mail válido.");
  }

  // Validação da Mensagem
  if (mensagem === '') {
    erros.push("O campo Mensagem é obrigatório.");
  } else if (mensagem.length < 30 || mensagem.length > 500) {
    erros.push("A mensagem deve conter entre 30 e 500 caracteres.");
  }

  // Exibe erros ou envia formulário
  if (erros.length > 0) {
    msgErro.innerHTML = erros.join('<br>');
  } else {
    msgErro.innerHTML = "";
    alert("Formulário enviado com sucesso!");

  }
});