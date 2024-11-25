

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.Topbox img, .Lowbox img, .Sidebox img');
    const themePreference = document.body.getAttribute('data-theme');

    const padrao = [
        'ambulante/configB/assets/img/cadeado.png',
        'ambulante/configB/assets/img/idioma.png',
        'ambulante/configB/assets/img/email.png',
        'ambulante/configB/assets/img/sac.png',
        'ambulante/configB/assets/img/faq.png',
        'ambulante/configB/assets/img/avaliacao.png',
        'ambulante/configB/assets/img/denuncia.png',
        'ambulante/configB/assets/img/termos.png',
        'ambulante/configB/assets/img/bola.png',
        'ambulante/configB/assets/img/privacidade.png',
        'ambulante/configB/assets/img/instagram.png',
        'ambulante/configB/assets/img/linkedin.png',
        'ambulante/configB/assets/img/addUso.png',
        'ambulante/configB/assets/img/exit.png',
        'ambulante/configB/assets/img/deleteUso.png'
    ];

    const brancas = [
        'ambulante/configB/assets/img/cadeado-b.png',
        'ambulante/configB/assets/img/idioma-b.png',
        'ambulante/configB/assets/img/email-b.png',
        'ambulante/configB/assets/img/sac-b.png',
        'ambulante/configB/assets/img/faq-b.png',
        'ambulante/configB/assets/img/avaliacao-b.png',
        'ambulante/configB/assets/img/denuncia-b.png',
        'ambulante/configB/assets/img/termos-b.png',
        'ambulante/configB/assets/img/bola-b.png',
        'ambulante/configB/assets/img/privacidade-b.png',
        'ambulante/configB/assets/img/instagram-b.png',
        'ambulante/configB/assets/img/linkedin-b.png',
        'ambulante/configB/assets/img/addUso-b.png',
        'ambulante/configB/assets/img/exit-b.png',
        'ambulante/configB/assets/img/deleteUso-b.png'
    ];

    const updateImages = (isDark) => {
        const imageArray = isDark ? brancas : padrao;
        images.forEach((img, index) => {
            img.src = imageArray[index];
        });
    };

  if (themePreference === 'dark') {
        document.body.classList.add('dark');
        document.body.classList.remove('light');
        updateImages (true)
    } else {
        document.body.classList.add('light');
        document.body.classList.remove('dark');
        updateImages (false)
    }});



