async function carregarNotificacoes() {
    try {
        const response = await fetch('/CarregarNotificacoes');
        const notificacoes = await response.json();

        const qttNotificacao = document.querySelector('.qtd_notificacao')
        qttNotificacao.innerHTML = `Notificações (${notificacoes.length})`

        const containersDiv = document.querySelector('.containers');
        containersDiv.innerHTML = ''; 

        notificacoes.forEach((notificacao) => {
            const container = document.createElement('div');
            container.classList.add('container');
            
            let img;

            switch (notificacao.ds_tipo) {
                case 'Nova estatistica':
                    img = 'estatistica.png';
                    break;
                case 'Novo pedido':
                    img = 'pedido-feito.png';
                    break;
                case 'Nova Reserva':
                    img = 'reserva-feita.png';
                    break;
                case 'Plano Atualizado':
                    img = 'plano-up.png';
                    break;
                case 'Reserva cancelada':
                    img = 'cancel.png';
                    break;
                case 'Novo membro Clube':
                    img = 'membro-novo.png';
                    break;
                case 'Novo pedido Clube':
                    img = 'pedido-clube.png';
                    break;
                case 'Clube Criado':
                    img = 'novo-clube.png';
                    break;
                default:
                    img = 'default.png';
            }

            let pontoStyle = notificacao.ds_vizu ? 'style="display: none;"' : '';

            const modalId = `modal-${notificacao.cd_notificacao}`;
            const blurModalId = `blur-${notificacao.cd_notificacao}`;

            container.innerHTML = `
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

            container.addEventListener('click', async()=> {
                const modal = document.getElementById(modalId);
                modal.style.display = 'block';
                const ponto = document.getElementById(notificacao.cd_notificacao)
                ponto.style.display = 'none'
                await fetch('/VizualizarNotificacao', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ cd_notificacao: notificacao.cd_notificacao}) 
                });
                
            });
        });
    } catch (error) {
        console.error('Erro ao carregar notificações:', error);
    }
}

// Chama a função ao carregar a página
window.onload = carregarNotificacoes;
