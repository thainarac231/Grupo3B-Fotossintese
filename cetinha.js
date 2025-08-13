function toggleTexto(id, btn) {
    const texto = document.getElementById(id);
    const isVisible = texto.style.display === "block";
    
    // Esconde todos os textos antes
    document.querySelectorAll(".saiba-mais-texto").forEach(div => div.style.display = "none");
    document.querySelectorAll(".saiba-mais-btn").forEach(button => button.classList.remove("ativo"));

    if (!isVisible) {
      texto.style.display = "block";
      btn.classList.add("ativo");
    }
  }