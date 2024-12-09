/*Modal */

const modal = document.getElementById("modalBk");
const openModal = document.getElementById("filtro");
const closeModal = document.getElementById("btnL");

// Abrir o modal
openModal.addEventListener("click", () => {
	modal.style.display = "flex";
	document.body.classList.add("no-scroll"); // Desabilita o scroll
});

// Fechar o modal
closeModal.addEventListener("click", () => {
	modal.style.display = "none";
	document.body.classList.remove("no-scroll"); // Reabilita o scroll
});

// Fechar o modal clicando fora dele
window.addEventListener("click", (event) => {
	if (event.target === modal) {
		modal.style.display = "none";
	}
});

// Atualizar ao carregar a página
// updateSlider();

document.querySelectorAll('.Radios input[type="radio"]').forEach((radio) => {
	radio.addEventListener("change", function () {
		// Remove a classe "active" de todos os labels
		document
		.querySelectorAll(".Radios")
		.forEach((label) => label.classList.remove("active"));
		
		// Adiciona a classe "active" ao label correspondente ao input selecionado
		if (this.checked) {
			this.parentElement.classList.add("active");
		}
	});
});

const iconAddLembrete = document.querySelectorAll(".iconNot"); // ícone de sininho
const btnAddLembrete = document.getElementById("addLembrete");
btnAddLembrete.disabled = true; // Desativa o botão inicialmente

const etapaLembrete = document.getElementById("modalAddLembrete"); // puxa o blur de fundo para os dois modais

/* Modais */
const modalAddLembrete = document.querySelector(".lembrete");
const modalOkLembrete = document.querySelector(".lembreteConfirmado");

const modaisLembrete = document.querySelectorAll(".lembrete, .lembreteConfirmado, .cancelar, .verReserva");

iconAddLembrete.forEach((icon, index) => {
    icon.addEventListener("click", function () {
        etapaLembrete.style.display = "flex";
        modalAddLembrete.style.display = "flex";
        modalOkLembrete.style.display = "none";

        etapaLembrete.dataset.reservaIndex = index;
        btnAddLembrete.disabled = true; // Inicialmente desativa o botão
    });
});

btnAddLembrete.addEventListener("click", function () {
    modalAddLembrete.style.display = "none";
    modalOkLembrete.style.display = "flex";

    // Alterar o ícone apenas para a reserva correspondente
    const reservaIndex = etapaLembrete.dataset.reservaIndex;
    if (reservaIndex !== undefined) {
        iconAddLembrete[reservaIndex].src = "/banhista/suasReservas/assets/img/notificacao_colorido.png";
    }
});

document.querySelectorAll(".iconFechar").forEach((icon) => {
	icon.addEventListener("click", function () {
		etapaLembrete.style.display = "none";
		modaisLembrete.forEach((modal) => {
			modal.style.display = "none";
		});
	});
});


const opcHora = document.querySelectorAll('.inputHR');

opcHora.forEach(tempo => {
	tempo.addEventListener('change', function () {
		// Remove estilos de todas as labels
		document.querySelectorAll('.label').forEach(label => {
			label.style.backgroundColor = '';
			label.style.color = '';
		});

		// Estiliza a label correspondente ao input selecionado
		const tempoLembrete = document.querySelector(`label[for="${tempo.id}"]`);
		if (tempoLembrete) {
			tempoLembrete.style.backgroundColor = '#00404A';
			tempoLembrete.style.color = 'white';
		}

		// Ativa o botão de adicionar lembrete
		btnAddLembrete.disabled = false;
	});
});

const lembreteBtnVoltar = document.getElementById('btnVoltar');

// lembreteBtnVoltar.addEventListener('click', function() {
// 	etapaLembrete.style.display = 'none';
// })

const btnCancelar = document.querySelectorAll('[data-cancelar]');
const modalCancelar = document.querySelector('.cancelar');
const btnCancelarReserva = document.querySelector('#btnCancelarReserva');

// modais
const reservaCanceladaConfirmada = document.querySelector('.reservaCanceladaConfirmada');
const cancelarReserva = document.querySelector('.cancelarReserva');

btnCancelar.forEach((btn) => {
    btn.addEventListener('click', function () {
        modalCancelar.style.display = 'flex';
        cancelarReserva.style.display = 'flex';
        reservaCanceladaConfirmada.style.display = 'none';
    });
});

btnCancelarReserva.addEventListener('click', function() {
	reservaCanceladaConfirmada.style.display = 'flex';
	cancelarReserva.style.display = 'none';
})

document.querySelectorAll(".btnVoltar").forEach((voltar) => {
	voltar.addEventListener('click', function() {
		etapaLembrete.style.display = 'none';
		modalCancelar.style.display = 'none';
	})
})

const btnVerReserva = document.querySelectorAll('[data-reserva]');
const verReserva = document.querySelector('.verReserva');
// modais
const reciboReserva = document.querySelector('.reciboReserva');
const modalTempoExtra = document.querySelector('.modalTempoExtra');

btnVerReserva.forEach((reserva) => {
	reserva.addEventListener('click', function() {
		verReserva.style.display = 'flex';
		reciboReserva.style.display = 'flex';
		modalTempoExtra.style.display = 'none';
	})
})

const btnComprarTempoExtra = document.getElementById('btnComprarTempoExtra');

btnComprarTempoExtra.addEventListener('click', function() {
	reciboReserva.style.display = 'none';
	modalTempoExtra.style.display = 'flex';
})

const opcTempoExtra = document.querySelectorAll('.inputHR');
const btnComprar = document.querySelector('.btnComprar');
const valorTempo = document.querySelector('.vlTempo');
let tempoSelecionado = null;

opcTempoExtra.forEach((tempo) => {
    tempo.addEventListener('change', function () {
        document.querySelectorAll('.label').forEach(label => {
            label.style.backgroundColor = '';
            label.style.color = '';
        });

        const labelSelecionada = document.querySelector(`label[for="${tempo.id}"]`);
        if (labelSelecionada) {
            labelSelecionada.style.backgroundColor = '#00404A';
            labelSelecionada.style.color = 'white';
        }

        tempoSelecionado = tempo.value;
        btnComprar.disabled = false;

        const precoPorMinuto = 0.50;
        const precoTotal = (parseInt(tempoSelecionado) * precoPorMinuto).toFixed(2);
        valorTempo.textContent = `R$ ${precoTotal}`;
    });
});

btnComprar.addEventListener('click', function () {
    if (tempoSelecionado) {
        alert(`Você escolheu comprar ${tempoSelecionado} minutos!`);
    }
});

// dark mode

document.addEventListener('DOMContentLoaded', () => {
    // Verifica a preferência armazenada no localStorage
    const darkMode = localStorage.getItem('darkMode') === 'true';

    if (darkMode) {
        document.body.classList.add('dark');
        document.body.classList.remove('light');
        updateImages(true);
    } else {
        document.body.classList.add('light');
        document.body.classList.remove('dark');
        updateImages(false);
    }
});
