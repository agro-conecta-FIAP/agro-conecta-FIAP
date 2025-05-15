const links = Array.from(document.getElementsByClassName('dashboard-footer-link'));

console.log(links);

links.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(link.id, link.href);
    window.location.href =`http://127.0.0.1:5500/pages/${link.id}.html`;
  });
});
