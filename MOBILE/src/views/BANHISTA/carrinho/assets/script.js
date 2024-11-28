async function selecionarBarraca(event) {
  const valor = event.target.value;

  try {
    const response = await fetch('/FiltroCarrinhos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ valor: 1 })
    });

    if (response.ok) {
      const carrinhos = await response.json();
      console.log(carrinhos)
      updateCarrinhos(carrinhos);
    } else {
      alert('Erro ao renderizar carrinhos!');
    }

  } catch (error) {
    console.error('Erro na requisição:', error);
    alert('Erro ao enviar requisição!');
  }
}

function updateCarrinhos(carrinhos) {
  const caixa = document.querySelector(".caixaP");
  caixa.innerHTML = '';

  let conteudo = '';

  carrinhos.forEach(barraca => {
    conteudo += `
            <a href="/reserva/${barraca.cd_carrinho}">
                <div class="caixa">
                    <div class="img">
                        <img src="/banhista/carrinho/assets/img/carrinho.png" alt="Carrinho">
                    </div>
                    <div class="escrita">
                        <h2>${barraca.nm_carrinho}</h2>
                        <p>${barraca.ds_localizacao}</p>
                        <div class="price">
                            <h6>Por 4 cadeiras</h6>
                            <h3>R$ ${barraca.vl_reserva}</h3>
                        </div>
                    </div>
                </div>
            </a>
        `;
  });

  caixa.innerHTML = conteudo;
}


document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('filtroPreco').addEventListener('change', selecionarBarraca);
});

/*Modal */

const modal = document.getElementById('modalBk');
const openModal = document.getElementById('filter');
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
