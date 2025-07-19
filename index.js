
window.addEventListener("load", () => {
  const intro = document.getElementById("intro");
  const site = document.getElementById("site");

  setTimeout(() => {
    intro.style.opacity = 0;
    setTimeout(() => {
      intro.style.display = "none";
      site.style.display = "block";
    }, 1000); // espera 1 segundo para sumir totalmente
  }, 2000); // mostra a intro por 2 segundos
});
