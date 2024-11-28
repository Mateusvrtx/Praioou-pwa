const dataAtual = new Date();
const semanaAtual = contadorSemana(dataAtual);

function contadorSemana(d) {
    let semana = [];
    
    for (let i = 0; i < 7; i++) {
        let dia = new Date(d);
        dia.setDate(d.getDate() + i); 
        semana.push(dia);
    }
    
    return semana;
}

function mostraSemana(semana) {
    let dias = '';
    const diasMes = document.querySelector(".dias");
    const nomesDias = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    const nomesMeses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    
    const hoje = new Date();

    semana.forEach((dia, index) => {
        const diaSelecionado = dia.getDate() === hoje.getDate() &&
                               dia.getMonth() === hoje.getMonth() &&
                               dia.getFullYear() === hoje.getFullYear();
        
        const dataFormatada = `${String(dia.getDate()).padStart(2, '0')}/${String(dia.getMonth() + 1).padStart(2, '0')}/${dia.getFullYear()}`;
        
        dias += `
            <div class="dia-container ${diaSelecionado ? 'hoje' : ''}">
                <input type="radio" name="dia" id="dia-${index}" value="${dataFormatada}">
                <label for="dia-${index}">
                    <div class="estilo-dia">${nomesDias[dia.getDay()]}</div>
                    <div class="estilo-data">${dia.getDate()}</div>
                    <div class="estilo-mes">${nomesMeses[dia.getMonth()]}</div>
                </label>
            </div>
        `;
    });
    
    diasMes.innerHTML = dias;

    const diaHoje = document.querySelector('.dia-container.hoje input[type="radio"]');
    if (diaHoje) {
        diaHoje.checked = true;
    }
    
    const radioButtons = document.querySelectorAll('input[name="dia"]');
    radioButtons.forEach((radio) => {
        radio.addEventListener('change', (event) => {
            document.querySelectorAll('.dia-container').forEach(container => {
                container.classList.remove('selecionado');
            });

            const containerSelecionado = event.target.closest('.dia-container');
            if (containerSelecionado) {
                containerSelecionado.classList.add('selecionado');
            }

            console.log("Data selecionada:", event.target.value);
            selecionarCarrinho();
        });
    });
}

mostraSemana(semanaAtual);

const selectBarraca = document.getElementById('sltBarraca');
selectBarraca.addEventListener('change', selecionarCarrinho);

async function selecionarCarrinho() {
    const carrinhos = selectBarraca.value;

    const diaSelecionado = document.querySelector('input[name="dia"]:checked');
    const data = diaSelecionado ? diaSelecionado.value : null; 
    
    try {
        const response = await fetch('/CarregarReservas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ carrinho: carrinhos, data: data })
        });

        if (response.ok) {
            const reservas = await response.json();
            console.log('Reservas:', reservas);
            exibirReservas(reservas);
        } else {
            alert('Erro ao renderizar reservas!');
        }
    } catch (error) {
    }
}

function exibirReservas(reservas) {
  const sectionReservas = document.querySelector('.reservas');
  const fundoModal = document.getElementById('FundoModal');
  const fecharModal = fundoModal.querySelector('.fechar');

  sectionReservas.innerHTML = '';

  if (Object.keys(reservas).length === 0) {
      sectionReservas.innerHTML = '<p class="SemR">Sem reservas por enquanto</p>';
      return;
  }

  const reservasPorHora = {};

  for (const hrReserva in reservas) {
      reservasPorHora[hrReserva] = reservas[hrReserva];
  }

  for (const hr in reservasPorHora) {
      const horaDiv = document.createElement('div');
      horaDiv.classList.add('horaReserva');
      horaDiv.innerHTML = `<p class="hrs">${hr}</p><hr>`;
      
      const listaReservas = document.createElement('div');
      listaReservas.classList.add('listaReservas');

      reservasPorHora[hr].forEach(reserva => {
          const reservaItem = document.createElement('div');
          reservaItem.classList.add('reserva');
      
          const situacaoClasse = reserva.descricaoReserva === "Cancelada" ? 'cancelada' : 'ativa';
      
          reservaItem.innerHTML = `
              <div class="ajus">
                  <img src="ambulante/ReservaCad/assets/img/Cadeira.png" alt="Cadeira de sol" class="imgCadeira">
                  <p>${reserva.nomeReservante}</p>
                  <button class="situacao ${situacaoClasse}" data-reserva='${JSON.stringify(reserva)}'>${reserva.descricaoReserva}</button>
                  <img src="ambulante/ReservaCad/assets/img/arrow.png" alt="" class="imgSeta">
              </div>
          `;
      
          listaReservas.appendChild(reservaItem);
      });      

      horaDiv.appendChild(listaReservas);
      sectionReservas.appendChild(horaDiv);
  }

  const situacaoButtons = sectionReservas.querySelectorAll('.situacao');
  situacaoButtons.forEach(button => {
      button.addEventListener('click', function() {
          const reservaDetalhes = JSON.parse(this.dataset.reserva);

          if (reservaDetalhes.descricaoReserva === "Cancelada") {
              abrirModalCancelado();
          } else {
              abrirModal(reservaDetalhes);
          }
      });
  });

  fecharModal.addEventListener('click', function() {
      fundoModal.style.display = 'none';
  });
}

function abrirModalCancelado() {
  const modalCancelado = document.getElementById('modalCancelado');
  modalCancelado.style.display = 'block';

  const fecharCancelado = modalCancelado.querySelector('.fecharC');
  fecharCancelado.addEventListener('click', function() {
      modalCancelado.style.display = 'none';
  });
}

document.addEventListener('click', function(event) {
  const fundoModal = document.getElementById('FundoModal');
  const modalCancelado = document.getElementById('modalCancelado');

  if (event.target === fundoModal) {
      fundoModal.style.display = 'none';
  }

  if (event.target === modalCancelado) {
      modalCancelado.style.display = 'none';
  }
});

function abrirModal(reserva) {
    const fundoModal = document.getElementById('FundoModal');
    fundoModal.style.display = 'flex';

    fundoModal.innerHTML = `
    <section class="modal">
    
    <div class="ajusteHeader">
        <div class="header-content">
                <div class="img">
                    <img src="ambulante/ReservaCad/assets/img/Cadeira.png" class="cad">
                    <h3>Reserva Ativa</h3>
                </div>
                <span class="fechar">&times;</span>
            </div>
        </div>

        <div class="ajusteInfo">
            <div class="info-section">
                <p class="NMTTL">Nome do reservante:</p>
                <p class="PRB">${reserva.nomeReservante}</p>
            </div>
        </div>

        <hr>

        <div class="ajusteInfoGeral">
            <div class="info-section">
                <p class="PRT">Descrição Reserva:</p>
                <p class="DT">${reserva.descricaoReserva}</p>
            </div>
            <div class="info-section">
                <p class="PR">Horário da reserva:</p>
                <p class="PRB">${reserva.hrReserva}</p>
            </div>
            <div class="info-section">
                <p class="PR">Valor da reserva:</p>
                <p class="PRB">R$ ${reserva.valorReserva.toFixed(2)}</p>
            </div>
        </div>

        <hr class="separator">

        <div class="btns">
            <div class="cancelar">Cancelar</div>
            <div class="concluida">Concluída</div>
        </div>
    </section>
    `;

    const fecharModal = fundoModal.querySelector('.fechar');
    fecharModal.addEventListener('click', function() {
        fundoModal.style.display = 'none';
    });
}

document.addEventListener('click', function(event) {
    const fundoModal = document.getElementById('FundoModal');
    if (event.target === fundoModal) {
        fundoModal.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', function() {
});
