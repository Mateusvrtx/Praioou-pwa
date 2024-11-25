

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.b img');
    const themePreference = document.body.getAttribute('data-theme');

    const padrao = [
        'banhista/perfilConfig/assets/img/cadeado.png',
        'banhista/perfilConfig/assets/img/email.png',
        'banhista/perfilConfig/assets/img/idioma.png',
        'banhista/perfilConfig/assets/img/sac.png',
        'banhista/perfilConfig/assets/img/avaliacao.png',
        'banhista/perfilConfig/assets/img/faq.png',
        'banhista/perfilConfig/assets/img/denuncia.png',
        'banhista/perfilConfig/assets/img/termos.png',
        'banhista/perfilConfig/assets/img/privacidade.png',
        'banhista/perfilConfig/assets/img/bola.png',
        'banhista/perfilConfig/assets/img/instagram.png',
        'banhista/perfilConfig/assets/img/linkedin.png',
        'banhista/perfilConfig/assets/img/addUso copy.png',
        'banhista/perfilConfig/assets/img/deleteUso.png',
        'banhista/perfilConfig/assets/img/exit.png'
    ];

    const brancas = [
        'banhista/perfilConfig/assets/img/cadeado-b.png',
        'banhista/perfilConfig/assets/img/email-b.png',
        'banhista/perfilConfig/assets/img/idioma-b.png',
        'banhista/perfilConfig/assets/img/sac-b.png',
        'banhista/perfilConfig/assets/img/avaliacao-b.png',
        'banhista/perfilConfig/assets/img/faq-b.png',     
        'banhista/perfilConfig/assets/img/denuncia-b.png',
        'banhista/perfilConfig/assets/img/termos-b.png',
        'banhista/perfilConfig/assets/img/privacidade-b.png',
        'banhista/perfilConfig/assets/img/bola-b.png',     
        'banhista/perfilConfig/assets/img/instagram-b.png',
        'banhista/perfilConfig/assets/img/linkedin-b.png',
        'banhista/perfilConfig/assets/img/addUso-b.png',
        'banhista/perfilConfig/assets/img/exit-b.png',
        'banhista/perfilConfig/assets/img/deleteUso-b.png'
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



