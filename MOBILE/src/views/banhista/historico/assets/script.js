// Função para alternar entre o recibo e o recibo aberto
function toggleRecibo(index) {
  const recibo = document.getElementById(`recibo-${index}`);
  const reciboAberto = document.getElementById(`recibo-aberto-${index}`);

  // Verifica se o recibo está visível e alterna entre visível e oculto
  if (recibo.style.display === 'none') {
      recibo.style.display = 'block';
      reciboAberto.style.display = 'none';
  } else {
      recibo.style.display = 'none';
      reciboAberto.style.display = 'block';
  }
}


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

// Atualizar ao carregar a página (exemplo de atualização do slider)


// Atualiza o estado de filtro ao selecionar a forma de pagamento
document.querySelectorAll('.Radios input[type="radio"]').forEach(radio => {
radio.addEventListener('change', function () {
    // Remove a classe "active" de todos os labels
    document.querySelectorAll('.Radios').forEach(label => label.classList.remove('active'));

    // Adiciona a classe "active" ao label correspondente ao input selecionado
    if (this.checked) {
        this.parentElement.classList.add('active');
    }
});
});

  if (darkMode) {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
      updateImages(true);
  } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
      updateImages(false);
  }updateSlider();
});
