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

const tituloCentral = document.querySelector('.titulo-central');
const tituloContainer = document.getElementById('tituloContainer');

function handleScroll() {
  const scrollY = window.scrollY;
  const fadeStart = 100;
  const fadeEnd = 300;

  const subtituloAtual = document.querySelector('.subtitulo');

  if (scrollY < fadeStart) {
    if (!subtituloAtual) {
      const p = document.createElement('p');
      p.className = 'subtitulo';
      p.textContent = 'Soluções criativas e modernas para suas ideias inovadoras.';
      tituloContainer.appendChild(p);
    } else {
      subtituloAtual.style.opacity = '1';
    }
  } else if (scrollY > fadeEnd) {
    if (subtituloAtual) {
      subtituloAtual.remove();
    }
  } else {
    if (subtituloAtual) {
      const progress = 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart);
      subtituloAtual.style.opacity = progress.toString();
    }
  }

  const paddingTop = Math.max(0.5, 4 - scrollY / 50);
  const paddingBottom = Math.max(0.3, 2 - scrollY / 100);
  tituloContainer.style.paddingTop = `${paddingTop}rem`;
  tituloContainer.style.paddingBottom = `${paddingBottom}rem`;

  const fontSizeStart = 3.5;
  const fontSizeEnd = 2.5;
  const scaleStart = 0;
  const scaleEnd = 300;
  const progress = Math.min(1, Math.max(0, (scrollY - scaleStart) / (scaleEnd - scaleStart)));
  const currentFontSize = fontSizeStart - progress * (fontSizeStart - fontSizeEnd);
  tituloCentral.style.fontSize = `${currentFontSize}rem`;

  requestAnimationFrame(handleScroll);
}

requestAnimationFrame(handleScroll);

// Touch para GIFs
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

// Auto GIF play em mobile com Intersection Observer
const isMobile = window.matchMedia("(max-width: 768px)").matches;

if (isMobile && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('touch-active');
      } else {
        entry.target.classList.remove('touch-active');
      }
    });
  }, {
    threshold: 0.6
  });

  document.querySelectorAll('.item-galeria').forEach(item => {
    observer.observe(item);
  });
}
