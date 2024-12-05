let data = [
    {
        'star': 5,
        'count': 580,
    },
    {
        'star': 4,
        'count':158,
    },
    {
        'star': 3,
        'count':325,
    },
    {
        'star': 2,
        'count':258,
    },
    {
        'star': 1,
        'count':0,
    }
    ]

    
    let total_rating = 0,
        rating_based_on_stars = 0;

    data.forEach((rating, Reserva) => {
        total_rating += rating.count;
        rating_based_on_stars += rating.count * rating.star
    });

    data.forEach(rating => {
        let rating_progress = `
        <div class="rating_progress-value">
                    <p>${rating.star} <span class="star">&#9733;</span></p>
                    <div class="progress">
                        <div class="bar" style="width: ${(rating.count / total_rating)* 100}%"></div>
                    </div>
                    <p>${rating.count.toLocaleString()}</p>
                </div>
        `;

        document.querySelector('.rating_progress').innerHTML += rating_progress;
    });

    let rating_average = (rating_based_on_stars / total_rating).toFixed(1);

    document.querySelector('.rating_average h1').innerHTML = rating_average;
    document.querySelector('.rating_average p').innerHTML = total_rating.toLocaleString();
    document.querySelector('.star-inner').style.width = (rating_average / 5) * 100 + '%';


document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star-outer .star');
    const ratingValue = document.getElementById('estrelas');
    const averageRating = document.getElementById('average-rating');

    stars.forEach(star => {
        star.addEventListener('click', () => {
            const value = star.getAttribute('data-value');
            ratingValue.value = value;
            averageRating.innerText = value;
            stars.forEach(s => {
                if (s.getAttribute('data-value') <= value) {
                    s.classList.add('selected');
                } else {
                    s.classList.remove('selected');
                }
            });
    });

    star.addEventListener('mouseover', () => {
        const value = star.getAttribute('data-value');
        stars.forEach(s => {
            if (s.getAttribute('data-value') <= value) {
                s.classList.add('hover');
            } else {
                s.classList.remove('hover');
            }
        });
    });

    star.addEventListener('mouseout', () => {
        stars.forEach(s => {
            s.classList.remove('hover');
        });
    });
});
});

var modal = document.getElementById('modal');

var btn_adicionar = document.getElementById('add-comentario');

var bnt_fechar = document.getElementsByClassName('fechar')[0];

btn_adicionar.onclick = function() {
    modal.style.display = 'block';
}

    bnt_fechar.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(clique) {
    if (clique.target == modal) {   
        modal.style.display = 'none';
    }
}
document.querySelectorAll('.responder-btn').forEach(button => {
    button.addEventListener('click', function() {
        const modal = document.getElementById("responder-modal");
        const comentarioId = this.getAttribute("data-comentario-id");
        const carrinhoId = this.getAttribute("data-carrinho-id");

        document.getElementById("avali").value = comentarioId;
        document.getElementById("idCarrinho").value = carrinhoId;

        modal.style.display = 'block';
        
        window.addEventListener('click', function(event) {
            const modal = document.getElementById("responder-modal");
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
});

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id') || window.location.pathname.split('/').pop();


const btnClube = document.getElementById('btnClube')
if (btnClube.value == 0) {
    btnClube.style.color = '#323232'
    btnClube.style.backgroundColor = '#323232bf'
}

btnClube.addEventListener('click', async function() {
    window.location.href = `/clube-entrar`
})


// favotito

const imagens = [
    "/banhista/cardapio/assets/img/coracaorosa.svg",
    "/banhista/reserva/assets/img/coracao.svg"
];

let indiceAtual = 0;

function trocarImagem(){
    const img = document.getElementById("imagem");
    indiceAtual = (indiceAtual + 1) % imagens.length;
    img.src = imagens[indiceAtual];
}