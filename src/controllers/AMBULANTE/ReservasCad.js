const { Sequelize } = require("sequelize");
const { format } = require("date-fns");
const { ModelCliente } = require("../../models/cliente");
const { ModelReserva } = require("../../models/reserva");
const { ModelCarrinho } = require("../../models/carrinho");
const moment = require('moment');

module.exports = {
    RenderCarrinhosReserva: async (req, res) => {
        const usuario = req.cookies.cookie_usuario;

        try {
            const carrinhos = await ModelCarrinho.findAll({ where: { cd_barraqueiro: usuario } });

            res.render('ambulante/ReservaCad/index', {
                carrinho: carrinhos
            });
        } catch (error) {
            console.error('Erro ao buscar carrinhos:', error);
            res.status(500).send('Erro ao buscar carrinhos');
        }
    },

    CarregarReservasPorHora: async (req, res) => {
        try {
            const { carrinho, data } = req.body;

            const dataFormatada = moment(data, 'DD/MM/YYYY').startOf('day').format('YYYY-MM-DD');

            console.log(dataFormatada)
    
            const reservas = await ModelReserva.findAll({
                where: {
                    cd_carrinho: carrinho,
                    dt_reserva: dataFormatada
                },
                order: [[Sequelize.col('hr_reserva'), 'ASC']]
            });
    
            const ReservasPorHora = {};
    
            for (const reserva of reservas) {
                const hrReserva = reserva.hr_reserva;
    
                if (!ReservasPorHora[hrReserva]) {
                    ReservasPorHora[hrReserva] = [];
                }
    
                const cliente = await ModelCliente.findOne({ where: { cd_cliente: reserva.cd_cliente } });

                ReservasPorHora[hrReserva].push({
                    nomeReservante: cliente.nm_cliente,
                    descricaoReserva: reserva.ds_reserva,
                    quantidadePessoas: reserva.qt_pessoas,
                    valorReserva: reserva.vl_reserva,
                    tipoPagamento: reserva.ds_pagamento,
                    hrReserva: reserva.hr_reserva,
                    qtPessoas: reserva.qt_pessoas
                });
            }
    
            res.json(ReservasPorHora);
        } catch (error) {
            console.error('Erro ao buscar reservas por hora:', error);
            res.status(500).send('Erro ao buscar reservas');
        }
    }
};