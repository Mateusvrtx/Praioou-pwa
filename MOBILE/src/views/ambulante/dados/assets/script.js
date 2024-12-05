google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(() => {
    const radiosCarrinho = document.querySelectorAll('input[name="carrinho"]');    
    const lastCarrinhoId = radiosCarrinho[radiosCarrinho.length - 1].value;    
    radiosCarrinho[radiosCarrinho.length - 1].checked = true;
    initChart(lastCarrinhoId, 'Reserva', 'hoje');

    const opcoes = document.querySelectorAll('input[name="opcoes"]');

    opcoes.forEach(option => {
        option.addEventListener('change', function() {
            const carrinho = document.querySelector('input[name="carrinho"]:checked');
            const tempo = document.querySelector('input[name="tempo"]:checked');
            
            initChart(carrinho.value, this.value, tempo.value);
        });
    });

    radiosCarrinho.forEach(radio => {
        radio.addEventListener('change', function() {
            const opcao = document.querySelector('input[name="opcoes"]:checked');
            const tempo = document.querySelector('input[name="tempo"]:checked');
            
            initChart(this.value, opcao.value, tempo.value);
        });
    });

    const tempo = document.querySelectorAll('input[name="tempo"]');

    tempo.forEach(tempo => {
        tempo.addEventListener('change', function() {
            const carrinho = document.querySelector('input[name="carrinho"]:checked');
            const opcao = document.querySelector('input[name="opcoes"]:checked');

            initChart(carrinho.value, opcao.value, this.value);
        })
    })

});

async function initChart(id, opc, data) {
    let chartType = document.querySelector('input[name="chartType"]:checked').value;

    const info = {
        id: id,
        opc: opc,
        data: data
    };

    console.log(data);

    const response = await fetch('/dados/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(info)
    });

    if (response.status === 200) {
        const reservas = await response.json();
        const reservaInfo = reservas.dados;
    
        function getData(){
            const data = new google.visualization.DataTable();
    
            if (reservas.tipo === 'hoje') {
                data.addColumn('string', 'Hora');
                data.addColumn('number', 'Total de Reservas:');
                reservaInfo.forEach(row => {
                    data.addRow([row.hora, row.totalReservas]);
                });
            } else if (reservas.tipo === 'ultimaSemana') {
                data.addColumn('string', 'Dia da Semana');
                data.addColumn('number', 'Total de Reservas:');
                reservaInfo.forEach(row => {
                    data.addRow([row.data, row.totalReservas]);
                });
            } else if (reservas.tipo === 'ultimoMes') {
                data.addColumn('string', 'Dia do mês');
                data.addColumn('number', 'Total de Reservas:');
                reservaInfo.forEach(row => {
                    data.addRow([row.data, row.totalReservas]);
                });
            } else if (reservas.tipo === 'ultimosSeisMeses') {
                data.addColumn('string', 'Mês');
                data.addColumn('number', 'Total de Reservas:');
                reservaInfo.forEach(row => {
                    data.addRow([row.data, row.totalReservas]);
                });
            }
    
            return data;
        }
    
        function drawChart() {
            const chartContainer = document.getElementById('chart_div');
            const data = getData(chartType);
            let chart;
    
            switch (chartType) {
                case 'LineChart':
                    chart = new google.visualization.LineChart(chartContainer);
                    break;
                case 'BarChart':
                    chart = new google.visualization.BarChart(chartContainer);
                    break;
                default:
                    chart = new google.visualization.ColumnChart(chartContainer);
            }
            chart.draw(data, options);
        }
    
        const options = {
            hAxis: { 
                title: reservas.tipo === 'hoje' ? 'Hora' : reservas.tipo === 'ultimaSemana' ? 'Dia da Semana' : reservas.tipo === 'ultimoMes' ? 'Dia e Mês' : 'Mês' 
            },
            legend: 'right',
            colors: ['#008b92'],
            width: window.innerWidth * 0.9,
            animation: {
                duration: 400,
                easing: 'out',
                startup: true
            }
        };
    
        document.querySelectorAll('input[name="chartType"]').forEach(radio => {
            radio.addEventListener('change', function() {
                chartType = this.value;
                drawChart();
            });
        });
    
        drawChart();
    }
     else if (response.status === 201) {
        const resultado = await response.json();
        const pedidos = resultado.dados;
    
        function getData() {
            const data = new google.visualization.DataTable();
    
            if (resultado.tipo === 'hoje') {
                data.addColumn('string', 'Hora');
                data.addColumn('number', 'Total de pedidos:');
                pedidos.forEach(row => {
                    data.addRow([row.hora, row.totalPedidos]);
                });
            } else if (resultado.tipo === 'ultimaSemana') {
                data.addColumn('string', 'Dia da Semana');
                data.addColumn('number', 'Total de Pedidos');
                pedidos.forEach(row => {
                    data.addRow([row.data, row.totalPedidos]);
                });
            } else if (resultado.tipo === 'ultimoMes') {
                data.addColumn('string', 'Dia e Mês');
                data.addColumn('number', 'Total de Pedidos');
                pedidos.forEach(row => {
                    data.addRow([row.data, row.totalPedidos]);
                });
            } else if (resultado.tipo === 'ultimosSeisMeses') {
                data.addColumn('string', 'Mês');
                data.addColumn('number', 'Total de Pedidos');
                pedidos.forEach(row => {
                    data.addRow([row.data, row.totalPedidos]);
                });
            }
    
            return data;
        }
        
        function drawChart() {
            const chartContainer = document.getElementById('chart_div');
            const data = getData();
            let chart;
    
            switch (chartType) {
                case 'LineChart':
                    chart = new google.visualization.LineChart(chartContainer);
                    break;
                case 'BarChart':
                    chart = new google.visualization.BarChart(chartContainer);
                    break;
                default:
                    chart = new google.visualization.ColumnChart(chartContainer);
            }
            chart.draw(data, options);
        }
    
        const options = {
            hAxis: { 
                title: resultado.tipo === 'hoje' ? 'Hora' : resultado.tipo === 'ultimaSemana' ? 'Dia da Semana' : resultado.tipo === 'ultimoMes' ? 'Dia e Mês' : 'Mês' 
            },
            legend: 'right',
            colors: ['#008b92'],
            width: window.innerWidth * 0.9,
            animation: {
                duration: 400,
                easing: 'out',
                startup: true
            }
        };
    
        document.querySelectorAll('input[name="chartType"]').forEach(radio => {
            radio.addEventListener('change', function() {
                chartType = this.value;
                drawChart();
            });
        });
    
        drawChart();
    } else if (response.status === 202) {

        const resultado = await response.json();
        const clientes = resultado.dados;

        function getData() {
            const data = new google.visualization.DataTable();

            if (resultado.tipo === 'hoje') {
                data.addColumn('string', 'Hora');
                data.addColumn('number', 'Clientes:');
                clientes.forEach(row => {
                    data.addRow([row.hora, row.totalClientes]);
                });
            } else if (resultado.tipo === 'ultimaSemana') {
                data.addColumn('string', 'Dia da Semana');
                data.addColumn('number', 'Clientes:');
                clientes.forEach(row => {
                    data.addRow([row.data, row.totalClientes]);
                });
            } else if (resultado.tipo === 'ultimoMes') {
                data.addColumn('string', 'Dia do Mês');
                data.addColumn('number', 'Clientes:');
                clientes.forEach(row => {
                    data.addRow([row.data, row.totalClientes]);
                });
            } else if (resultado.tipo === 'ultimosSeisMeses') {
                data.addColumn('string', 'Mês');
                data.addColumn('number', 'Clientes:');
                clientes.forEach(row => {
                    data.addRow([row.data, row.totalClientes]);
                });
            }

            return data;
        }

        function drawChart() {
            const chartContainer = document.getElementById('chart_div');
            const data = getData();
            let chart;

            switch (chartType) {
                case 'LineChart':
                    chart = new google.visualization.LineChart(chartContainer);
                    break;
                case 'BarChart':
                    chart = new google.visualization.BarChart(chartContainer);
                    break;
                default:
                    chart = new google.visualization.ColumnChart(chartContainer);
            }
            chart.draw(data, options);
        }

        const options = {
            hAxis: { 
                title: resultado.tipo === 'hoje' ? 'Hora' : resultado.tipo === 'ultimaSemana' ? 'Dia da Semana' : resultado.tipo === 'ultimoMes' ? 'Dia do Mês' : 'Mês'
            },
            legend: 'right',
            colors: ['#008b92'],
            width: window.innerWidth * 0.9,
            animation: {
                duration: 400,
                easing: 'out',
                startup: true
            }
        };

        document.querySelectorAll('input[name="chartType"]').forEach(radio => {
            radio.addEventListener('change', function() {
                chartType = this.value;
                drawChart();
            });
        });

        drawChart();
    } else if (response.status === 203) {
        const resultado = await response.json();
        const lucro = resultado.dados;
    
        function getData() {
            const data = new google.visualization.DataTable();
    
            if (resultado.tipo === 'hoje') {
                data.addColumn('string', 'Hora');
                data.addColumn('number', 'Valor: R$');
                lucro.forEach(row => {
                    data.addRow([row.hora, row.totalPedidos]);
                });
            } else if (resultado.tipo === 'ultimaSemana') {
                data.addColumn('string', 'Dia da Semana');
                data.addColumn('number', 'Valor: R$');
                lucro.forEach(row => {
                    data.addRow([row.data, row.totalPedidos]);
                });
            } else if (resultado.tipo === 'ultimoMes') {
                data.addColumn('string', 'Dia e Mês');
                data.addColumn('number', 'Valor: R$');
                lucro.forEach(row => {
                    data.addRow([row.data, row.totalPedidos]);
                });
            } else if (resultado.tipo === 'ultimosSeisMeses') {
                data.addColumn('string', 'Mês');
                data.addColumn('number', 'Valor: R$');
                lucro.forEach(row => {
                    data.addRow([row.data, row.totalPedidos]);
                });
            }
    
            return data;
        }
        
        function drawChart() {
            const chartContainer = document.getElementById('chart_div');
            const data = getData();
            let chart;
    
            switch (chartType) {
                case 'LineChart':
                    chart = new google.visualization.LineChart(chartContainer);
                    break;
                case 'BarChart':
                    chart = new google.visualization.BarChart(chartContainer);
                    break;
                default:
                    chart = new google.visualization.ColumnChart(chartContainer);
            }
            chart.draw(data, options);
        }
    
        const options = {
            hAxis: { 
                title: resultado.tipo === 'hoje' ? 'Hora' : resultado.tipo === 'ultimaSemana' ? 'Dia da Semana' : resultado.tipo === 'ultimoMes' ? 'Dia e Mês' : 'Mês' 
            },
            legend: 'right',
            colors: ['#008b92'],
            width: window.innerWidth * 0.9,
            animation: {
                duration: 400,
                easing: 'out',
                startup: true
            }
        };
    
        document.querySelectorAll('input[name="chartType"]').forEach(radio => {
            radio.addEventListener('change', function() {
                chartType = this.value;
                drawChart();
            });
        });
    
        drawChart();
    }
       
}

// CARROSSEL 
document.addEventListener('DOMContentLoaded', function() {
    const prev = document.querySelector('#next');
    const next = document.querySelector('#prev');
    const carousel = document.querySelector('.cards');
    const base = document.querySelector('.base');

    const qttCard = document.querySelectorAll('.cardCarrinho').length

    let scrollPosition = 0;
    const cardWidth = document.querySelector('.cardCarrinho').offsetWidth / window.innerWidth * 110;
    const margin = 28;
    const visibleCards = 3;

    carousel.style.width = `${(qttCard + 1) * cardWidth + margin * 5}vw`;

    const cardWidthInVW = cardWidth;
    const scrollAmount = cardWidthInVW * visibleCards;

    const maxScroll = (carousel.scrollWidth / window.innerWidth * 115) - (base.offsetWidth / window.innerWidth * 100);

    prev.addEventListener('click', () => {
        if (scrollPosition > 0) {
            scrollPosition -= scrollAmount;
            if (scrollPosition < 0) scrollPosition = 0;
            carousel.style.transform = `translateX(${scrollPosition}vw)`;
        }
    });

    next.addEventListener('click', () => {
        if (scrollPosition < maxScroll) {
            scrollPosition += scrollAmount;
            if (scrollPosition > maxScroll) scrollPosition = maxScroll;
            carousel.style.transform = `translateX(${scrollPosition}vw)`;
        }
    });
});