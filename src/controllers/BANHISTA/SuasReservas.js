const { ModelCarrinho } = require("../../models/carrinho");
const { ModelCliente } = require("../../models/cliente");
const { ModelImgCarrinho } = require("../../models/imgCarrinho");
const { ModelReserva } = require("../../models/reserva");
const moment = require('moment-timezone');

module.exports = {
    CarregarReservas: async (req, res) => {
        const idUsuario = req.cookies.cookie_usuario;

        const reservas = await ModelReserva.findAll({
            where: {
                cd_cliente: idUsuario
            }
        });

        console.log(reservas);

        const today = moment().tz('America/Sao_Paulo').startOf('day');
        const reservasHoje = [];
        const reservasFuturas = [];
        const reservasFinalizadasOuCanceladas = [];

        for (let reserva of reservas) {
            const cliente = await ModelCliente.findOne({
                where: { cd_cliente: reserva.cd_cliente }
            });

            const carrinho = await ModelCarrinho.findOne({
                where: { cd_carrinho: reserva.cd_carrinho }
            });

            const imgs = await ModelImgCarrinho.findAll({
                where: {
                    cd_carrinho: carrinho.cd_carrinho
                },
                attributes: ['nm_imgCarrinho']
            });

            const primeiraFoto = imgs.length > 0 ? imgs[0].nm_imgCarrinho : 'indisponivel.png';

            reserva.dataValues.cliente = cliente;
            reserva.dataValues.carrinho = carrinho;
            reserva.dataValues.Fotocarrinho = primeiraFoto;

            const dataReserva = moment(reserva.dt_reserva).tz('America/Sao_Paulo').startOf('day');

            if (reserva.ds_reserva === 'Ativa') {
                if (dataReserva.isSame(today, 'day')) {
                    reservasHoje.push(reserva);
                } else if (dataReserva.isAfter(today, 'day')) { 
                    reservasFuturas.push(reserva);
                    console.log(reserva.dt_reserva)
                }
            } else if (reserva.ds_reserva === 'Cancelada' || reserva.ds_reserva === 'Finalizada') {
                reservasFinalizadasOuCanceladas.push(reserva);
            }
        }

        // Passando as reservas para o template EJS
        res.render('banhista/suasReservas/index', {
            reservasHoje: reservasHoje,
            reservasFuturas: reservasFuturas,
            reservasAnteriores: reservasFinalizadasOuCanceladas,
            moment: moment
        });
    }
};
