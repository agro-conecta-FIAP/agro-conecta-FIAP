const links = Array.from(document.getElementsByClassName('dashboard-footer-link'));

console.log(links);

links.forEach(link => {
  if (link.classList.contains('desactive')) {
    link.addEventListener('click', (e) => {
      e.preventDefault();
    });
  }
});
