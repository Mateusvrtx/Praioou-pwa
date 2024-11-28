(async function() {
    document.getElementById('Form-AddProduto').addEventListener('submit', async (event) => {
        event.preventDefault();

        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id') || window.location.pathname.split('/').pop();

        const formData = new FormData();
        formData.append('nmProduto', document.getElementById('nmProduto').value);
        formData.append('dsProduto', document.getElementById('dsProduto').value);
        formData.append('dsCategoria', document.getElementById('dsCategoria').value);
        formData.append('dsTipo', document.getElementById('dsTipo').value);
        formData.append('vlProduto', document.getElementById('vlProduto').value);
        formData.append('hrPreparo', document.getElementById('hrPreparo').value);
        formData.append('id', id);
        formData.append('file', document.getElementById('imgProduto').files[0]);

        try {
            const response = await fetch('/AddProduto', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                
                const modalConf = document.getElementById("BodyModalConf");
                modalConf.style.display = 'flex'

                const blur = document.querySelector('.blur')

                blur.addEventListener('click', () => {
                    window.location.href = `/AddCardapio/${id}`;
                });

            } else {
                console.log('Erro ao adicionar produto');
            }
        } catch (error) {
            console.log('Erro geral', error);
        }
    });
})();

document.getElementById('imgProduto').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const labelContent = document.getElementById('labelContent');
    const h3 = document.getElementById('verifique');

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            labelContent.innerHTML = `<img src="${e.target.result}" id="defaultImg" style="width: 90vw; height: 45vw; border-radius: 5vw">`;
            h3.style.display = 'none'
        };
        reader.readAsDataURL(file);
    }
});
