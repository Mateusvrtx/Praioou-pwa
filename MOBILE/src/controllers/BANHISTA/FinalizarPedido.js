const { ModelPedido } = require("../../models/pedido");

module.exports = {
    FinalizarPedido: async (req, res) => {
        const {
            metodo
        } = req.body

        await ModelPedido.update({
            ds_tipo_pagamento: metodo
        }, {
            where: {
                ds_status: 'pendente'
            }
        });
    }
}