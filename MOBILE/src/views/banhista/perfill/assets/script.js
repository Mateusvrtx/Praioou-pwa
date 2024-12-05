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

document.addEventListener('DOMContentLoaded', () => {
    const chk = document.getElementById('chk');
    const imagens = document.querySelectorAll('.atalhos img, .btn-atalho2 img')

    
    const padrao = [
        'banhista/perfill/assets/img/cadeira.png',
        'banhista/perfill/assets/img/bandeja.png',
        'banhista/perfill/assets/img/favorito.png',
        'banhista/perfill/assets/img/bilhete.png',
        'banhista/perfill/assets/img/coroa.png',
        'banhista/perfill/assets/img/historico.png',
        'ambulante/perfilB/assets/img/Bolinha-Ka-Boom.png',
        'ambulante/perfilB/assets/img/Bolinha-avaliacao.png'
    ];

    const brancas = [
        'banhista/perfill/assets/img/cadeira-de-praia-branco.png',
        'banhista/perfill/assets/img/bandeja-de-comida-branco.png',
        'banhista/perfill/assets/img/corazon.jpg',
        'banhista/perfill/assets/img/cupon.png',
        'banhista/perfill/assets/img/coroaa.png',
        'banhista/perfill/assets/img/historicoo.png',
        'ambulante/perfilB/assets/img/Bolinha-Ka-Boom-dark.png',
        'ambulante/perfilB/assets/img/Bolinha-avaliacao-escuro.png'
    ];

    const updateImages = (isDark) => {
        const imageArray = isDark ? brancas : padrao;
        imagens.forEach((img, index) => {
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
            const response = await fetch('/update-themeC', {
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