const { conexaoSequelize } = require('../../../config/bdConnection');
const { ModelClubeB } = require('../../models/clubeb');
const { ModelClubeUsuario } = require('../../models/clubeUsuario');
const { ModelHistorico } = require('../../models/historico');
const { format } = require('date-fns');
const { ptBR } = require('date-fns/locale');

module.exports = {

    VerificarClube: async(req, res) => {
        const idCarrinho = req.params.id
        const idUsuario = req.cookies.cookie_usuario

        const clube = await ModelClubeB.findOne({where: {cd_carrinho: idCarrinho}})

        const clubeUsuario = await ModelClubeUsuario.findOne({
            where: {
                cd_clube: clube.cd_clube,
                cd_cliente: idUsuario
            }
        })

        if (clubeUsuario) {
            res.status(201).json({id: clube.cd_clube})
        } else {
            res.status(202).json({id: clube.cd_clube})
        }
    },

    CarregarPontosClube: async (req, res) => {
        try {
            const cd_usuario = req.cookies.cookie_usuario;
        
            const usuario = await ModelClubeUsuario.findOne({ where: { cd_cliente: cd_usuario } });
            const historico = await ModelHistorico.findAll({ where: { cd_cliente: cd_usuario } });
        
            const historicoCompleto = historico.map(compra => {
                // Extrai o dia da semana, o número do dia e o mês
                let diaSemana = format(new Date(compra.dt_pedido), 'EEE', { locale: ptBR }); // Três primeiras letras do dia da semana em português
                const dia = format(new Date(compra.dt_pedido), 'd'); // Número do dia
                const mes = format(new Date(compra.dt_pedido), 'MM'); // Número do mês

                // Ajusta o formato do dia da semana para apenas as três primeiras letras em minúsculas
                diaSemana = diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1, 3).toLowerCase();

                return {
                    diaSemana,
                    dia,
                    mes,
                    pontos: compra.vl_total_pedido
                };
            });

            res.render('banhista/clube/index', {
                pontos: usuario.qt_pontos,
                historicoCompleto
            });
        } catch (error) {
            console.error('Erro ao carregar pontos do clube:', error);
            res.status(500).send('Erro ao processar os pontos do clube.');
        }
    },

    CarregarTodosOsClubes: async (req, res) => {
        const cdUsuario = req.cookies.cookie_usuario

        const clubesUsuario = await ModelClubeUsuario.findAll({ where: {cd_cliente: cdUsuario}})

        const DetalhesClube = []

        for(const clubee of clubesUsuario ) {
            const clube = await ModelClubeB.findOne({where: {cd_clube: clubee.cd_clube}})

            const qttMembros = await ModelClubeUsuario.count({where: {cd_clube: clubee.cd_clube}})

            DetalhesClube.push({
                nmClube: clube.nm_clube,
                dtEntrada: clubee.dt_entrada,
                qttMembros: qttMembros,
                qttPontos: clubee.qt_pontos,
                imgClube: clube.nm_imgClube,
                cdClube: clube.cd_clube
            })
        }

        res.render('banhista/TodosClubes/index.ejs', {
            Clubes: DetalhesClube
        })
    }
};
