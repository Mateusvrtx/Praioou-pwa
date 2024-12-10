document.addEventListener("DOMContentLoaded", () => {
    (function () {
        // ===================== Parte do Carrinho =====================
        const diminuirBtn = document.getElementById('diminuir-1');
        const aumentarBtn = document.getElementById('aumentar-1');
        const quantidadeElem = document.getElementById('quantidade-1');
        const totalElem = document.querySelector('.total h3:nth-child(2)');
        const modalPagamentoValor = document.querySelector('.vlFinal h1 strong');

        const precoUnitario = 15.00; // Preço unitário do produto

        // Atualiza o total na interface
        function atualizarTotal() {
            if (quantidadeElem && totalElem && modalPagamentoValor) {
                const quantidade = parseInt(quantidadeElem.textContent) || 0;
                const total = (quantidade * precoUnitario).toFixed(2).replace('.', ',');
                totalElem.textContent = `R$ ${total}`;
                modalPagamentoValor.textContent = `R$ ${total}`;
            }
        }

        // Diminuir quantidade
        diminuirBtn?.addEventListener('click', () => {
            if (quantidadeElem) {
                let quantidade = parseInt(quantidadeElem.textContent) || 1;
                if (quantidade > 1) {
                    quantidade--;
                    quantidadeElem.textContent = quantidade;
                    atualizarTotal();
                }
            }
        });

        // Aumentar quantidade
        aumentarBtn?.addEventListener('click', () => {
            if (quantidadeElem) {
                let quantidade = parseInt(quantidadeElem.textContent) || 0;
                quantidade++;
                quantidadeElem.textContent = quantidade;
                atualizarTotal();
            }
        });

        atualizarTotal(); // Inicializa o total com a quantidade inicial

        // ===================== Modal de Pagamento =====================
        const btnPagamento = document.getElementById('pagamento');
        const ModalPagamento = document.getElementById('ModalPamento');
        const formFinalizarPedido = document.getElementById('formFinalizarPedido');

        btnPagamento?.addEventListener('click', () => {
            if (ModalPagamento) {
                ModalPagamento.style.display = 'block';
            }
        });

        document.querySelector('.FecharModalPagamento')?.addEventListener('click', () => {
            if (ModalPagamento) {
                ModalPagamento.style.display = 'none';
            }
        });

        formFinalizarPedido?.addEventListener('submit', (event) => {
            event.preventDefault();
            const Metodo = document.querySelector('input[name="FormaDePagamento"]:checked');
            if (Metodo) {
                alert(`Pedido finalizado com o método de pagamento: ${Metodo.value}`);
                ModalPagamento.style.display = 'none';
            } else {
                alert('Selecione uma forma de pagamento antes de finalizar o pedido.');
            }
        });

        // ===================== Modal de Exclusão =====================
        const excluirBtn = document.getElementById('Excluir');
        const modalExcluir = document.getElementById('ModalExcluir');
        const btnFecharModalExcluir = document.querySelector('.FecharModalExcluir');
        const btnExcluir = document.getElementById('apagar-1');
        const produtoElement = document.querySelector('.produto');

        excluirBtn?.addEventListener('click', () => {
            if (modalExcluir) {
                modalExcluir.style.display = 'block';
            }
        });

        btnFecharModalExcluir?.addEventListener('click', () => {
            if (modalExcluir) {
                modalExcluir.style.display = 'none';
            }
        });

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
