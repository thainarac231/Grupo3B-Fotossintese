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

// Seleciona os elementos dos sliders
const light = document.getElementById('light');
const water = document.getElementById('water');
const co2 = document.getElementById('co2');

// Elementos de exibição
const rateDisplay = document.getElementById('rate');
const fillBar = document.getElementById('fill-bar');

// Atualiza a taxa de fotossíntese
function calculateRate() {
  const l = parseInt(light.value);
  const w = parseInt(water.value);
  const c = parseInt(co2.value);

  const rate = Math.round((l + w + c) / 3);

  rateDisplay.textContent = rate + '%';
  fillBar.style.width = rate + '%';
}

// Atualiza a cor preenchida do slider
function updateSliderBackground(slider, color) {
  const value = (slider.value - slider.min) / (slider.max - slider.min) * 100;
  slider.style.background = `linear-gradient(to right, ${color} ${value}%, #ccc ${value}%)`;
}

// Atualiza tudo ao mover os sliders
function handleSliderInput() {
  calculateRate();
  updateSliderBackground(light, '#328286'); // amarelo para luz
  updateSliderBackground(water, '#328286'); // azul para água
  updateSliderBackground(co2, '#328286');   // cinza escuro para CO₂
}

// Adiciona eventos
light.addEventListener('input', handleSliderInput);
water.addEventListener('input', handleSliderInput);
co2.addEventListener('input', handleSliderInput);

// Inicializa ao carregar
handleSliderInput();



















// ======== Tema claro/escuro com persistência ========
const root = document.documentElement;
const btnTema = document.getElementById('toggle-tema');

// pega preferência salva ou do SO (opcional)
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('tema');
const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
root.setAttribute('data-theme', initialTheme);
if (btnTema) {
  btnTema.setAttribute('aria-pressed', initialTheme === 'dark');
  btnTema.querySelector('.icon').textContent = initialTheme === 'dark' ? '🌙' : '☀️';
}

btnTema?.addEventListener('click', ()=>{
  const current = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', current);
  localStorage.setItem('tema', current);
  btnTema.setAttribute('aria-pressed', current === 'dark');
  btnTema.querySelector('.icon').textContent = current === 'dark' ? '🌙' : '☀️';
});

// ======== Link ativo no menu (auto) ========
(function highlightActiveLink() {
  const here = location.pathname.split('/').pop() || 'principal.html';
  document.querySelectorAll('.site-nav a').forEach(a=>{
    const href = a.getAttribute('href');
    if (href === here) {
      a.classList.add('active');
      a.setAttribute('aria-current','page');
    }
  });
})();













