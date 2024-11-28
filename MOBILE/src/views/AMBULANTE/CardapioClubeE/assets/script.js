document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"][name="produtos"]');
    
    checkboxes.forEach(checkbox => {
        console.log(checkbox.value)
        if (checkbox.value === 'true') {
            console.log(`Marcando checkbox: ${checkbox.id}`);
            checkbox.checked = true;
        }
    });

    const contador = document.getElementById('contador');

    const atualizarContador = () => {
        let totalMarcados = 0;
        checkboxes.forEach(checkbox => {
            if (checkbox.checked && checkbox.value != 'true') {
                totalMarcados++;
            }
        });
        contador.textContent = totalMarcados;
    };

    atualizarContador();

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', atualizarContador);
    });
});

const btnAddProduto = document.getElementById('btnAddProduto');

btnAddProduto.onclick = async function() {

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id') || window.location.pathname.split('/').pop();

    const checkboxes = document.querySelectorAll('input[type="checkbox"][name="produtos"]');
    const idsAdd = [];
    const idsExcluir = [];

    for (const checkbox of checkboxes) {
        if (checkbox.value !== 'true' && checkbox.checked) {
            idsAdd.push(checkbox.id);
        }

        if (checkbox.value === 'true' && !checkbox.checked) {
            idsExcluir.push(checkbox.id);
        }
    }

    if (idsAdd.length > 0) {
        const response = await fetch('/addProdutoClube', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ids: idsAdd, tipo: 'add'}) 
        });
        if (response.ok) {
            const data = await response.json();
            console.log('Produtos adicionados:', data);
            window.location.href = `/cardapio-clube/${id}`
        } else {
            console.error('Erro ao adicionar produtos:', response.statusText);
        }
    }

    if (idsExcluir.length > 0) {
        const response = await fetch('/addProdutoClube', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ids: idsExcluir, tipo: 'excluir'}) 
        });
        if (response.ok) {
            const data = await response.json();
            console.log('Produtos adicionados:', data);
            window.location.href = `/cardapio-clube/${id}`
        } else {
            console.error('Erro ao adicionar produtos:', response.statusText);
        }
    }
};

