// Evento para recarregar a página clicando na logo do praioou
document.getElementById('logo_praioou').addEventListener('click', function() {
    window.location.reload();
});

// Inicializa o mapa e configura o visual
var map = L.map('map').setView([-23.96999, -46.33900], 15);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    opacity: 1
}).addTo(map);

// Define ícones personalizados
var userGeoLocalizacao = L.icon({
    iconUrl: 'banhista/mapa/assets/img/localizacaoUsuario.png',
    iconSize: [60, 60],
    iconAnchor: [30, 60]
});

var iconeChuveiro = L.icon({
    iconUrl: 'banhista/mapa/assets/img/chuveirinho.png',
    iconSize: [50, 50],
    iconAnchor: [25, 50]
});

var iconeBanheiro = L.icon({
    iconUrl: 'banhista/mapa/assets/img/banheiro2.png',
    iconSize: [50, 50],
    iconAnchor: [25, 50]
});

var iconeChuveiroFocado = L.icon({
    iconUrl: 'banhista/mapa/assets/img/chuveirinho_focado.png',
    iconSize: [60, 60],
    iconAnchor: [30, 60]
});

var iconeBanheiroFocado = L.icon({
    iconUrl: 'banhista/mapa/assets/img/banheiro2_focado.png',
    iconSize: [60, 60],
    iconAnchor: [30, 60]
});

// Define pontos de interesse
var Pontos = [
    {
        index: 1,
        name: "Posto de Bombeiro e banheiro 1",
        lat: -23.968932,
        lng: -46.351398,
        icon: iconeBanheiro,
        focusedIcon: iconeBanheiroFocado,
        type: "banheiro",
        image: 'banhista/mapa/assets/img/fotos/banheiro_posto_04.jpg'
    },
    {
        index: 2,
        name: "Chuveirinho 4",
        lat: -23.968899,
        lng: -46.351000,
        icon: iconeChuveiro,
        focusedIcon: iconeChuveiroFocado,
        type: "chuveirinho",
        image: 'banhista/mapa/assets/img/fotos/chuveirinho_4.jpg'
    },
    {
        index: 3,
        name: "Chuveirinho 5",
        lat: -23.968742,
        lng: -46.349491,
        icon: iconeChuveiro,
        focusedIcon: iconeChuveiroFocado,
        type: "chuveirinho",
        image: ''
    },
    {
        index: 4,
        name: "Chuveirinho 6",
        lat: -23.968400,
        lng: -46.348121,
        icon: iconeChuveiro,
        focusedIcon: iconeChuveiroFocado,
        type: "chuveirinho",
        image: 'banhista/mapa/assets/img/fotos/chuveirinho_6.jpg'
    },
    {
        index: 5,
        name: "Chuveirinho 7",
        lat: -23.968400,
        lng: -46.346987,
        icon: iconeChuveiro,
        focusedIcon: iconeChuveiroFocado,
        type: "chuveirinho",
        image: 'banhista/mapa/assets/img/fotos/chuveirinho_7.jpg'
    },
    {
        index: 6,
        name: "Chuveirinho 8",
        lat: -23.968400,
        lng: -46.346548,
        icon: iconeChuveiro,
        focusedIcon: iconeChuveiroFocado,
        type: "chuveirinho",
        image: 'banhista/mapa/assets/img/fotos/chuveirinho_8.jpg'
    },   
    {
        index: 7,
        name: "Banheiro 2",
        lat: -23.968334,
        lng: -46.345471,
        icon: iconeBanheiro,
        focusedIcon: iconeBanheiroFocado,
        type: "banheiro",
        image: 'banhista/mapa/assets/img/fotos/banheiro_02.jpg'
    },
    {
        index: 8, 
        name: "Chuveirinho 9",
        lat: -23.968339,
        lng: -46.345023,
        icon: iconeChuveiro,
        focusedIcon: iconeChuveiroFocado,
        type: "chuveirinho",
        image: 'banhista/mapa/assets/img/fotos/chuveirinho_9.jpg'
    },
    {
        index: 9,
        name: "Chuveirinho 10",
        lat: -23.968514,
        lng: -46.343508,
        icon: iconeChuveiro,
        focusedIcon: iconeChuveiroFocado,
        type: "chuveirinho",
        image: 'banhista/mapa/assets/img/fotos/chuveirinho_10.jpg'
    },
    {
        index: 10,
        name: "Chuveirinho 11",
        lat: -23.968600,
        lng: -46.342693,
        icon: iconeChuveiro,
        focusedIcon: iconeChuveiroFocado,
        type: "chuveirinho",
        image: 'banhista/mapa/assets/img/fotos/chuveirinho_11.jpg'
    },
    {
        index: 11,
        name: "Banheiro 3",
        lat: -23.968545,
        lng: -46.342303,
        icon: iconeBanheiro,
        focusedIcon: iconeBanheiroFocado,
        type: "banheiro",
        image: 'banhista/mapa/assets/img/fotos/banheiro_posto_04.jpg'
    },
    {
        index: 12, 
        name: "Chuveirinho 12",
        lat: -23.968700,
        lng: -46.340416,
        icon: iconeChuveiro,
        focusedIcon: iconeChuveiroFocado,
        type: "chuveirinho",
        image: 'banhista/mapa/assets/img/fotos/chuveirinho_12.jpg'
    },
    {
        index: 13,
        name: "Chuveirinho 13",
        lat: -23.968830,
        lng: -46.339922,
        icon: iconeChuveiro,
        focusedIcon: iconeChuveiroFocado,
        type: "chuveirinho",
        image: 'banhista/mapa/assets/img/fotos/chuveirinho_13.jpg'
    },
    {
        index: 14,
        name: "Banheiro 4", // banheiro quiosque
        lat: -23.968817,
        lng: -46.339527,
        icon: iconeBanheiro,
        focusedIcon: iconeBanheiroFocado,
        type: "banheiro",
        image: 'banhista/mapa/assets/img/fotos/banheiro_03.jpg'
    }, 
    {
        index: 15,
        name: "Banheiro 5",
        lat: -23.968749,
        lng: -46.338960,
        icon: iconeBanheiro,
        focusedIcon: iconeBanheiroFocado,
        type: "banheiro",
        image: 'banhista/mapa/assets/img/fotos/banheiro_02.jpg'
    },
    {
        index: 16,
        name: "Chuveirinho 14",
        lat: -23.969035,
        lng: -46.338485,
        icon: iconeChuveiro,
        focusedIcon: iconeChuveiroFocado,
        type: "chuveirinho",
        image: 'banhista/mapa/assets/img/fotos/chuveirinho_14.jpg'
    },
    {
        index: 17,
        name: "Chuveirinho 15",
        lat: -23.968976,
        lng: -46.337545,
        icon: iconeChuveiro,
        focusedIcon: iconeChuveiroFocado,
        type: "chuveirinho",
        image: 'banhista/mapa/assets/img/fotos/chuveirinho_15.jpg'
    },
    {
        index: 18,
        name: "Chuveirinho 16",
        lat: -23.969200,
        lng: -46.336898,
        icon: iconeChuveiro,
        focusedIcon: iconeChuveiroFocado,
        type: "chuveirinho",
        image: 'banhista/mapa/assets/img/fotos/chuveirinho_16.jpg'
    },
    {
        index: 19,
        name: "Chuveirinho 17",
        lat: -23.969400,
        lng: -46.335357,
        icon: iconeChuveiro,
        focusedIcon: iconeChuveiroFocado,
        type: "chuveirinho",
        image: 'banhista/mapa/assets/img/fotos/chuveirinho_17.jpg'
    },
    {
        index: 20,
        name: "Chuveirinho 18",
        lat: -23.969500,
        lng: -46.334719,
        icon: iconeChuveiro,
        focusedIcon: iconeChuveiroFocado,
        type: "chuveirinho",
        image: 'banhista/mapa/assets/img/fotos/chuveirinho_18.jpg'
    },
    {
        index: 21,
        name: "Banheiro 5", //banheiro posto 1 🥲
        lat: -23.969700,
        lng: -46.334402,
        icon: iconeBanheiro,
        focusedIcon: iconeBanheiroFocado,
        type: "banheiro",
        image: 'banhista/mapa/assets/img/fotos/banheiro_posto_bombeiro.jpg'
    },
    {
        index: 22,
        name: "Chuveirinho 19",
        lat: -23.970157,
        lng: -46.332289,
        icon: iconeChuveiro,
        focusedIcon: iconeChuveiroFocado,
        type: "chuveirinho",
        image: 'banhista/mapa/assets/img/fotos/chuveirinho_19.jpg'
    },
    {
        index: 23,
        name: "Chuveirinho 20",
        lat: -23.970300,
        lng: -46.331694,
        icon: iconeChuveiro,
        focusedIcon: iconeChuveiroFocado,
        type: "chuveirinho",
        image: 'banhista/mapa/assets/img/fotos/chuveirinho_20.jpg'
    },
];

// Configura variáveis
let pontosFocados = null;
let userMarcador = null;
let userLat = null;
let userLng = null;

// Cria marcadores e adiciona evento de clique
Pontos.forEach(function(ponto, index) {
    ponto.index = index;
    ponto.marker = L.marker([ponto.lat, ponto.lng], {icon: ponto.icon}).addTo(map);
    
    ponto.marker.on('click', function() {
        console.log(`Marcador ${ponto.name} clicado`);
        if (pontosFocados) {
            pontosFocados.setIcon(pontosFocados.iconeOriginal);
        }
        ponto.marker.setIcon(ponto.focusedIcon);
        pontosFocados = ponto.marker;
        pontosFocados.iconeOriginal = ponto.icon;
        
        Carrossel(ponto.index); 
    });
});

// Função para geolocalização e foco
async function focusMakersAndShowList(type) {
    try {
        await geolocalizacaoUser();
        aplicarFoco(type);
        mostrarListaFiltrada(type);
        
        const carrossel = document.getElementById('carrossel');
        if (carrossel) {
            carrossel.classList.add('carrossel-mover');
        }
    } catch (error) {
        console.error('Erro ao obter a geolocalização:', error);
        const listaFiltrada = document.getElementById('lista-filtrada');
        if (listaFiltrada) {
            listaFiltrada.innerHTML = `<li>Não foi possível identificar o ${type} mais próximo pois a localização está desativada.</li>`;
        }
    }
}

// Adiciona eventos aos botões
document.getElementById('btn_chuveirinhos').addEventListener('click', () => focusMakersAndShowList('chuveirinho'));
document.getElementById('btn_banheiros').addEventListener('click', () => focusMakersAndShowList('banheiro'));

// Aplica foco no ponto mais próximo
function aplicarFoco(type) {
    let pontoProximo = null;
    let minDistancia = Infinity;
    
    Pontos.forEach(function(ponto) {
        if (ponto.type === type) {
            const distancia = calcDistancia(userLat, userLng, ponto.lat, ponto.lng);
            if (distancia < minDistancia) {
                minDistancia = distancia;
                pontoProximo = ponto;
            }
            ponto.marker.setIcon(ponto.icon);
        } else {
            ponto.marker.setIcon(ponto.icon);
        }
    });
    
    if (pontoProximo) {
        pontoProximo.marker.setIcon(pontoProximo.focusedIcon);
        map.setView([pontoProximo.lat, pontoProximo.lng], 18);
    }
}

// Função para destacar o ponto no mapa
function focarPontoNoMapa(index) {
    const ponto = Pontos.find(p => p.index === index);
    if (ponto) {
        map.setView([ponto.lat, ponto.lng], 18); // Ajusta o zoom conforme necessário
        ponto.marker.setIcon(ponto.focusedIcon); // Define o ícone focado
        if (pontosFocados && pontosFocados !== ponto.marker) {
            pontosFocados.setIcon(pontosFocados.iconeOriginal); // Restaura o ícone original do ponto anterior
        }
        pontosFocados = ponto.marker; // Atualiza o ponto focado
    }
}

// Calcula distância entre dois pontos
function calcDistancia(lat1, lng1, lat2, lng2) {
    const Raio = 6371e3; // Raio da Terra em metros
    const pi1 = lat1 * Math.PI/180;
    const pi2 = lat2 * Math.PI/180;
    const DeltaPi = (lat2 - lat1) * Math.PI/180;
    const DeltaLam = (lng2 - lng1) * Math.PI/180;
    
    const haversine = Math.sin(DeltaPi/2) * Math.sin(DeltaPi/2) + Math.cos(pi1) * Math.cos(pi2) * Math.sin(DeltaLam/2) * Math.sin(DeltaLam/2);
    const calc = 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
    return Raio * calc;
}

// Função para obter a localização do usuário
async function geolocalizacaoUser() {
    if (userLat != null || userLng != null) {
        map.setView([userLat, userLng], 15);
        return;
    }
    
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((posicao) => {
                userLat = posicao.coords.latitude;
                userLng = posicao.coords.longitude;
                
                map.setView([userLat, userLng], 15);
                
                if (!userMarcador) {
                    userMarcador = L.marker([userLat, userLng], {icon: userGeoLocalizacao}).addTo(map);
                } else {
                    userMarcador.setLatLng([userLat, userLng]);
                }
                
                resolve();
            }, reject, {enableHighAccuracy: true});
        } else {
            alert('Geolocalização não suportada pelo navegador');
            reject(new Error('Geolocalização não suportada pelo navegador'));
        }
    });
}

// Evento do botão de geolocalização
document.getElementById('geolocalBtn').addEventListener('click', async function() {
    try {
        await geolocalizacaoUser();
        map.setView([userLat, userLng], 15);
        fecharListaEExibirCarrossel();
    } catch (error) {
        console.error('Erro ao obter a geolocalização:', error);
    }
});

function mostrarDistancia(ponto) {
    const distanciaSpan = document.querySelector(`.carrossel-item[data-index="${ponto.index}"] .distanciaMetros`);
    
    if (userLat === null || userLng === null) {
        distanciaSpan.textContent = '0 m'; // Define a distância como 0 metros
        return;
    }
    
    const distanciaMetros = calcDistancia(userLat, userLng, ponto.lat, ponto.lng);
    distanciaSpan.textContent = `${formatarDistancia(distanciaMetros)} m`;
}

function formatarDistancia(distancia) {
    let distanciaStr = distancia.toFixed(2); // 2 casas decimais
    
    let partes = distanciaStr.split('.');
    partes[0] = partes[0].slice(0, 3); // Ajusta o número de dígitos antes do ponto decimal
    return partes.join('.');
}

// Função para mostrar a lista filtrada
function mostrarListaFiltrada(type) {
    esconderLista();
    const listaContainer = document.getElementById('lista-container');
    const listaFiltrada = document.getElementById('lista-filtrada');
    
    listaFiltrada.innerHTML = '';
    const pontosFiltrados = Pontos.filter(ponto => ponto.type === type);
    
    pontosFiltrados.forEach(ponto => {
        const listItem = document.createElement('div');
        listItem.classList.add('card');
        listItem.dataset.index = ponto.index; // Adiciona o index ao dataset
        listItem.innerHTML = `
            <img src="${ponto.image || 'banhista/mapa/assets/img/Imagem indisponível.png'}" alt="${ponto.name}">
            <div class="card-info">
                <h2>${ponto.name}</h2>
                <span>Distância: ${formatarDistancia(calcDistancia(userLat, userLng, ponto.lat, ponto.lng))} m</span>
                <span>${ponto.lat},${ponto.lng}</span>
            </div>
        `;
        listaFiltrada.appendChild(listItem);
    });
    
    listaContainer.style.display = 'flex';
}

// Evento de clique fora dos marcadores e da lista
document.addEventListener('click', function(event) {
    const listaContainer = document.getElementById('lista-container');
    const carrossel = document.getElementById('carrossel');
    
    if (!listaContainer.contains(event.target) && !carrossel.contains(event.target) && pontosFocados) {
        esconderLista(); // Fecha a lista
        if (carrossel) {
            carrossel.classList.remove('carrossel-mover'); // Mostra o carrossel
        }
    }
});

// Função para fechar a lista e exibir o carrossel
function fecharListaEExibirCarrossel() {
    esconderLista();
    const carrossel = document.getElementById('carrossel');
    if (carrossel) {
        carrossel.classList.remove('carrossel-mover');
    }
}

// Esconde a lista
function esconderLista() {
    const listaContainer = document.getElementById('lista-container');
    if (listaContainer) {
        listaContainer.style.display = 'none';
    }
}

// Evento de clique nos cards
document.addEventListener('click', function(event) {
    const pontoIndex = parseInt(event.target.closest('.card')?.dataset.index, 10);
    if (pontoIndex !== NaN && Pontos[pontoIndex]) {
        Carrossel(pontoIndex); // Navega para o item do carrossel correspondente
        fecharListaEExibirCarrossel(); // Fecha a lista
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const card = document.querySelectorAll('.carrossel-item');
    const btnAtivar = document.getElementById('btnAtivar');
    const modalLoc = document.getElementById('ModalLoc');

    function solicitarGeolocalizacao() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (posicao) => {
                    userLat = posicao.coords.latitude;
                    userLng = posicao.coords.longitude;
                    map.setView([userLat, userLng], 15);
                    if (!userMarcador) {
                        userMarcador = L.marker([userLat, userLng], {icon: userGeoLocalizacao}).addTo(map);
                    } else {
                        userMarcador.setLatLng([userLat, userLng]);
                    }
                    resolve();  // Geolocalização bem-sucedida
                },
                (erro) => {
                    reject('Erro ao obter a geolocalização');
                },
                { enableHighAccuracy: true }
            );
        });
    }

    btnAtivar.onclick = async function() {
        try {
            await solicitarGeolocalizacao(); 
            modalLoc.style.display = 'none';
            fecharListaEExibirCarrossel(); 
        } catch (erro) {
            alert('Não foi possível obter a sua geolocalização. ' + erro);
        }
    };

    window.addEventListener('click', function(toque) {
        if (toque.target === modalLoc) {
            modalLoc.style.display = 'none';  
        }
    });

    card.forEach(card => {
        const img = card.querySelector('img');

        if (img) {
            img.addEventListener('click', async function(e) {
                e.stopPropagation();

                const geolocalizacaoAtivada = userLat !== null && userLng !== null;

                if (!geolocalizacaoAtivada) {
                    modalLoc.style.display = 'flex';  
                } else {
                    card.classList.toggle('expanded');

                    if (card.classList.contains('expanded')) {
                        const pontoIndex = parseInt(card.dataset.index, 10);
                        const ponto = Pontos.find(p => p.index === pontoIndex);

                        if (ponto) {
                            mostrarDistancia(ponto);
                            focarPontoNoMapa(ponto.index);
                        } else {
                            console.error('Ponto não encontrado para o índice:', pontoIndex);
                        }
                    }
                }
            });
        }
    });
});

/*
const modalEsclarecimento = document.getElementById('ModalLoc');
const abreEsclarecimento = document.getElementById('ponto');
// const fechaEsclarecimento = document.getElementById('fechaEsclarecimento');

abreEsclarecimento.onclick= function() {
modalEsclarecimento.style.display = 'flex';
}

fechaEsclarecimento.onclick = function() {
modalEsclarecimento.style.display= 'none';
}
*/

// Controla o carrossel
let contadorIndexes = 0;
let startX = 0;
let movimento = false;

function Carrossel(index) {
    const fotos = document.querySelectorAll('.carrossel-item');
    const totalSlides = fotos.length;
    
    if (index >= 0 && index < totalSlides) {
        fecharExpandido();
        contadorIndexes = index;
        
        const tamanhoFotos = fotos[0].offsetWidth;
        const offset = -(contadorIndexes * tamanhoFotos) + ((document.querySelector('#carrossel').offsetWidth - tamanhoFotos) / 2);
        
        document.querySelector('.carrossel-horizontal').style.transform = `translateX(${offset}px)`;
    }
}

function toqueStart(evento) {
    startX = evento.touches[0].clientX;
    movimento = true;
}

function toqueMovimento(evento) {
    if (!movimento) return;
    
    const X = evento.touches[0].clientX;
    const movX = startX - X;
    
    if (Math.abs(movX) > 50) {
        if (movX > 0) {
            fotoPosterior();
        } else {
            fotoAnterior();
        }
        movimento = false;
    }
}

function toqueEnd() {
    movimento = false;
}

document.querySelector('.carrossel-horizontal').addEventListener('touchstart', toqueStart);
document.querySelector('.carrossel-horizontal').addEventListener('touchmove', toqueMovimento);
document.querySelector('.carrossel-horizontal').addEventListener('touchend', toqueEnd);

function fotoPosterior() {
    if (contadorIndexes < document.querySelectorAll('.carrossel-item').length - 1) {
        fecharExpandido();
        Carrossel(contadorIndexes + 1);
    }
}

function fotoAnterior() {
    if (contadorIndexes > 0) {
        fecharExpandido();
        Carrossel(contadorIndexes - 1);
    }
}

function fecharExpandido() {
    const expanded = document.querySelector('.carrossel-item.expanded');
    if (expanded) {
        expanded.classList.remove('expanded');
    }
}

Carrossel(contadorIndexes);

// Função para alternar o carrossel
function toggleCarrossel() {
    const carrossel = document.getElementById('carrossel');
    if (carrossel.classList.contains('carrossel-mover')) {
        carrossel.classList.remove('carrossel-mover');
        carrossel.style.bottom = '20vw'; 
    } else {
        carrossel.classList.add('carrossel-mover');
        carrossel.style.bottom = '60vh';
    }
}

// Função para remover o foco de todos os marcadores e fechar a lista
function removerFocoEFecharLista() {
    if (pontosFocados) {
        pontosFocados.setIcon(pontosFocados.iconeOriginal);
        pontosFocados = null; // Remove o ponto focado
    }
    esconderLista(); // Fecha a lista
    const carrossel = document.getElementById('carrossel');
    if (carrossel) {
        carrossel.classList.remove('carrossel-mover'); // Mostra o carrossel
    }
}

// Adiciona um evento de clique ao mapa
map.on('click', function(event) {
    removerFocoEFecharLista(); // Remove o foco e fecha a lista
});

// Adiciona eventos aos botões
document.getElementById('btn_chuveirinhos').addEventListener('click', () => {
    focusMakersAndShowList('chuveirinho');
    abrirLista(); // Garante que a lista esteja visível
});

document.getElementById('btn_banheiros').addEventListener('click', () => {
    focusMakersAndShowList('banheiro');
    abrirLista(); // Garante que a lista esteja visível
});

// Função para abrir a lista
function abrirLista() {
    const listaContainer = document.getElementById('lista-container');
    if (listaContainer) {
        listaContainer.style.display = 'flex'; // Exibe a lista
        // console.log('lalalalala')
    }
}

// Evento de clique fora dos marcadores e da lista
document.addEventListener('click', function(event) {
    const listaContainer = document.getElementById('lista-container');
    const carrossel = document.getElementById('carrossel');
    
    if (!listaContainer.contains(event.target) && !carrossel.contains(event.target) && pontosFocados) {
        esconderLista(); // Fecha a lista
        if (carrossel) {
            carrossel.classList.remove('carrossel-mover'); // Mostra o carrossel
        }
    }
});