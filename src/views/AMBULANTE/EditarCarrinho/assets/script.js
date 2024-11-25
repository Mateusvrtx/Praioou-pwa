// Pegando o ID da URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id') || window.location.pathname.split('/').pop();

// Manipulação do input de imagens
document.getElementById('imgsCarrinho').addEventListener('change', function(event) {
    const fileInput = event.target;
    const files = fileInput.files;
    const imagePreview = document.getElementById('preview');

    if (files.length + imagePreview.querySelectorAll('.imgs img').length > 5) {
        alert("Você só pode enviar no máximo 5 imagens.");
        return;
    }

    let imgPrincipalDiv = imagePreview.querySelector('.imgPrincipal');
    let imgsDiv = imagePreview.querySelector('.imgs');

    if (!imgPrincipalDiv || !imgsDiv) {
        imagePreview.innerHTML = `
            <div class="ModalFotos">
                <div class="imgPrincipal"></div>
                <div class="imgs"></div>
            </div>
        `;
        imgPrincipalDiv = imagePreview.querySelector('.imgPrincipal');
        imgsDiv = imagePreview.querySelector('.imgs');
    }

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = function(e) {
            const imgElement = document.createElement('img');
            imgElement.src = e.target.result;

            if (imgPrincipalDiv.querySelectorAll('img').length === 0) {
                imgPrincipalDiv.appendChild(imgElement);
            } else {
                imgsDiv.appendChild(imgElement);

                imgElement.addEventListener('click', function() {
                    const tempSrc = imgPrincipalDiv.querySelector('img').src;
                    imgPrincipalDiv.querySelector('img').src = imgElement.src;
                    imgElement.src = tempSrc;
                });
            }

            // Controle para adicionar mais imagens, não exceder o limite
            const totalImages = imgPrincipalDiv.querySelectorAll('img').length + imgsDiv.querySelectorAll('img').length;

            let addImg = document.getElementById('adicionar');
            if (totalImages < 5 && !addImg) {
                addImg = document.createElement('img');
                addImg.src = "AMBULANTE/AddCarrinho/assets/img/Adicionar.png";
                addImg.id = "adicionar";
                imgsDiv.appendChild(addImg);

                addImg.addEventListener('click', function() {
                    fileInput.click();
                });
            } else if (totalImages >= 5 && addImg) {
                addImg.style.display = "none";
            }
        };

        reader.readAsDataURL(file);
    }
});

document.getElementById('Form-AddCarrinho').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = {
        nmCarrinho: document.getElementById('nmCarrinho').value,
        locCarrinho: document.getElementById('locCarrinho').value,
        dsCarrinho: document.getElementById('dsCarrinho').value,
        qtConjunto: document.getElementById('qtConjunto').value,
        vlReserva: document.getElementById('vlReserva').value,
        dsCidade: document.getElementById('dsCidade').value,
        hrInicioReserva: document.getElementById('hrInicioReserva').value,
        hrFimReserva: document.getElementById('hrFimReserva').value,
    };

    try {
        const response = await fetch(`/EditarCarrinho/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const responseBody = await response.text();
        console.log('Resposta do servidor:', responseBody);

        if (response.status === 200) {
            alert('Carrinho editado com sucesso!');
            window.location.href = `/CarrinhoAmb/${id}`;
        } else {
            alert('Erro ao editar o carrinho.');
        }
    } catch (error) {
        console.error('Erro ao enviar os dados:', error);
        alert('Erro ao enviar os dados.');
    }
});


const DuvidaQtt = document.getElementById('DuvidaQtt');
const msgQtt = document.getElementById('msgQtt');
DuvidaQtt.onclick = function() {
    msgQtt.style.display = 'block';
    const fecharQtt = document.getElementById('FecharQtt');
    fecharQtt.onclick = function() {
        msgQtt.style.display = 'none';
    };
}

const DuvidaVl = document.getElementById('DuvidaVl');
const msgVl = document.getElementById('msgVl');
DuvidaVl.onclick = function() {
    msgVl.style.display = 'block';
    const fecharVl = document.getElementById('FecharVl');
    fecharVl.onclick = function() {
        msgVl.style.display = 'none';
    };
}

// Modal de Fotos (ModalMaria)
const modalFts = document.getElementById("Modal");
const adicionarFT = document.getElementById("adicionarFoto"); // Certifique-se de ter um botão com esse ID
const btnConcluido = document.getElementsByClassName("concluido")[0];

adicionarFT.onclick = function() {
    modalFts.style.display = "flex";
}

btnConcluido.onclick = function() {
    modalFts.style.display = "none";
}

// Fechar o modal quando clicar fora dele
window.onclick = function(event) {
    if (event.target == modalFts) {
        modalFts.style.display = "none";
    }
}
