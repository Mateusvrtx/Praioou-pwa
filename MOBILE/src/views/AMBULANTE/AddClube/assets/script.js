    (async function() {
        document.getElementById('Form-AddClube').addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = new FormData();
            formData.append('nmClube', document.getElementById('nmClube').value);
            formData.append('idCarrinho', document.getElementById('idCarrinho').value);
            formData.append('vlEntrada', document.getElementById('vlEntrada').value);
            formData.append('dsVantagens', document.getElementById('dsVantagens').value);
            formData.append('file', document.getElementById('imgClube').files[0]);

            const response = await fetch('/AddClube', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const modalConf = document.getElementById("BodyModalConf");
                modalConf.style.display = 'flex'

                const blur = document.querySelector('.blur')

                blur.addEventListener('click', () => {
                    window.location.href = '/CluberJSON/ClubeB'
                });
            }
        });
    })();

    document.getElementById('imgClube').addEventListener('change', function(event) {
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




