(async function() {
    document.getElementById('form-cadastrarB').addEventListener('submit', async (event) => {
        event.preventDefault();

        const modalTermosB = document.getElementById('modalTermosB');
        const voltar = document.getElementById('voltar2');
        const btnContinuar = document.getElementById('btnTermo');

        modalTermosB.show();

        voltar.onclick = function () {
            modalTermosB.close();
        };

        btnContinuar.onclick = async function () {
            const checkCond = document.getElementById('chkCond');
            const checkPriv = document.getElementById('chkPriv');

            if (checkCond.checked && checkPriv.checked) {
                
                const Senha = document.getElementById('senha').value;
                const campoConfirmaSenha = document.getElementById('confirm-senha').value;
                
                if (Senha !== campoConfirmaSenha) {
                    alert('As senhas estão diferentes!');
                    document.getElementById('senha').value = '';
                    document.getElementById('confirm-senha').value = '';
                    return;
                }

                const dadosForm = {
                    nmDigit: document.getElementById('nome').value,
                    sobnmDigit: document.getElementById('Sobnome').value,
                    emailDigit: document.getElementById('email').value,
                    senhaDigit: Senha,
                    nmrTelDigit: document.getElementById('nmrTel').value,
                    cpfdigit: document.getElementById('nmrcpf').value
                };

                try {
                    const response = await fetch('/cadastrarB', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(dadosForm)
                    });

                    if (response.ok) {
                        modalTermosB.close();
                        // Redireciona para a página desejada
                        window.location.href = "/planosCadastro";
                    } else {
                        const data = await response.json();
                        alert(data.msg);
                        modalTermosB.close();
                    }
                } catch (erro) {
                    console.error('Erro ao enviar dados do formulário: ', erro);
                    alert('Ocorreu um erro ao tentar criar a conta!');
                }

            } else {
                alert('Os campos são obrigatórios');
            }
        };

    });
})();

document.addEventListener('DOMContentLoaded', function() {
    var nmr = document.getElementById('nmrTel');
    nmr.addEventListener('input', function() {
        var value = nmr.value.replace(/\D/g, '');
        if (value.length > 11) value = value.substring(0, 11);
        var formattedValue = value.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
        nmr.value = formattedValue;
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var cpfInput = document.getElementById('nmrcpf');
    cpfInput.addEventListener('input', function() {
        var value = cpfInput.value.replace(/\D/g, '');
        if (value.length > 11) value = value.substring(0, 11); 
        var formattedValue = value.replace(/^(\d{3})(\d{3})?(\d{3})?(\d{2})?$/, function(_, p1, p2, p3, p4) {
            var result = p1;
            if (p2) result += '.' + p2;
            if (p3) result += '.' + p3;
            if (p4) result += '-' + p4;
            return result;
        });
        cpfInput.value = formattedValue;
    });
});

