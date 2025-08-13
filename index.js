
window.addEventListener("load", () => {
  const intro = document.getElementById("intro");
  const site = document.getElementById("site");

  setTimeout(() => {
    intro.style.opacity = 0; // começa a sumir
    setTimeout(() => {
      intro.style.display = "none"; // remove
      site.style.display = "block"; // mostra site
    }, 1000); // espera o fade-out terminar
  }, 1000); // tempo que a intro fica visível (2s)
});
