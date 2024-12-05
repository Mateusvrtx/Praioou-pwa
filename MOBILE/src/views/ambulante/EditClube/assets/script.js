// document.getElementById('imgClube').addEventListener('change', function(event) {
//     const file = event.target.files[0];
//     const labelContent = document.getElementById('labelContent');
//     const h3 = document.getElementById('verifique');

//     if (file) {
//         const reader = new FileReader();
//         reader.onload = function(e) {
//             labelContent.innerHTML = `<img src="${e.target.result}" id="defaultImg" style="width: 90vw; height: 45vw; border-radius: 5vw">`;
//             h3.style.display = 'none'
//         };
//         reader.readAsDataURL(file);
//     }
// });


document.getElementById('Form-AddClube').onsubmit = async function(event) {
    event.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id') || window.location.pathname.split('/').pop();

    const data = {
        nmClube: document.getElementById('nmClube').value,
        idCarrinho: document.getElementById('idCarrinho').value,
        vlEntrada: document.getElementById('vlEntrada').value,
        dsVantagens: document.getElementById('dsVantagens').value,
        idClube: id
    };

    const response = await fetch('/EditarClube', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(data) 
    });

    if (response.ok) {
        const modalConf = document.getElementById("BodyModalConf");
        modalConf.style.display = 'flex'

        const blur = document.querySelector('.blur')

        blur.addEventListener('click', () => {
            window.location.href = '/CluberJSON/ClubeB'
        });
    } else {
        console.error('Erro ao atualizar o clube');
    }
};




