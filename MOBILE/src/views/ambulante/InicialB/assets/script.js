document.addEventListener('DOMContentLoaded', function() {
    const prev = document.querySelector('#next');
    const next = document.querySelector('#prev');
    const carousel = document.querySelector('.cards');
    const base = document.querySelector('.base');

    const qttCard = document.querySelectorAll('.cardCarrinho').length

    let scrollPosition = 0;
    const cardWidth = document.querySelector('.cardCarrinho').offsetWidth / window.innerWidth * 110;
    const margin = 28;
    const visibleCards = 3;

    carousel.style.width = `${(qttCard + 1) * cardWidth + margin * 5}vw`;

    const cardWidthInVW = cardWidth;
    const scrollAmount = cardWidthInVW * visibleCards;

    const maxScroll = (carousel.scrollWidth / window.innerWidth * 115) - (base.offsetWidth / window.innerWidth * 100);

    prev.addEventListener('click', () => {
        if (scrollPosition > 0) {
            scrollPosition -= scrollAmount;
            if (scrollPosition < 0) scrollPosition = 0;
            carousel.style.transform = `translateX(${scrollPosition}vw)`;
        }
    });

    next.addEventListener('click', () => {
        if (scrollPosition < maxScroll) {
            scrollPosition += scrollAmount;
            if (scrollPosition > maxScroll) scrollPosition = maxScroll;
            carousel.style.transform = `translateX(${scrollPosition}vw)`;
        }
    });
});

    // const setaP1 = document.getElementById('setaP1')
    // const setaP2 = document.getElementById('setaP2')
    // const setaP3 = document.getElementById('setaP3')
    // const setaP4 = document.getElementById('setaP4')

    // const Passo1 = document.getElementById('Passo1')
    // const Passo2 = document.getElementById('Passo2')
    // const Passo3 = document.getElementById('Passo3')
    // const Passo4 = document.getElementById('Passo4')

    // const btnTutorial = document.getElementById('btnTutorial')
    // const cardAdd = document.querySelector('.cardAdd')
    // const relatorio = document.querySelector('.relatorio')
    // const fecharTutorial = document.getElementById('FecharTutorial')

    // setaP1.onclick = function() {

    //     Passo1.style.display = 'none'

    //     Passo2.style.display = 'block'
    //     btnTutorial.style.zIndex = '5'
    //     btnTutorial.style.backgroundImage = 'url(/ambulante/InicialB/assets/img/fundoBanner.png)'
    // }

    // setaP2.onclick = function() {

    //     btnTutorial.style.backgroundImage = 'none'
    //     Passo2.style.display = 'none'
    //     btnTutorial.style.zIndex = '1'


    //     Passo3.style.display = 'block'
    //     cardAdd.style.zIndex = '5'
    // }

    // setaP3.onclick = function() {
    //     Passo3.style.display = 'none'
    //     cardAdd.style.zIndex = '1'

    //     Passo4.style.display = 'block'
    //     relatorio.style.zIndex = '5'
    // }

    // setaP4.onclick = function() {
    //     window.location.href = '/comanda'
    // }

    // fecharTutorial.onclick = function() {
    //     Passo4.style.display = 'none'
    //     relatorio.style.zIndex = '1'
    // }
