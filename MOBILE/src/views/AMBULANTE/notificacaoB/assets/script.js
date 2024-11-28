async function carregarNotificacoes() {
    try {
        const response = await fetch('/CarregarNotificacoes');
        const notificacoes = await response.json();

        const qttNotificacao = document.querySelector('.qtd_notificacao');
        qttNotificacao.textContent = `Notificações (${notificacoes.length})`;

        const containersDiv = document.querySelector('.containers');
        containersDiv.innerHTML = '';

        notificacoes.forEach((notificacao) => {
            const container = document.createElement('div');
            container.classList.add('container');
            
            const imgMap = {
                'Nova estatistica': 'estatistica.png',
                'Novo pedido': 'pedido-feito.png',
                'Nova Reserva': 'reserva-feita.png',
                'Plano Atualizado': 'plano-up.png',
                'Reserva cancelada': 'cancel.png',
                'Novo membro Clube': 'membro-novo.png',
                'Novo pedido Clube': 'pedido-clube.png',
                'Clube Criado': 'novo-clube.png',
            };

            const img = imgMap[notificacao.ds_tipo] || 'default.png';
            const pontoStyle = notificacao.ds_vizu ? 'style="display: none;"' : '';

            const modalId = `modal-${notificacao.cd_notificacao}`;
            const cardId = `card-${notificacao.cd_notificacao}`;
            const blurModalId = `blur-${notificacao.cd_notificacao}`;

            container.innerHTML = `
                <div class="container" id="${cardId}">
                    <div class="img">
                        <img src="/ambulante/notificacaoB/assets/img/${img}" width="36vw" alt="">
                    </div>
                    <div class="d">
                        <p class="titulo-principal">${notificacao.ds_titulo}</p>
                        <p class="titulo-secundario">${notificacao.ds_descricao}</p>
                    </div>
                    <div id="${notificacao.cd_notificacao}" class="vizu" ${pontoStyle}> 
                        <div class="ponto"></div> 
                    </div>
                </div>

                <div id="${modalId}" class="modalNtf" style="display: none;">
                    <div id="${blurModalId}" class="blur"></div>
                    <div class="container containerModal">
                        <div class="img">
                            <img src="/ambulante/notificacaoB/assets/img/${img}" width="36vw" alt="">
                        </div>
                        <div class="d">
                            <p class="titulo-principal">${notificacao.ds_titulo}</p>
                            <p class="titulo-secundario">${notificacao.ds_descricao}</p>
                        </div>
                    </div>
                </div>
            `;

            containersDiv.appendChild(container);

            const card = document.getElementById(cardId);
            card.addEventListener('click', async () => {
                const modal = document.getElementById(modalId);
                modal.style.display = 'block';

                const ponto = document.getElementById(notificacao.cd_notificacao);
                ponto.style.display = 'none';

                if (notificacao.ds_vizu === false) {
                    await fetch('/VizualizarNotificacao', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ cd_notificacao: notificacao.cd_notificacao }),
                    });
                }

            });

            const blurModal = document.getElementById(blurModalId);
            blurModal.addEventListener('click', () => {
                const modal = document.getElementById(modalId);
                modal.style.display = 'none';
            });
        });
    } catch (error) {
        console.error('Erro ao carregar notificações:', error);
    }
}

window.onload = carregarNotificacoes;
