


// dark mode

document.addEventListener('DOMContentLoaded', () => {
  // Verifica a preferência armazenada no localStorage
  const darkMode = localStorage.getItem('darkMode') === 'true';
  const modal = document.getElementById('modalBk');
const openModal = document.getElementById('filtro');
const closeModal = document.getElementById('btnL');

// Abrir o modal
openModal.addEventListener('click', () => {
  modal.style.display = 'flex';
  document.body.classList.add('no-scroll'); // Desabilita o scroll
});

// Fechar o modal
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
  document.body.classList.remove('no-scroll'); // Reabilita o scroll
});

// Fechar o modal clicando fora dele
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

// Atualizar ao carregar a página


  if (darkMode) {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
      updateImages(true);
  } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
      updateImages(false);
  }
  
  updateSlider();
});