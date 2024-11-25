document.addEventListener('DOMContentLoaded', function() {
    const excluirBtn = document.getElementById('excluir-imagem');

    if (excluirBtn) {
        excluirBtn.addEventListener('click', async () => {
            try {
                const response = await fetch('/imgPerfilB', {
                    method: 'DELETE'
                });

                if (response.ok) {
                    window.location.href='/perfilB'
                } else {
                    alert('Erro ao excluir imagem. Tente novamente mais tarde.');
                }
            } catch (error) {
                console.error('Erro ao excluir imagem:', error);
                alert('Ocorreu um erro ao tentar excluir a imagem. Tente novamente mais tarde.');
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    
    const themePreference = document.body.getAttribute('data-theme');
    
    if (themePreference === 'dark') {
        document.body.classList.add('dark');
        document.body.classList.remove('light');
    } else {
        document.body.classList.add('light');
        document.body.classList.remove('dark');
    }
});

/*MODal */    

var modalFts = document.getElementById("ModalFTPerfil");

var adicionarFT = document.getElementById("Editar");

var btnConcluido = document.getElementsByClassName("fechar")[0];

adicionarFT.onclick = function() {
    modalFts.style.display = "flex";
}

btnConcluido.onclick = function() {
    modalFts.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modalFtsCarrinho) {
    modalFts.style.display = "none";
  }
}

// DARK MODE

document.addEventListener('DOMContentLoaded', () => {
    const chk = document.getElementById('chk');
    const images = document.querySelectorAll('.atalhos img, .Kaboom img, .avaliacao img');

    const padrao = [
        'ambulante/perfilB/assets/img/barraca-de-comida 1.png',
        'ambulante/perfilB/assets/img/bandeja-de-comida 1.png',
        'ambulante/perfilB/assets/img/cadeira-de-praia 1.png',
        'ambulante/perfilB/assets/img/lista-de-precos 1.png',
        'ambulante/perfilB/assets/img/grafico-de-pizza 1.png',
        'ambulante/perfilB/assets/img/recibo 1.png',
        'ambulante/perfilB/assets/img/Bolinha-Ka-Boom.png',
        'ambulante/perfilB/assets/img/Bolinha-avaliacao.png'
    ];

    const brancas = [
        'ambulante/perfilB/assets/img/barraca-de-comida-branco.png',
        'ambulante/perfilB/assets/img/bandeja-de-comida-branco.png',
        'ambulante/perfilB/assets/img/cadeira-de-praia-branco.png',
        'ambulante/perfilB/assets/img/lista-de-precos-branco.png',
        'ambulante/perfilB/assets/img/grafico-de-pizza-branco.png',
        'ambulante/perfilB/assets/img/recibo-branco.png',
        'ambulante/perfilB/assets/img/Bolinha-Ka-Boom-dark.png',
        'ambulante/perfilB/assets/img/Bolinha-avaliacao-escuro.png'
    ];

    const updateImages = (isDark) => {
        const imageArray = isDark ? brancas : padrao;
        images.forEach((img, index) => {
            img.src = imageArray[index];
        });
    };
    
    const updateTheme = async () => {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        updateImages(isDark);

        const themePreference = isDark ? 'dark' : 'light';

        console.log(`Tema atualizado para: ${themePreference}`);

        try {
            const response = await fetch('/update-theme', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ themePreference }),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar a preferência de tema');
            }
        } catch (error) {
            console.error('Erro ao atualizar o tema:', error);
        }
    };

    chk.addEventListener('change', updateTheme);
});

document.addEventListener('DOMContentLoaded', function () {
    
    function atualizaBarras() {
        const barras = document.querySelectorAll('.barraProgresso');
        barras.forEach(barra => {
            const [atual, total] = barra.querySelector('.detalhes span:nth-child(2)')
            .textContent
            .match(/\d+/g)
            .map(Number);
            const preenchida = barra.querySelector('.barraPreenchida');
            preenchida.style.width = `${(atual / total) * 100}%`;
        });
    }
    
    atualizaBarras();
    
    const modalMetasTchibum = document.querySelector('.modalMetasTchibum');
    const modalProgresso = document.querySelector('.modalProgresso');
    const modalKaboom = document.querySelector('.kaboomConfirmacao');
    
    const btnAtivar = document.getElementById('btnAtivarTchibum');
    const btnFechar = document.querySelector('.btnFechar');
    const btnFecharMeta = document.querySelector('.btnFecharMeta');
    
    document.getElementById('kaboom').addEventListener('click', function () {
        modalMetasTchibum.style.display = 'flex';
        modalProgresso.style.display = 'block';
        modalKaboom.style.display = 'none';
    });
    
    btnFechar.addEventListener('click', function () {
        modalMetasTchibum.style.display = 'none';
        modalProgresso.style.display = 'none';
    });
    
    window.addEventListener('click', function (event) {
        if (event.target === modalMetasTchibum) {
            modalMetasTchibum.style.display = 'none';
            modalProgresso.style.display = 'none';
        }
    });


    btnAtivar.addEventListener('click', function () {
        modalProgresso.style.display = 'none';
        modalKaboom.style.display = 'block';
    });
    
    btnFecharMeta.addEventListener('click', function () {
        modalKaboom.style.display = 'none';
        modalMetasTchibum.style.display = 'none';
    });
    
    const btnCancelarKaboom = document.querySelector('.btnCancelarKaboom');
    const btnAtivarKaboom = document.querySelector('.btnAtivarKaboom');
    const kaboomBtn = document.getElementById('kaboom');

    btnCancelarKaboom.addEventListener('click', function () {
        modalKaboom.style.display = 'none';
        modalMetasTchibum.style.display = 'none';
    });

    btnAtivarKaboom.addEventListener('click', function () {
        modalKaboom.style.display = 'none';
        modalMetasTchibum.style.display = 'none';
        kaboomBtn.style.backgroundColor = '#cccccc';
        kaboomBtn.disabled = true;
    });
});
