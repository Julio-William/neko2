// Tema escuro persistente
if (localStorage.getItem('dark-mode') === 'enabled') {
  document.body.classList.add('dark-mode');
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem(
    'dark-mode',
    document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled'
  );
}

const tituloContainer = document.getElementById('tituloContainer');
const imagemCheckpoint = document.getElementById('imagemCheckpoint');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        tituloContainer.classList.add('fade-out');
      } else {
        tituloContainer.classList.remove('fade-out');
      }
    });
  },
  { root: null, threshold: 1.0 }
);

if (imagemCheckpoint) {
  observer.observe(imagemCheckpoint);
}

// Suporte a toque para ativar hover
document.querySelectorAll('.item-galeria').forEach((item) => {
  item.addEventListener('touchstart', () => {
    item.classList.add('touch-active');
    setTimeout(() => item.classList.remove('touch-active'), 3000);
  });
});

