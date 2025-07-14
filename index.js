window.addEventListener("load", () => {
      const intro = document.getElementById("intro");
      const content = document.getElementById("content");

      setTimeout(() => {
        intro.style.opacity = 0;
        setTimeout(() => {
          intro.style.display = "none";
          content.style.display = "block";
        }, 1000);
      }, 3000);
    });