(function(){
  const itens = [...document.querySelectorAll('.sobre-item')];
  const botoes = itens.map(i=>i.querySelector('.sobre-question'));
  const paineis = itens.map(i=>i.querySelector('.panel'));
  const filtro = document.getElementById('filtro');
  const expandir = document.getElementById('expandir');
  const recolher = document.getElementById('recolher');
  const contador = document.getElementById('contador');
  const nores = document.getElementById('no-results');

  function setAria(btn, open){
    btn.setAttribute('aria-expanded', open ? 'true':'false');
  }

  // Abrir 1 clique (mantido)
  function openPanel(panel, btn){
    if(panel._animating) return;
    panel._animating = true;
    panel.classList.add('open');

    panel.style.height = 'auto';
    const end = panel.scrollHeight;
    panel.style.height = '0px';
    void panel.offsetHeight; // força reflow
    panel.style.height = end + 'px';
    setAria(btn, true);

    const done = (e)=>{
      if(e.propertyName!=='height') return;
      panel.style.height = 'auto';
      panel._animating = false;
      panel.removeEventListener('transitionend', done);
    };
    panel.addEventListener('transitionend', done);
  }

  function closePanel(panel, btn){
    if(panel._animating) return;
    panel._animating = true;

    const start = panel.scrollHeight;
    panel.style.height = start + 'px';
    void panel.offsetHeight;
    panel.style.height = '0px';
    setAria(btn,false);

    const done = (e)=>{
      if(e.propertyName!=='height') return;
      panel.classList.remove('open');
      panel._animating = false;
      panel.removeEventListener('transitionend', done);
    };
    panel.addEventListener('transitionend', done);
  }

  function toggle(panel, btn){
    btn.getAttribute('aria-expanded')==='true' ? closePanel(panel,btn) : openPanel(panel,btn);
  }

  // Inicialização (mantida)
  botoes.forEach((btn,i)=>{
    const pan=paineis[i];
    setAria(btn,false);
    pan.style.height='0px';
    btn.addEventListener('click',()=>toggle(pan,btn));
  });

  // ===== CORREÇÃO DA BUSCA =====
  // Normaliza texto removendo acentos de forma compatível com todos os navegadores
  function norm(input){
    const s = (input || '').toLowerCase();
    try {
      // remove marcas diacríticas em NFD (compatível)
      return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    } catch(e){
      // fallback para navegadores antigos
      return s;
    }
  }

  function clearMarks(el){
    if(!el) return;
    el.querySelectorAll('mark').forEach(m=>{
      const t = document.createTextNode(m.textContent);
      m.replaceWith(t);
    });
  }

  function highlight(el, query){
    if(!el || !query) return;
    // se NodeFilter não existir, apenas ignora destaque (não quebra a busca)
    if(!(window.NodeFilter && NodeFilter.SHOW_TEXT)) return;

    const q = norm(query);
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    const texts = [];
    while (walker.nextNode()) texts.push(walker.currentNode);

    texts.forEach(node => {
      const base = norm(node.data);
      const idx = base.indexOf(q);
      if(idx>-1){
        const span = document.createElement('span');
        span.appendChild(document.createTextNode(node.data.slice(0, idx)));
        const mark = document.createElement('mark');
        // usa o comprimento do termo digitado
        mark.textContent = node.data.slice(idx, idx + query.length);
        span.appendChild(mark);
        span.appendChild(document.createTextNode(node.data.slice(idx + query.length)));
        node.parentNode.replaceChild(span, node);
      }
    });
  }

  function updateCounter(){
    const vis = itens.filter(i=>!i.classList.contains('hidden-by-filter')).length;
    contador.innerHTML = `Exibindo <strong>${vis}</strong> curiosidades`;
    nores.classList.toggle('show', vis===0);
  }

  let debounce;
  function applyFilter(){
    const q = norm(filtro.value);
    itens.forEach((item, i) => {
      clearMarks(botoes[i]);
      clearMarks(paineis[i]);
      const text = norm(item.textContent);
      const match = !q || text.includes(q);
      item.classList.toggle('hidden-by-filter', !match);
      if(match && q){
        highlight(botoes[i], filtro.value);
        highlight(paineis[i], filtro.value);
      }
    });
    updateCounter();
  }

  filtro.addEventListener('input', () => {
    clearTimeout(debounce);
    debounce = setTimeout(applyFilter, 140);
  });

  // Expandir/Recolher (mantido)
  expandir.addEventListener('click', () => {
    itens.forEach((item, idx) => {
      if(item.classList.contains('hidden-by-filter')) return;
      const btn=botoes[idx], pan=paineis[idx];
      if(btn.getAttribute('aria-expanded')!=='true') openPanel(pan,btn);
    });
  });
  recolher.addEventListener('click', () => {
    itens.forEach((item, idx) => {
      if(item.classList.contains('hidden-by-filter')) return;
      const btn=botoes[idx], pan=paineis[idx];
      if(btn.getAttribute('aria-expanded')==='true') closePanel(pan,btn);
    });
  });

  updateCounter();
})();
