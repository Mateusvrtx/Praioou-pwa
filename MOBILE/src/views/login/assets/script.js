
(async function() {
    document.getElementById('form-login').addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        const dadosForm = { emailDigit: email, senhaDigit: senha };

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosForm)
            });

            function limparCampo () {
                document.getElementById('email').value = '';
                document.getElementById('senha').value = '';
            }

            
            if (response.status === 200) {
                window.location.href = "/inicial";
                setThemeOnLogin(data.themePreference);  
            } else {
                if (response.status === 404) {
                    const msgErroEmail = document.querySelector("#msgErroEmail");
                    const btnVoltarEmail = document.querySelector("#btnVoltarEmail");

                    msgErroEmail.show();

                    btnVoltarEmail.onclick = function () {
                        msgErroEmail.close();
                    };
                    limparCampo();
                }
                else if (response.status === 401) { 
                    const msgErroUsuario = document.querySelector("#msgErroSenha");
                    const btnVoltarUsuario = document.querySelector("#btnVoltarSenha");

                    msgErroUsuario.show(); 

                    btnVoltarUsuario.onclick = function () {
                        msgErroUsuario.close(); 
                    };

                    document.getElementById('senha').value = '';
                }
                else if (response.status === 201) {
                    window.location.href = "/inicialB";
                    setThemeOnLogin(data.themePreference);  
                }
            }
        } catch (error) {
            console.error('Erro ao enviar dados de login: ', error); 
            limparCampo();
        }
    });
})();

function setThemeOnLogin(themePreference) {
    if (themePreference === 'dark') {
        document.body.classList.add('dark');
        document.body.classList.remove('light');
    } else {
        document.body.classList.add('light');
        document.body.classList.remove('dark');
    }
} 
