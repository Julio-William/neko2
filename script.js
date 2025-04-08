const toggleButton = document.querySelector('.dark-mode-toggle');

if (localStorage.getItem('dark-mode') === 'enabled') {
  document.body.classList.add('dark-mode');
  toggleButton.textContent = 'Modo Claro';
} else {
  toggleButton.textContent = 'Modo Escuro';
}

function toggleDarkMode() {
  const isDark = document.body.classList.toggle('dark-mode');
  localStorage.setItem('dark-mode', isDark ? 'enabled' : 'disabled');
  toggleButton.textContent = isDark ? 'Modo Claro' : 'Modo Escuro';
}

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
  { root: null, threshold: 1.0 }
);

if (imagemCheckpoint) {
  observer.observe(imagemCheckpoint);
}

let touchStartY = 0;
let touchEndY = 0;

document.querySelectorAll('.item-galeria').forEach(item => {
  item.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  });

  item.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].clientY;
    const distance = Math.abs(touchEndY - touchStartY);

    if (distance < 10) {
      const isActive = item.classList.contains('touch-active');
      document.querySelectorAll('.item-galeria').forEach(i => i.classList.remove('touch-active'));
      if (!isActive) item.classList.add('touch-active');
    }
  });
});
