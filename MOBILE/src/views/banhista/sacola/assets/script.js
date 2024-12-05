document.addEventListener("DOMContentLoaded", () => {
    const diminuirBtn = document.getElementById('diminuir-1');
    const aumentarBtn = document.getElementById('aumentar-1');
    const quantidadeElem = document.getElementById('quantidade-1');
    const totalElem = document.querySelector('.total h3:nth-child(2)');
    const modalPagamentoValor = document.querySelector('.vlFinal h1 strong');

    // Preço unitário do produto
    const precoUnitario = 15.00;

    // Atualiza o total na interface
    function atualizarTotal() {
        const quantidade = parseInt(quantidadeElem.textContent);
        const total = (quantidade * precoUnitario).toFixed(2).replace('.', ','); // Formata para R$
        totalElem.textContent = `R$ ${total}`;
        modalPagamentoValor.textContent = `R$ ${total}`;
    }

    // Diminuir quantidade
    diminuirBtn.addEventListener('click', () => {
        let quantidade = parseInt(quantidadeElem.textContent);
        if (quantidade > 1) {
            quantidade--;
            quantidadeElem.textContent = quantidade;
            atualizarTotal();
        }
    });

    // Aumentar quantidade
    aumentarBtn.addEventListener('click', () => {
        let quantidade = parseInt(quantidadeElem.textContent);
        quantidade++;
        quantidadeElem.textContent = quantidade;
        atualizarTotal();
    });

    // Inicializa o total com a quantidade inicial
    atualizarTotal();
});

// Abrir o modal de pagamento
const btnPagamento = document.getElementById('pagamento');
const ModalPagamento = document.getElementById('ModalPamento');
const btnFinalizarPedido = document.getElementById('btnFinalizar');
const formFinalizarPedido = document.getElementById('formFinalizarPedido');

btnPagamento.onclick = function () {
    ModalPagamento.style.display = 'block';
};

// Fechar o modal de pagamento
document.querySelector('.FecharModalPagamento').onclick = function () {
    ModalPagamento.style.display = 'none';
};

// Finalizar pedido
formFinalizarPedido.addEventListener('submit', function (event) {
    event.preventDefault(); // Previne o envio do formulário padrão
    const Metodo = document.querySelector('input[name="FormaDePagamento"]:checked');
    if (Metodo) {
        alert(`Pedido finalizado com o método de pagamento: ${Metodo.value}`);
        ModalPagamento.style.display = 'none';
    } else {
        alert('Selecione uma forma de pagamento antes de finalizar o pedido.');
    }
});

// ========================== Modal de Exclusão ==========================

// Modal de Exclusão
const excluirBtn = document.getElementById('Excluir'); // Botão para abrir o modal de exclusão
const modalExcluir = document.getElementById('ModalExcluir');
const btnFecharModalExcluir = document.querySelector('.FecharModalExcluir');
const btnExcluir = document.getElementById('apagar-1');
const produtoElement = document.querySelector('.produto'); // Elemento do produto

// Mostrar modal de exclusão ao clicar no botão
excluirBtn.addEventListener('click', () => {
    modalExcluir.style.display = 'block'; // Exibe o modal
});

// Fechar modal de exclusão
btnFecharModalExcluir.addEventListener('click', () => {
    modalExcluir.style.display = 'none'; // Esconde o modal
});

// Excluir produto
btnExcluir.addEventListener('click', () => {
    produtoElement.remove(); // Remove o produto da tela
    modalExcluir.style.display = 'none'; // Fecha o modal
});
