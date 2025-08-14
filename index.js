window.addEventListener("load", () => {
  const intro = document.getElementById("intro");
  const site = document.getElementById("site");

  setTimeout(() => {
    intro.style.opacity = 0; // começa o fade-out
    setTimeout(() => {
      intro.style.display = "none"; // remove do DOM
      site.style.display = "block"; // mostra o site
    }, 1000); // espera o fade-out terminar
  }, 2000); // tempo que a intro fica (2 segundos)
});

// Seleciona todos os botões de pergunta
const questions = document.querySelectorAll('.sobre-question');

questions.forEach(q => {
  q.addEventListener('click', () => {
    const answer = q.nextElementSibling;

    // Alterna a classe "open" para mostrar/ocultar resposta
    answer.classList.toggle('open');
  });
});
