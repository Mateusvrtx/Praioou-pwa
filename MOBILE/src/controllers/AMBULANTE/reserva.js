const { conexaoSequelize } = require("../../../config/bdConnection");
const { ModelCarrinho } = require("../../models/carrinho");
const { ModelReserva } = require("../../models/reserva");
const fetch = require('node-fetch');
const moment = require('moment');
const { ModelCliente } = require("../../models/cliente");

const PagamentoReserva = async (req, res) => {
    try {
        const usuario = req.cookies.cookie_usuario;
        const { dtReserva, hrReserva, dsReserva, hrLembrete, nmReservante, id } = req.body;

        let NomeReservante = nmReservante

        if (nmReservante === 'Usuário Logado') {
            const user = await ModelCliente.findOne({where: {cd_cliente: usuario}})

            NomeReservante = user.nm_cliente
        }

        const carrinho = await ModelCarrinho.findOne({ where: { cd_carrinho: 1 } });

        const dataFormatada = moment(dtReserva, 'DD/MM/YYYY', true).isValid() 
        ? moment(dtReserva, 'DD/MM/YYYY').format('YYYY-MM-DD') 
        : moment().format('YYYY-MM-DD');

        const novaReserva = await ModelReserva.create({
            cd_carrinho: id,
            cd_cliente: usuario,
            dt_reserva: dataFormatada,
            hr_reserva: hrReserva,
            vl_reserva: carrinho.vl_reserva,
            ds_reserva: dsReserva,
            ds_pagamento: 'pendente',
            hr_lembrete: hrLembrete,
            nm_reservante: NomeReservante
        });

        const paymentLink = await PagarReserva(novaReserva.cd_reserva, carrinho.vl_reserva);

        res.json({ redirectUrl: paymentLink });  
    } catch (error) {
        console.log(error);
        res.status(500).send('Erro ao processar a reserva');
    }
};

const PagarReserva = async (id, vlReserva) => {
    const token = "APP_USR-7499033670655943-050513-0932d668bdd5cea0c60756b716bdf096-663046811";

    const paymentData = {
        items: [
            { id: id, title: "Reserva", quantity: 1, currency_id: "BRL", unit_price: vlReserva }
        ],
        back_urls: {
            success: `http://localhost:3000/reservaPaga/${id}`,
            failure: `http://localhost:3000/reservaPaga/${id}`,
            pending: "http://localhost:3000/reservaPendente"
        },
        auto_return: "all"
    };

    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(paymentData)
    });

    const responseData = await response.json();
    return responseData.init_point; 
}

module.exports = {
    PagamentoReserva
}
