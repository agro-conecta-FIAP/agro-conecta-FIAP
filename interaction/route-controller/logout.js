const buttonLogout = document.querySelector('.logout-button');

const logout = () => {
  window.location.href = '/';
}

buttonLogout?.addEventListener('click', logout);
