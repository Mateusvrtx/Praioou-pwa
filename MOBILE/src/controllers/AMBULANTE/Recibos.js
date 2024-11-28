const { ModelCardapio } = require("../../models/cardapio")
const { ModelCarrinho } = require("../../models/carrinho")
const { ModelCliente } = require("../../models/cliente")
const { ModelPedido } = require("../../models/pedido")
const { ModelProduto } = require("../../models/produto")
const { ModelReserva } = require("../../models/reserva")
const { ModelSacola } = require("../../models/sacola")

module.exports = {
    CarregarCarrinhosRecibos: async (req, res) => {
        const idUsuario = req.cookies.cookie_usuario

        const carrinhos = await ModelCarrinho.findAll({where: {cd_barraqueiro: idUsuario}})
    
        res.render('ambulante/Recibos/index', {
            carrinhos: carrinhos
        })
    },
    CarregarRecibos: async (req, res) => {
        const idCarrinho = req.body.cd_carrinho

        const Todasreservas = await ModelReserva.findAll({where: {cd_carrinho: idCarrinho, ds_reserva: 'Finalizada'}})

        const ReservasD = []

        for (const reserva of Todasreservas) {
            const banhista = await ModelCliente.findOne({where: {cd_cliente: reserva.cd_cliente}})
            ReservasD.push({
                reservas:reserva,
                cliente: banhista
            })
        }

        const TodosPedidos = await ModelPedido.findAll({where: {cd_carrinho: idCarrinho, ds_status: 'entregue'}})

        const DetalhesPedido = [];

        for (const pedido of TodosPedidos) {

            const cliente = await ModelCliente.findOne({where: {cd_cliente: pedido.cd_cliente}})

            const Sacola = await ModelSacola.findAll({
                where: { cd_pedido: pedido.cd_pedido }
            });

            const produtos = [];

            for (const produto of Sacola) {
                const produtoDetalhe = await ModelProduto.findOne({
                    where: { cd_produto: produto.cd_produto }
                });

                produtos.push({
                    nome: produtoDetalhe.nm_produto,
                    ValorProduto: produtoDetalhe.vl_produto,
                    Quantidade: produto.quantidade
                });
            }

            DetalhesPedido.push({
                Produtos: produtos,
                ValorTotalPedido: pedido.vl_total_pedido,
                DataPedido: pedido.dt_pedido,
                tipoPagamento: pedido.ds_tipo_pagamento,
                cliente: cliente
            });
        }

        res.json({
            reservas: ReservasD,
            pedidos: DetalhesPedido
        })
    }
}