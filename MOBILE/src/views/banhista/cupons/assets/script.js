const modal = document.getElementById('modalBk');
const openModal = document.getElementById('btnfiltroCupon');
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
updateSlider();

// Resultado em tempo Real
let $range2 = document.querySelector('#myRange'),
    $value2 = document.querySelector('#resultadoTempoReal');

$range2.addEventListener('input', function() {
    $value2.textContent = this.value;
});

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