const TelaVazia = document.getElementById('Vazio');
const Clubes =  document.getElementById('Clubes');

fetch('/ClubeJSON')
    .then(response => response.json()) 
    .then(data => {
        if (!data.clubes || data.clubes.length === 0) {
            TelaVazia.style.display = 'block';
            Clubes.style.display = 'none';
        } else {
            Clubes.style.display = 'block';
            TelaVazia.style.display = 'none';
        }
    })
    .catch(error => {
        console.error('Erro ao buscar clubes:', error);
        TelaVazia.style.display = 'block';
        Clubes.style.display = 'none';
    });
