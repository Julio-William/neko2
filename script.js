document.addEventListener('DOMContentLoaded', () => {
  // Aplica modo escuro se salvo
  if (localStorage.getItem('dark-mode') === 'enabled') {
    document.body.classList.add('dark-mode');
  }

  window.toggleDarkMode = function () {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem(
      'dark-mode',
      document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled'
    );
  };

  // Título desaparecer ao rolar
  const tituloContainer = document.getElementById('tituloContainer');
  const imagemCheckpoint = document.getElementById('imagemCheckpoint');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          tituloContainer.classList.add('fade-out');
        } else {
          tituloContainer.classList.remove('fade-out');
        }
      });
    },
    { threshold: 0.5 } // Alterado de 1.0 para 0.5
  );

  if (imagemCheckpoint) {
    observer.observe(imagemCheckpoint);
  }

  // Toque para ativar hover
  document.querySelectorAll('.item-galeria').forEach(item => {
    item.addEventListener('touchstart', () => {
      item.classList.add('touch-active');
      setTimeout(() => item.classList.remove('touch-active'), 3000);
    });
  });
});

