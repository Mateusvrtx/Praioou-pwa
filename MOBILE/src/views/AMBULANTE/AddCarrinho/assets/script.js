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

            const totalImages = imgPrincipalDiv.querySelectorAll('img').length + imgsDiv.querySelectorAll('img').length - 1;

            let addImg = document.getElementById('adicionar');
            if (totalImages < 5) {
                if (!addImg) {
                    addImg = document.createElement('img');
                    addImg.src = "AMBULANTE/AddCarrinho/assets/img/Adicionar.png";
                    addImg.id = "adicionar";
                    imgsDiv.appendChild(addImg);

                    addImg.addEventListener('click', function() {
                        fileInput.click();
                    });
                }
            } else {
                if (addImg) {
                    addImg.style.display = "none";
                }
            }
        };

        reader.readAsDataURL(file);
    }
});




document.getElementById('Form-AddCarrinho').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData();
    
    formData.append('nmCarrinho', document.getElementById('nmCarrinho').value);
    formData.append('locCarrinho', document.getElementById('locCarrinho').value);
    formData.append('dsCarrinho', document.getElementById('dsCarrinho').value);
    formData.append('qtConjunto', document.getElementById('qtConjunto').value);
    formData.append('vlReserva', document.getElementById('vlReserva').value);
    formData.append('dsCidade', document.getElementById('dsCidade').value);
    formData.append('hrInicioReserva', document.getElementById('hrInicioReserva').value);
    formData.append('hrFimReserva', document.getElementById('hrFimReserva').value);
    
    const fileInput = document.getElementById('imgsCarrinho');
    const files = fileInput.files;

    if (files.length > 5) {
        alert("Você só pode enviar no máximo 5 imagens.");
        return;
    }

    for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i]);
    }

    try {
        const response = await fetch('/AddCarrinho', {
            method: 'POST',
            body: formData 
        });

        if (response.ok) {
            alert('Carrinho adicionado com sucesso!');
            window.location.href = ('/inicialB')
        } else {
            console.log('Erro ao adicionar o carrinho.');
        }
    } catch (error) {
        console.error('Erro geral:', error);
    }
});

const DuvidaQtt = document.getElementById('DuvidaQtt')
const msgQtt = document.getElementById('msgQtt')

DuvidaQtt.onclick = function() {
    msgQtt.style.display = 'block'

    const fecharQtt = document.getElementById('FecharQtt')

    fecharQtt.onclick = function () {
        msgQtt.style.display = 'none'
    }
}

const DuvidaVl = document.getElementById('DuvidaVl')
const msgVl = document.getElementById('msgVl')

DuvidaVl.onclick = function() {
    msgVl.style.display = 'block'

    const fecharVl = document.getElementById('FecharVl')

    fecharVl.onclick = function () {
        msgVl.style.display = 'none'
    }
}

/*MODAL MARIA*/

var modalFts = document.getElementById("Modal");

var adicionarFT = document.getElementsByClassName("");

var btnConcluido = document.getElementsByClassName("concluido")[0];

adicionarFT.onclick = function() {
    modalFts.style.display = "flex";


}

btnConcluido.onclick = function() {
    modalFts.style.display = "none";
}

// SÓ PODE SER ATIVADO QUANDO O MODAL ESTIVER ABERTO, CASO CONTRÁRIO, DARA ERRO!

// window.onclick = function(event) {
//     if (event.target == modalFtsCarrinho) {
//         modalFts.style.display = "none";
//     }
// }

