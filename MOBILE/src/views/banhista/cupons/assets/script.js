document.addEventListener('DOMContentLoaded', () => {
  (function () {
      // ===================== Modal =====================
      const modal = document.getElementById('modalBk');
      const openModal = document.getElementById('btnfiltroCupon');
      const closeModal = document.getElementById('btnL');

      if (openModal && modal) {
          // Abrir o modal
          openModal.addEventListener('click', () => {
              modal.style.display = 'flex';
              document.body.classList.add('no-scroll'); // Desabilita o scroll
          });
      }

      if (closeModal && modal) {
          // Fechar o modal
          closeModal.addEventListener('click', () => {
              modal.style.display = 'none';
              document.body.classList.remove('no-scroll'); // Reabilita o scroll
          });
      }

      if (modal) {
          // Fechar o modal clicando fora dele
          window.addEventListener('click', (event) => {
              if (event.target === modal) {
                  modal.style.display = 'none';
                  document.body.classList.remove('no-scroll');
              }
          });
      }

      // ===================== Resultado em Tempo Real =====================
      const $range2 = document.querySelector('#myRange');
      const $value2 = document.querySelector('#resultadoTempoReal');

      if ($range2 && $value2) {
          $range2.addEventListener('input', function () {
              $value2.textContent = this.value;
          });
      }

      // ===================== Atualizar Radio Buttons =====================
      const radioInputs = document.querySelectorAll('.Radios input[type="radio"]');

      if (radioInputs.length > 0) {
          radioInputs.forEach(radio => {
              radio.addEventListener('change', function () {
                  // Remove a classe "active" de todos os labels
                  document.querySelectorAll('.Radios').forEach(label => label.classList.remove('active'));

                  // Adiciona a classe "active" ao label correspondente ao input selecionado
                  if (this.checked) {
                      this.parentElement.classList.add('active');
                  }
              });
          });
      }

      // ===================== Dark Mode =====================
      const darkMode = localStorage.getItem('darkMode') === 'true';

      if (darkMode) {
          document.body.classList.add('dark');
          document.body.classList.remove('light');
      } else {
          document.body.classList.add('light');
          document.body.classList.remove('dark');
      }
  })();
});
