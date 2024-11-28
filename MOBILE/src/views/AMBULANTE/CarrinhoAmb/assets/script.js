let count = 1;
document.getElementById("radio1").checked = true;

setInterval( function(){
    nextImage();
}, 5000)

function nextImage(){
    count++;
    if(count>4){
        count = 1;
    }

    document.getElementById("radio"+count).checked = true;
}


// const VagaCarrinho = document.getElementById('vagaDecid');
// const texto = document.querySelector('.texto');

// VagaCarrinho.addEventListener('change', function() {
//     if (VagaCarrinho.checked) {
//         texto.textContent = 'Com Vaga';
//     } else {
//         texto.textContent = 'Sem Vaga';
//     }
// });

// Bianca - modal de Conjuntos
const modalConjuntos = document.getElementById('modalConjuntos');
const abreConjuntos = document.getElementById('abreConjuntos');
const fechaConjuntos = document.getElementById('fechaConjuntos');

const salvarConjuntos = document.getElementById('salvarConjuntos'); // Botão de salvar os conjuntos

salvarConjuntos.onclick = function() {
    modalConjuntos.style.display = 'none';
    modalEsclarecimento.style.display = 'none';
}

abreConjuntos.onclick = function() {
    modalConjuntos.style.display = 'flex';
}

fechaConjuntos.onclick = function() {
    modalConjuntos.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target === modalConjuntos) {
        modalConjuntos.style.display = 'none';
    }

    else if (event.target === modalEsclarecimento) {
        modalEsclarecimento.style.display = 'none'
    }
}

const conjuntos = document.getElementById('conjuntosDisponiveis');

for (let c = 1; c <= 16; c++) {
    const conjunto = document.createElement('input');
    conjunto.type = 'checkbox';
    conjunto.name = 'equipamento'
    conjunto.classList.add('equipamento');
    conjunto.id = `conjunto ${c}`;

    const label = document.createElement('label');
    label.setAttribute('for', conjunto.id);

    const img = document.createElement('img');
    img.src = `/ambulante/CarrinhoAmb/assets/img/conjuntos.png`; //oh glória
    img.alt = `Conjunto número${c}`;

    label.appendChild(conjunto);
    label.appendChild(img);

    conjunto.addEventListener('change', function() {
        if (conjunto.checked) {
            console.log(`Conjunto ${c} indisponível`);
        }
        else {
            console.log(`Conjunto ${c} disponível`);            
        }
    });

    conjuntos.appendChild(label);
}

const modalEsclarecimento = document.getElementById('modalEsclarecimento');
const abreEsclarecimento = document.getElementById('abreEsclarecimento');
const fechaEsclarecimento = document.getElementById('fechaEsclarecimento');

abreEsclarecimento.onclick= function() {
    modalEsclarecimento.style.display = 'flex';
}

fechaEsclarecimento.onclick = function() {
    modalEsclarecimento.style.display= 'none';
}