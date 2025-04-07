const imagens = ["sa.png", "sa2.png", "sa3.jpg"];
let indexAtual = 0;
let intervalo;
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

function abrirGaleria(index) {
  indexAtual = index;
  if (lightbox) {
    lightbox.style.display = "flex";
    atualizarImagem();
    intervalo = setInterval(proximaImagem, 3000);
  }
}

function atualizarImagem() {
  if (lightboxImg) {
    lightboxImg.src = imagens[indexAtual];
  }
}

function proximaImagem() {
  indexAtual = (indexAtual + 1) % imagens.length;
  atualizarImagem();
}

function imagemAnterior() {
  indexAtual = (indexAtual - 1 + imagens.length) % imagens.length;
  atualizarImagem();
}

function fecharGaleria() {
  clearInterval(intervalo);
  if (lightbox) lightbox.style.display = "none";
}

if (nextBtn) nextBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  proximaImagem();
});

if (prevBtn) prevBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  imagemAnterior();
});

if (lightboxImg) {
  lightboxImg.addEventListener("click", (e) => e.stopPropagation());
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") fecharGaleria();
});
