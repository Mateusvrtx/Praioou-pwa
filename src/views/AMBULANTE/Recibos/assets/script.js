async function selecionarBarraca(event) {
    const carrinho = event.target.value;

    try {
        const response = await fetch('/CarregarRecibos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cd_carrinho: carrinho })
        });

        if (response.ok) {
            const result = await response.json();

            updateReservas(result.reservas)
            updatePedidos(result.pedidos)
        } else {
            alert('Erro ao renderizar comanda!');
        }

    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao enviar requisição!');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('sltBarraca').addEventListener('change', selecionarBarraca);
});

function updateReservas(reservas) {
    const container = document.getElementById('reservas')
    container.innerHTML = '';

    reservas.forEach((reserva, index) => {
        const card = document.createElement('div');
        card.classList.add('container');

        let dataReserva = new Date(reserva.reservas.dt_reserva + 'T00:00:00');
        let dataFormatada = dataReserva.toLocaleDateString('pt-BR');

        const contentId = `content-${index}`;
        const expandedContentId = `expanded-content-${index}`;

        card.innerHTML = `
            <div class="card" id="card-${index}">
                <div class="header" onclick="toggleContent(${index})">
                    <h2>${reserva.cliente.nm_cliente} ${reserva.cliente.nm_sobrenomeC}</h2>
                    <p>${dataFormatada}</p>
                </div>
                <div class="content" id="${contentId}">
                    <p><strong>Total:</strong> R$ ${reserva.reservas.vl_reserva}</p>
                    <p><strong>Forma de Pagamento:</strong> Cartão Débito</p>
                </div>
                <div class="expanded-content" id="${expandedContentId}">
                    <p><strong>Pessoas:</strong> ${reserva.reservas.qt_pessoas} pessoas</p>
                    <p><strong>Horário Reserva:</strong> ${reserva.reservas.hr_reserva}</p>
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}

function updatePedidos(pedidos) {

    const container = document.getElementById('pedidos')
    container.innerHTML = '';

    pedidos.forEach((pedido, index) => {
        const card = document.createElement('div');
        card.classList.add('container');
        console.log(pedido.DataPedido);

        let dataPedido = new Date(pedido.DataPedido);
        let dataFormatada = dataPedido.toLocaleDateString('pt-BR');

        const contentId = `contentP-${index}`;
        const expandedContentId = `expanded-contentP-${index}`;

        card.innerHTML = ` 
            <div class="card" id="card-${index}">
                <div class="header" onclick="toggleContentP(${index})">
                    <h2>${pedido.cliente.nm_cliente} ${pedido.cliente.nm_sobrenomeC}</h2>
                    <p>${dataFormatada}</p>
                </div>
                <div class="content" id="${contentId}">
                    <p><strong>Total:</strong> R$ ${pedido.ValorTotalPedido}</p>
                    <p><strong>Forma de Pagamento:</strong> ${pedido.tipoPagamento}</p>
                </div>
                <div class="expanded-content" id="${expandedContentId}">
                </div>
            </div>
        `;

        container.appendChild(card);

        const DetalhesPedido = document.getElementById(expandedContentId);

        pedido.Produtos.forEach(pdd => {
            DetalhesPedido.innerHTML += `
                <p><strong>${pdd.Quantidade}x ${pdd.nome}</strong> R$${pdd.ValorProduto}</p>
            `;
        });
    });
}

var pastaReserva = document.getElementById("formReserva"); //form Reservas
var pastaPedido = document.getElementById("formPedido"); //form Pedidos
var btnPedidoS = document.getElementById("pedidoC"); // pasta selecionada dos Pedidos
var btnReservaS = document.getElementById("reservaC"); //pasta selecionada das Reservas
var btnPedido = document.getElementById("pedido"); //pasta não selecionada dos pedidos
var btnReserva = document.getElementById("reserva"); //pasta não selecionada das reservas

function PedidosClick() {
    btnPedidoS.style.display = "flex";
    btnReservaS.style.display = "none";
    pastaPedido.style.display = "flex";
    pastaReserva.style.display = "none";
    btnPedido.style.display = "none";
    btnReserva.style.display = "flex";
}

function ReservasClick() {
    btnPedidoS.style.display = "none";
    btnReservaS.style.display = "flex";
    pastaPedido.style.display = "none";
    pastaReserva.style.display = "flex";
    btnPedido.style.display = "flex";
    btnReserva.style.display = "none";
}

function toggleContent(index) {
    const content = document.getElementById(`expanded-content-${index}`);
    const cardContent = document.getElementById(`content-${index}`);

    if (content.style.display === "block") {
        content.style.display = "none";
        cardContent.style.borderBottom = ".5vw solid #73969C";
        cardContent.style.borderRadius = "4vw";
    } else {
        content.style.display = "block";
        cardContent.style.borderBottom = "none";
        cardContent.style.borderRadius = "4vw 4vw 0vw 0vw";
    }
}

function toggleContentP(index) {
    const contentP = document.getElementById(`expanded-contentP-${index}`);
    const cardContentP = document.getElementById(`contentP-${index}`);

    if (contentP.style.display === "block") {
        contentP.style.display = "none";
        cardContentP.style.borderBottom = ".5vw solid #73969C";
        cardContentP.style.borderRadius = "4vw";
    } else {
        contentP.style.display = "block";
        cardContentP.style.borderBottom = "none";
        cardContentP.style.borderRadius = "4vw 4vw 0vw 0vw";
    }
}

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

  // Selecionar elementos
const modal = document.getElementById('modalBk');
const openModal = document.getElementById('filtrar');
const closeModal = document.getElementById('btnL');

// Abrir o modal
openModal.addEventListener('click', () => {
  modal.style.display = 'flex';
});

// Fechar o modal
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Fechar o modal clicando fora dele
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});