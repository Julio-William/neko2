// Função para alternar entre modo claro e escuro
function toggleDarkMode() {
  // Adiciona ou remove a classe 'dark-mode' no body para mudar o tema
  document.body.classList.toggle('dark-mode');
  
  // Verifica se o tema atual é escuro para ajustar o texto do botão
  const button = document.querySelector('.dark-mode-toggle');
  if (document.body.classList.contains('dark-mode')) {
    button.textContent = 'Modo Claro';
  } else {
    button.textContent = 'Modo Escuro';
  }

  // Salva a preferência do modo no localStorage
  storeDarkModePreference();
}

// Armazenamento da preferência do modo escuro no localStorage
function storeDarkModePreference() {
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('darkMode', 'enabled');
  } else {
    localStorage.setItem('darkMode', 'disabled');
  }
}

// Detecta a preferência salva no localStorage e aplica o tema correto
window.addEventListener('load', function() {
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    document.querySelector('.dark-mode-toggle').textContent = 'Modo Claro';
  } else {
    document.body.classList.remove('dark-mode');
    document.querySelector('.dark-mode-toggle').textContent = 'Modo Escuro';
  }
});

// Alteração da visibilidade das imagens estáticas e gifs na galeria
let touchStartY = 0;
let touchEndY = 0;

// Função para ativar/desativar a troca entre imagens estáticas e gifs
document.querySelectorAll('.item-galeria').forEach(item => {
  item.addEventListener('click', function() {
    // Alterna a classe 'touch-active' para controlar a troca entre as imagens
    item.classList.toggle('touch-active');
  });

  // Detecta gestos de toque para dispositivos móveis
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

// Função para ajustar o estilo do botão conforme o tamanho da tela
function applyToggleButtonStyle() {
  const toggleButton = document.querySelector('.dark-mode-toggle');

  // Se a largura da tela for menor ou igual a 768px, altera o estilo do botão
  if (window.innerWidth <= 768) {
    toggleButton.classList.add('icon-style');
    toggleButton.textContent = document.body.classList.contains('dark-mode') ? '☀' : '☾';
  } else {
    toggleButton.classList.remove('icon-style');
    toggleButton.textContent = document.body.classList.contains('dark-mode') ? 'Modo Claro' : 'Modo Escuro';
  }
}

// Chama a função para aplicar o estilo do botão no carregamento da página
window.addEventListener('resize', applyToggleButtonStyle);
applyToggleButtonStyle();
