document.addEventListener("DOMContentLoaded", () => {
    let tipoFiltro = null;

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id') || window.location.pathname.split('/').pop();
    
    const produtosDiv = document.getElementById('produtos');
    const modalProduto = document.getElementById('modalProduto');
    const modalNome = document.getElementById('modalNome');
    const modalTmpEspera = document.getElementById('tempoEspera');
    const modalImgProduto = document.querySelector('.imgProdutoModal')
    const modalDescricao = document.getElementById('modalDescricao');
    const modalPreco = document.getElementById('modalPreco');
    const modalCategoria = document.getElementById('modalCategoria');
    const fecharModal = document.getElementById('fecharModal');
    const adicionarSacola = document.getElementById('adicionarSacola');
    let produtoAtual = null;
    
    function exibirProdutos(produtos) {
        produtosDiv.innerHTML = '';
        produtos.forEach(produto => {
            let img = produto.nm_imgProduto || 'indisponivel.png';
            const produtoDiv = document.createElement('div');
            produtoDiv.classList.add('produto');
            produtoDiv.innerHTML = `
                <img src='/uploads/${img}' class='imgProduto'> 
                <div class='details'>
                    <h2>${produto.nm_produto} <img id='coracao' src='/banhista/cardapio/assets/img/coracao.svg'></h2>
                    <p class='dsProduto'>${produto.ds_produto}</p>
                <div class='next'>
                    <p class='valor'><strong>Valor:</strong> R$ ${produto.vl_produto.toFixed(2)}</p>
                    <img class='seta' src='/banhista/cardapio/assets/img/next.svg'>
                <div/>
                </div>
            `;
            produtoDiv.addEventListener('click', () => {
                abrirModal(produto);
            });
            produtosDiv.appendChild(produtoDiv);
        });
    }
    
    function buscarProdutos() {
        fetch(`/produtos/${id}`)
            .then(response => response.json())
            .then(data => {
                exibirProdutos(data);
            });
    }
    
    buscarProdutos();
    
    adicionarSacola.addEventListener('click', () => {
        if (produtoAtual) {
            const quantidadeInput = document.getElementById('quantidade');
            const quantidade = parseInt(quantidadeInput.value);
    
            fetch('/sacola', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cd_produto: produtoAtual.cd_produto,
                    id: id,
                    quantidade
                })
            })
            .then(response => {
                if (response.ok) {
                    quantidadeInput.value = 1;
                    const notificacao = document.getElementById('notificacao');
                    notificacao.style.display = 'flex';
    
                    function addAnimation(notificacao) {
                        let dynamicStyles = null;
                        if (!dynamicStyles) {
                            dynamicStyles = document.createElement('style');
                            dynamicStyles.type = 'text/css';
                            document.head.appendChild(dynamicStyles);
                        }
                        dynamicStyles.sheet.insertRule(notificacao, dynamicStyles.length);
                    }
    
                    addAnimation(`
                        @keyframes fecharNtf { 
                            0% {right: 0vw;}
                            100% {right: -90vw;}
                        }
                    `);
    
                    setTimeout(() => {
                        notificacao.style.animation = 'fecharNtf 0.3s linear';
                        notificacao.addEventListener('animationend', () => {
                            notificacao.style.display = 'none';
                        }, { once: true });
                    }, 2000);
    
                    return response.text();
                } else {
                    throw new Error('Erro ao adicionar item à sacola');
                }
            })
            .then(data => {
                console.log(data);
                modalProduto.close();
            })
            .catch(error => {
                console.error('Erro:', error);
            });
        }
    });
    
    function abrirModal(produto) {
        produtoAtual = produto;
        modalImgProduto.innerHTML = `
            <a><img src="/uploads/${produto.nm_imgProduto}"></a>
        ` 
        
        modalNome.textContent = produto.nm_produto;
        modalTmpEspera.textContent = produto.hr_tempo_preparo;
        modalDescricao.textContent = produto.ds_produto;
        modalPreco.textContent = `R$ ${produto.vl_produto.toFixed(2)}`;
        modalProduto.showModal();
    }
    
    const quantidadeInput = document.getElementById('quantidade');
    const diminuirQuantidadeBtn = document.getElementById('diminuirQuantidade');
    const aumentarQuantidadeBtn = document.getElementById('aumentarQuantidade');
    
    diminuirQuantidadeBtn.addEventListener('click', () => {
        if (quantidadeInput.value > 1) {
            quantidadeInput.value--;
        }
    });
    
    aumentarQuantidadeBtn.addEventListener('click', () => {
        quantidadeInput.value++;
    });
    
    fecharModal.addEventListener('click', () => {
        quantidadeInput.value = 1;
        modalProduto.close();
    });

    const btnFiltroSalgado = document.getElementById('btnFiltroSalgado');
    const btnFiltroDoce = document.getElementById('btnFiltroDoce');
    const btnFiltroBebida = document.getElementById('btnFiltroBebida');
    
    btnFiltroSalgado.addEventListener('click',() => {
        fetch(`/filtroSalgado/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json(); 
                
            } else {
                throw new Error('Erro ao filtrar produtos salgados');
            }
        })
        .then(data => {
            exibirProdutos(data);
            tipoFiltro = 'salgado'
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    });
    
    btnFiltroDoce.addEventListener('click',() => {
        fetch(`/filtroDoce/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json(); 
            } else {
                throw new Error('Erro ao filtrar produtos doces');
            }
        })
        .then(data => {
            exibirProdutos(data);
            tipoFiltro = 'doce'
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    });
    
    btnFiltroBebida.addEventListener('click',() => {
        fetch(`/filtroBebida/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json(); 
            } else {
                throw new Error('Erro ao filtrar produtos bebidas');
            }
        })
        .then(data => {
            exibirProdutos(data);
            tipoFiltro = 'bebida'
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    });

    const btnFiltrarPreco = document.getElementById('btnF');

    btnFiltrarPreco.addEventListener('click', () => {
        const vlProduto = document.getElementById('myRange').value;
        const tmpPreparo = document.querySelector('input[name="tempo"]:checked');

        const tempoSelecionado = tmpPreparo ? tmpPreparo.value : null;

        const dadosFiltro = {
            vlProduto: vlProduto || 250,
            tmpPreparo: tempoSelecionado,
            tipoFiltro: tipoFiltro,
        };


        console.log('Dados do filtro:', dadosFiltro); 

        fetch(`/filtroPreco/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosFiltro),
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Erro ao filtrar produtos.');
            }
        })
        .then((data) => {
            exibirProdutos(data);
        })
        .catch((error) => {
            console.error('Erro:', error);
        });
    });

    const btnLimparFiltros = document.getElementById('btnL');

    btnLimparFiltros.addEventListener('click', () => {
        fetch(`/filtroPreco/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                vlProduto: null,
                tmpPreparo: null,
                tipoFiltro: null,
            }),
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Erro ao limpar filtros.');
            }
        })
        .then((data) => {
            exibirProdutos(data); 
        })
        .catch((error) => {
            console.error('Erro ao limpar filtros:', error);
        });

        tipoFiltro = null;
        document.getElementById('myRange').value = 250;
        const radios = document.querySelectorAll('input[name="tempo"]');
        radios.forEach(radio => (radio.checked = false));
    });
});
    
const modal = document.getElementById('modalBk');
const openModal = document.getElementById('filtro');
const closeModal = document.getElementById('btnL');

// Abrir o modal
openModal.addEventListener('click', () => {
  modal.style.display = 'flex';
  document.body.classList.add('no-scroll'); // Desabilita o scroll
});

// Fechar o modal
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
  document.body.classList.remove('no-scroll'); // Reabilita o scroll
});

// Fechar o modal clicando fora dele
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

// Resultado em tempo Real
let $range2 = document.querySelector('#myRange'),
    $value2 = document.querySelector('#resultadoTempoReal');

$range2.addEventListener('input', function() {
    $value2.textContent = this.value;
});

document.querySelectorAll('.Radios input[type="radio"]').forEach(radio => {
  radio.addEventListener('change', function () {
      // Remove a classe "active" de todos os labels
      document.querySelectorAll('.Radios').forEach(label => label.classList.remove('active'));

      // Adiciona a classe "active" ao label correspondente ao input selecionado
      if (this.checked) {
          this.parentElement.classList.add('active');
      }
  });
});

// efito de quando clica no coraçãozinho

const imagens = [
    "/banhista/cardapio/assets/img/coracaorosa.svg",
    "/banhista/cardapio/assets/img/coracao.svg"
];

let indiceAtual = 0;

function trocarImagem(){
    const img = document.getElementById("imagem");
    indiceAtual = (indiceAtual + 1) % imagens.length;
    img.src = imagens[indiceAtual];
}