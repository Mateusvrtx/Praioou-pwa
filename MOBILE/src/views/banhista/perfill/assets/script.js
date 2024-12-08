document.addEventListener('DOMContentLoaded', () => {
    const chk = document.getElementById('chk');

    const images = document.querySelectorAll('.atalhos img, .Kaboom img, .avaliacao img');
    
    const padrao = [
        'banhista/perfill/assets/img/cadeira.png',
        'banhista/perfill/assets/img/bandeja.png',
        'banhista/perfill/assets/img/favorito.png',
        'banhista/perfill/assets/img/bilhete.png',
        'banhista/perfill/assets/img/coroa.png',
        'banhista/perfill/assets/img/historico.png',
        'banhista/perfill/assets/img/Bolinha-Ka-Boom.png',
        'banhista/perfill/assets/img/Bolinha-avaliacao.png'
    ];

    const brancas = [
        'banhista/perfill/assets/img/cadeira-de-praia-branco.png',
        'banhista/perfill/assets/img/bandeja-de-comida-branco.png',
        'banhista/perfill/assets/img/corazon.jpg',
        'banhista/perfill/assets/img/cupon.png',
        'banhista/perfill/assets/img/coroaa.png',
        'banhista/perfill/assets/img/historicoo.png',
        'banhista/perfill/assets/img/Bolinha-Ka-Boom-dark.png',
        'banhista/perfill/assets/img/Bolinha-avaliacao-escuro.png'
    ];

    const updateImages = (isDark) => {
        const imageArray = isDark ? brancas : padrao;
        images.forEach((img, index) => {
            img.src = imageArray[index];
        });
    };

    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
        document.body.classList.add('dark');
        chk.checked = true;
        updateImages(true);
    } else {
        updateImages(false);
    }
    
    const updateTheme = () => {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        localStorage.setItem('darkMode', isDark);
        updateImages(isDark);
    };

    chk.addEventListener('change', updateTheme);

    const link = document.getElementById('configLink');
    link.addEventListener('click', (e) => {
        if (chk.checked) {
            e.preventDefault();
            const href = link.getAttribute('href');
            window.location.href = `/perfill?darkMode=true`;
        }
    });
});
