const urlParams = new URLSearchParams(window.location.search);

const id = urlParams.get('id') || window.location.pathname.split('/').pop();

const hrReserva = document.querySelector('input[name="horario"]:checked.value');

const btnAddPessoa = document.getElementById('+qtt');

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formReservar");
    
    const btnReservar = document.getElementById("btn-reservar");
    const modal = document.getElementById("modalAbrir");
    const blurModal = document.querySelector(".blur-modal");

    
    btnReservar.addEventListener('click', function() {
        const dtReserva = document.querySelector('input[name="dia"]:checked')?.value;
        const hrReserva = document.querySelector('input[name="horaEscolhida"]:checked')?.getAttribute('value-horario');
    
        // Verifica se a data e hora estão definidas antes de abrir o modal
        if (!dtReserva || !hrReserva) {
            alert("Por favor, selecione uma data e uma hora antes de prosseguir com a reserva.");
            return; // Impede o modal de abrir se não houver data ou hora selecionada
        }
    
        modal.style.display = "flex";
    });
    
    
    window.addEventListener('click', function(event) {
        if (event.target === blurModal) {
            modal.style.display = "none";
        }
    });
    
    // bia - só permitir ir pra api se o checkbox estiver marcado
    const check = document.getElementById('termosReserva');
    const btnPagar = document.getElementById('btnPagar');
    const aviso = document.querySelector('.aviso');
    
    // aviso se ñ tiver o check como true
    function atualizarBotaoEAviso() {
        if (check.checked) {
            btnPagar.disabled = false;
            btnPagar.style.backgroundColor = '#0A9396';
            aviso.textContent = '';
        } 
        
        else {
            btnPagar.disabled = true;
            btnPagar.style.backgroundColor = '#3f6c6d';
            aviso.textContent = 'Você deve concordar com os termos se quiser prosseguir com a reserva!';
            aviso.style.color = '#ff4d4f';
            aviso.style.display = 'block';
        }
    }
    check.addEventListener('change', atualizarBotaoEAviso);
    
    const sucesso = document.getElementById('modalReservaFeita');
    const fechaModal = document.getElementById("fechaModal");
    
    if (fechaModal) {
        fechaModal.onclick = function() {
            sucesso.style.display = 'none';            
        }
    }

    sucesso.style.display = 'none'; // tira quando for fazer todo vai e volta da api

    btnPagar.addEventListener('click', async function(evento) {
        evento.preventDefault(); 
    
        if (!check.checked) {
            aviso.textContent = 'Você deve concordar com os termos se quiser prosseguir com a reserva!';
            aviso.style.color = '#ff4d4f';
            aviso.style.display = 'block';
        } else {
            aviso.style.display = 'none';
            
            const sucesso = document.getElementById('modalReservaFeita');
            
            function mudaModal() {
                if (modal) modal.style.display = 'none';
                if (sucesso) sucesso.style.display = 'flex';
            }
    
            const dtReserva = document.querySelector('input[name="dia"]:checked')?.value;
            const hrReserva = document.querySelector('input[name="horaEscolhida"]:checked')?.getAttribute('value-horario');
            const dsReserva = 'Ativa';
            const hrLembrete = null;
            const id = urlParams.get('id') || window.location.pathname.split('/').pop();
    
            let nmReservante = '';
            const reservaParaMim = document.getElementById('paraMim').checked;
            const nomeRespInput = document.getElementById('nomeResp');
            
            if (reservaParaMim) {
                nmReservante = 'Usuário Logado';
            } else {
                nmReservante = nomeRespInput.value || 'Outro responsável';
            }
    
            const dadosForm = {
                dtReserva,
                hrReserva,
                dsReserva,
                hrLembrete,
                nmReservante,
                id
            };
            
            const response = await fetch('/reservar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosForm)
            });
    
            if (response.ok) {
                const responseData = await response.json();
                window.location.href = responseData.redirectUrl;
            } else {
                console.error('Erro ao enviar a reserva:', response.statusText);
            }
        }
    });
    

    // CALENDÁRIO SEMANAL DE RESERVA
    const dataAtual = new Date();
    const semanaAtual = contadorSemana(dataAtual);
    
    function contadorSemana(d) {
        let semana = [];
        
        for (let i = 0; i < 7; i++) { // mudança para pegar o dia de hoje e o resto da semana a partir dele
            let dia = new Date(d);
            dia.setDate(d.getDate() + i); 
            semana.push(dia);
        }
        
        return semana;
    }
    
    function mostraSemana(semana) {
        let dias = '';
        const diasMes = document.querySelector(".dias");
        const nomesDias = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
        
        semana.forEach((dia, index) => {
            const diaSelecionado = dia.getDate() === new Date().getDate() &&
            dia.getMonth() === new Date().getMonth() &&
            dia.getFullYear() === new Date().getFullYear();
            
            const dataFormatada = `${String(dia.getDate()).padStart(2, '0')}/${String(dia.getMonth() + 1).padStart(2, '0')}/${dia.getFullYear()}`;
            
            dias += `
                        <div class="dia-container">
                            <input type="radio" name="dia" id="dia-${index}" value="${dataFormatada}">
                            <label for="dia-${index}" class="${diaSelecionado ? 'hoje' : ''}" id="estilo-selecionado">
                                <div class="estilo-dia">${nomesDias[dia.getDay()]}</div>
                                <div class="estilo-data">${dia.getDate()}</div>
                            </label>
                        </div>
                    `;
        });
        
        diasMes.innerHTML = dias;
        
        const radioButtons = document.querySelectorAll('input[name="dia"]');
        radioButtons.forEach((radio) => {
            radio.addEventListener('change', (event) => {
                console.log("Data selecionada:", event.target.value);
            });
        });
    }
    
    mostraSemana(semanaAtual);

    // Campo de nome caso a reserva seja para outra pessoa
    const reservaParaMim = document.getElementById('paraMim');
    const reservaParaOutraPessoa = document.getElementById('paraOutro');
    const nomeResponsavel = document.getElementById('nomeResp');
    
    document.querySelectorAll('input[name="opcaoNome"]').forEach((radio) => {
        radio.addEventListener('change', function() {
            if (reservaParaOutraPessoa.checked) {
                nomeResponsavel.style.display = 'flex';
            }

            else {
                nomeResponsavel.style.display = 'none';
            }
        })
    });

    const maxHorarios = 2;
    let horariosSelecionados = 0;
    
    const radiosHorarios = document.querySelectorAll('input[name="horaEscolhida"]');
    
    function verificarHorarios() {
        radiosHorarios.forEach(radio => {
            if (horariosSelecionados >= maxHorarios && !radio.checked) {
                radio.disabled = true;
            } 
            
            else {
                radio.disabled = false;
            }
        });
    }
    
    radiosHorarios.forEach(radio => {
        radio.addEventListener("change", function() {
            if (this.checked) {
                horariosSelecionados = 1; 
                const horario = this.getAttribute('value-horario');
                console.log(horario);
            }
            verificarHorarios();
        });
    });
    
    verificarHorarios();
});

document.addEventListener("DOMContentLoaded", function() {
    const spanQuantidade = document.getElementById('quantidade');
    const btnMenos = document.getElementById('menos');
    const btnMais = document.getElementById('mais');
    const modal = document.querySelector('.modalAviso');
    const fecharModal = document.getElementById('fecharModal');
    
    let quantidade = parseInt(spanQuantidade.textContent);
    
    btnMenos.addEventListener('click', function() {
        if (quantidade > 1) { 
            quantidade--;
            spanQuantidade.textContent = quantidade;
        }
    });
    
    btnMais.addEventListener('click', function() {
        if (quantidade < 8) {
            quantidade++;
            spanQuantidade.textContent = quantidade;
        }
        else {
            modal.style.display = 'flex';
        }
    });
    
    fecharModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(evento) {
        if (evento.target == modal) {
            modal.style.display = 'none';
        }
    });
});

const modalCamposVazios = document.querySelectorAll('.btnFechar');