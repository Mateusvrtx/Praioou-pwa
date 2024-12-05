async function selecionarBarraca(event) {
  const carrinhos = event.target.value;

  try {
    const response = await fetch('/RenderComanda', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cd_carrinho: carrinhos })
    });

    if (response.ok) {
      const comanda = await response.json();
      updatePedidos(comanda.detalhesPedido, comanda.totalPedidos, comanda.pedidosPendentes, comanda.pedidosEntregues);
    } else {
      alert('Erro ao renderizar comanda!');
    }

  } catch (error) {
    console.error('Erro na requisição:', error);
    alert('Erro ao enviar requisição!');
  }
}

async function cancelarPedido(cd_pedido) {
  try {
    const responsePedido = await fetch('/CancelarPedido', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cd_pedido: cd_pedido })
    });

    if (responsePedido.ok) {
      selecionarBarraca({ target: { value: document.getElementById('sltBarraca').value } });
    } else {
      alert('Erro ao cancelar pedido.');
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    alert('Erro ao enviar requisição!');
  }
}

async function entregarPedido(cd_pedido) {
  try {
    const responsePedido = await fetch('/EntregarPedido', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cd_pedido: cd_pedido })
    });

    if (responsePedido.ok) {
      
      selecionarBarraca({ target: { value: document.getElementById('sltBarraca').value } });
    } else {
      alert('Erro ao entregar pedido.');
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    alert('Erro ao enviar requisição!');
  }
}

function updatePedidos(detalhesPedido, totalPedidos, pedidosPendentes, pedidosEntregues) {
  const cardsContainer = document.querySelector('.cards');
  cardsContainer.innerHTML = '';

  detalhesPedido.forEach(pedido => {
    const card = document.createElement('div');
    card.classList.add('card');

    let dataPedido = new Date(pedido.dataPedido);
    let dataFormatada = dataPedido.toLocaleDateString('pt-BR');

    card.innerHTML = `
      <div class="ft"><h1>${pedido.cliente.nm_cliente.charAt(0).toUpperCase()}</h1></div>
      <h4>Horário: <strong>${pedido.horaPedido}</strong></h4>
      <h4>Data: <strong>${dataFormatada}</strong></h4>
      <h4>Pedido</h4>
      <ul class="detalhes">
        ${pedido.produtos.map(p => `<li>${p.nome}</li>`).join('')}
      </ul>

      <img src="/ambulante/comanda/assets/img/setaComanda.svg" class="setaComanda">

      <div class="modalComanda">
        <div class="blur"></div>
        <div class="CardModal">
          <h1 class="nomeModal">${pedido.cliente.nm_cliente}</h1>
          <h2>Data: <strong>${dataFormatada}</strong></h2>
          <h2>Horário: <strong>${pedido.horaPedido}</strong></h2>

          <h1 class="TTLpedido">Pedido</h1>

          <table>
            <tr>
              <th style="color: #515151; border: solid 0.2vw; border-left: none; border-top: none;">Produto</th>
              <th style="color: #515151; border-bottom: solid 0.2vw;">Qtd</th>
              <th style="color: #515151; border: solid 0.2vw; border-right: none; border-top: none;">Valor</th>
            </tr>
            ${pedido.produtos.map(p => `
              <tr>
                <td>${p.nome}</td> 
                <td style="border: solid 0.2vw; border-top: none; border-bottom: none;">${p.quantidade}</td>
                <td>R$ ${p.valorProduto.toFixed(2)}</td>
              </tr>
            `).join('')}
          </table>

          <h2>Valor total: <strong>R$${pedido.valorTotalPedido.toFixed(2)}</strong></h2>
          <h2>Forma Pagamento: <strong>${pedido.Pagamento}</strong></h2>
          <div style="display: flex; justify-content: space-between; margin-top: 4vw;">
            <button class="btnCancelar" data-id="${pedido.cdPedido}">Cancelar</button>

            <button class="btnEntregar" data-id="${pedido.cdPedido}">Entregar</button>
            </div>
            <img src="/ambulante/comanda/assets/img/corteComanda.svg" class="imgCorte">
            </div>
            </div>
            <div class="cancelar">
            <div class="blur"></div>
            <div class="modalCancelarr">
                <img src="/ambulante/comanda/assets/img/x.svg" id="fecharModalCancelar">
                <h2>Deseja Confirmar o cancelamento do pedido do  guarda sol X ?</h2>
                <h4>*essa ação não podera ser revertida!</h4>

                <button id="btnCancelarMotivo">Cancelar</button>
            </div>
        </div>

        <div class="modalCancelarMotivo">
            <div class="blur"></div>
            <div class="modalCancelarr" style="width: 95%; height: 70vw;">
                <img src="/ambulante/comanda/assets/img/x.svg" id="fecharModalMotivo">
                <h2>Qual o motivo do cancelamento?</h2>
            
                <div class="radios"> 
                    <div class="rds">
                        <input type="radio" name="motivo" id="motivo1">
                        <label for="motivo1">Não tenho algum ingrediente</label>
                    </div>

                    <div class="rds">
                        <input type="radio" name="motivo" id="motivo2">
                        <label for="motivo2">Não tenho mais esse produto</label>
                    </div>

                    <div class="rds">
                        <input type="radio" name="motivo" id="motivo3">
                        <label for="motivo3">Não tenho como fazer</label>
                    </div>

                    <div class="rds">
                        <input type="radio" name="motivo" id="motivo4">
                        <label for="motivo4">Outros</label>
                    </div>
                </div>

                <button id="CANCELAR" style="margin: 4vw 0 -2vw 0;">Cancelar</button>
            </div>
        </div>

        <section id="BodyModal">
        <div class="blur"></div>
        <div class="ModalPerConfi">
            <div class="Fechar"><p class="btnFechar">X</p></div>
            <h1>Deseja marcar esse pedido como pronto?</h1>
            <p>*Essa ação não poderá ser revertida</p>
            <div id="Confirmar">Confirmar</div>
        </div>
        </section>
    `;
            
    cardsContainer.appendChild(card);
  });

  const InfoComanda = document.getElementById('InfoComanda');
  
  InfoComanda.innerHTML = ''
  InfoComanda.innerHTML = `
    <div class="stts">
          <div class="status">
              <h3 style="color: #AE2012;">Pendentes: <strong>${pedidosPendentes}</strong></h3>
          </div>

          <div class="status">
              <h3 style="color: #00404A;">Entregues: <strong>${pedidosEntregues}</strong></h3>
          </div>
      </div>

      <div class="stts2">
          <input type="date" id="data">

          <div><h3>Pedidos totais: ${totalPedidos}</h3></div>
      </div>
  `;

  
  document.querySelectorAll('.setaComanda').forEach(seta => {
    seta.addEventListener('click', function () {
      const modal = this.nextElementSibling; // Seleciona o modal correspondente
      if (modal && modal.classList.contains('modalComanda')) {
        modal.style.display = 'block'; // Mostra o modal
  
        // Adiciona o evento ao blur para fechar o modal
        const blur = modal.querySelector('.blur');
        if (blur) {
          blur.addEventListener('click', () => {
            modal.style.display = 'none'; // Fecha o modal
          });
        }
      }
    });   

    if (detalhesPedido.length === 0) {
      cardsContainer.innerHTML = `
          <div class="comanda-vazia">
              <h2>Você não tem nenhum pedido em aberto no momento, quando você receber algum pedido ele aparecera aqui</h2>
              <img src="/ambulante/comanda/assets/img/ComandaVazia.svg" id="fecharModalMotivo">
          </div>
      `;
      return; 
  }});

  document.querySelectorAll('.btnCancelar').forEach(btnCancelar => {
    btnCancelar.addEventListener('click', function() {
      const card = this.closest('.card');
      const modalCancelar = card.querySelector('.cancelar');
      const fecharModal = modalCancelar.querySelector('#fecharModalCancelar');
  
      if (modalCancelar) {
        modalCancelar.style.display = 'block';
  
        fecharModal.onclick = function() {
          modalCancelar.style.display = 'none';
        };
  
        const btnModalMotivo = modalCancelar.querySelector('#btnCancelarMotivo');
        const modalMotivo = card.querySelector('.modalCancelarMotivo');
  
        btnModalMotivo.onclick = function() {
          modalMotivo.style.display = 'block';
          modalCancelar.style.display = 'none';
  
          const btnFecharMotivo = modalMotivo.querySelector('#fecharModalMotivo');
  
          btnFecharMotivo.onclick = function() {
            modalMotivo.style.display = 'none';
          };
        };
  
        const btnCANCELAR = modalMotivo.querySelector('#CANCELAR');
  
        btnCANCELAR.onclick = function() {
          const cd_pedido = btnCancelar.getAttribute('data-id');
          cancelarPedido(cd_pedido);
        };
      }
    });
  });
  
  
  document.querySelectorAll('.btnEntregar').forEach(btnEntregar => {
    btnEntregar.addEventListener('click', function() {
      const cd_pedido = btnEntregar.getAttribute('data-id');
  
      const modalPer = document.getElementById("BodyModal");
      modalPer.style.display = "flex";
  
      const btnfechar = document.getElementsByClassName("btnFechar")[0];
      btnfechar.onclick = function() {
        modalPer.style.display = "none";
      };
  
      const btnConfirmar = document.getElementById("Confirmar");
      btnConfirmar.onclick = async function() {
        modalPer.style.display = "none";
  
        await entregarPedido(cd_pedido);
  
        const modalConf = document.getElementById("BodyModalConf");
        modalConf.style.display = "flex";
  
        const btnFecharConf = document.getElementsByClassName("btnConfiFechar")[0];
        btnFecharConf.onclick = function() {
          modalConf.style.display = "none";
        };
  
        window.onclick = function(event) {
          if (event.target == modalConf) {
            modalConf.style.display = "none";
          }
        };
      };
  
      window.onclick = function(event) {
        if (event.target == modalPer) {
          modalPer.style.display = "none";
        }
      };
    });
  });  
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('sltBarraca').addEventListener('change', selecionarBarraca);
});

/*Modal pergunta confirmacao*/ 

var modalPer = document.getElementById("BodyModal");

var btnAbrir = document.getElementById("setaComanda1");

var btnfechar = document.getElementsByClassName("btnFechar")[0];

btnAbrir.onclick = function() {
    modalPer.style.display = "flex";
}

btnfechar.onclick = function() {
    modalPer.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modalPer) {
    modalPer.style.display = "none";
  }
}

/*Modal confirmado*/

var modalConf = document.getElementById("BodyModalConf");

var Abrir = document.getElementById("Confirmar");

var Fechar = document.getElementsByClassName("btnConfiFechar")[0];

Abrir.onclick = function() {
    modalConf.style.display = "flex";
    modalPer.style.display = "none";
}

Fechar.onclick = function() {
    modalConf.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modalConf) {
    modalConf.style.display = "none";
  }
}

/*const setaP1 = document.getElementById('setaP1')
const setaP2 = document.getElementById('setaP2')
const setaP3 = document.getElementById('setaP3')
const setaP4 = document.getElementById('setaP4')
const setaP5 = document.getElementById('setaP5')

const Passo1 = document.getElementById('Passo1')
const Passo2 = document.getElementById('Passo2')
const Passo3 = document.getElementById('Passo3')
const Passo4 = document.getElementById('Passo4')
const Passo5 = document.getElementById('Passo5')
const Passo6 = document.getElementById('Passo6')

const nav = document.getElementById('navbar')
const select = document.getElementById('slcTutorial')
const pss3 = document.querySelector('.Pss2')
const cardTutorial = document.querySelector('.cardsTutorial')
const cardClube = document.getElementById('cardClubeTutorial')
const fecharTutorial = document.getElementById('FecharTutorial')

setaP1.onclick = function() {
  Passo1.style.display = 'none'
  Passo2.style.display = 'block'

  nav.style.zIndex = '4'
  select.style.zIndex = '5'

}

setaP2.onclick = function() {
  Passo2.style.display = 'none'
  Passo3.style.display = 'block'

  select.style.zIndex = '4'
  pss3.style.zIndex = '5'
}

setaP3.onclick = function() {
  Passo3.style.display = 'none'
  Passo4.style.display = 'block'

  pss3.style.zIndex = '4'
  cardTutorial.style.zIndex = '5'
}

const setaComanda1 = document.getElementById('setaComanda1')
const setaComanda2 = document.getElementById('setaComanda2')

const modalComanda1 = document.getElementById('ModalComanda1')
const modalComanda2 = document.getElementById('ModalComanda2')

setaComanda1.onclick = function() {
  Passo4.style.display = 'none'
  Passo5.style.display = 'block'

  cardTutorial.style.zIndex = '5'
  modalComanda1.style.display = 'block'
  
  const btnFechar = document.querySelectorAll('.btnCencelar')
  
  btnFechar.onclick = function() {
    modalComanda1.style.display = 'none'
  }
}

setaP4.onclick = function() {
  Passo4.style.display = 'none'
  Passo5.style.display = 'block'

  cardTutorial.style.zIndex = '4'
  modalComanda1.style.display = 'block'
  
  const btnFechar = document.querySelectorAll('.btnCencelar')
  
  btnFechar.onclick = function() {
    modalComanda1.style.display = 'none'
  }
}

setaP5.onclick = function() {
  Passo5.style.display = 'none'
  Passo6.style.display = 'block'

  modalComanda1.style.display = 'none'
  cardClube.style.display = 'flex'
  cardClube.style.zIndex = '5'
}

fecharTutorial.onclick = function() {
  Passo6.style.display = 'none'
  cardClube.style.display = 'none'
} */