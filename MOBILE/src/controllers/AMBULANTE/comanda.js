const { ModelCarrinho } = require("../../models/carrinho");
const { ModelPedido } = require("../../models/pedido");
const { ModelSacola } = require("../../models/sacola");
const { ModelProduto } = require("../../models/produto");
const { ModelCliente } = require("../../models/cliente");
const { format } = require('date-fns');
const { Op } = require('sequelize');

module.exports = {
    RenderCarrinhos: async (req, res) => {
        const usuario = req.cookies.cookie_usuario;

        try {
            const carrinhos = await ModelCarrinho.findAll({ where: { cd_barraqueiro: usuario } });

            res.render('ambulante/comanda/index', {
                carrinho: carrinhos
            });
        } catch (error) {
            console.error('Erro ao buscar carrinhos:', error);
            res.status(500).send('Erro ao buscar carrinhos');
        }
    },

    RenderComanda: async (req, res) => {
        try {
            const carrinho = req.body.cd_carrinho;
            const usuario = req.cookies.cookie_usuario;
            
            const pedidos = await ModelPedido.findAll({ 
                where: { 
                    cd_carrinho: carrinho,
                    ds_status: 'pago'
                } 
            });

            const DetalhesPedido = [];

            for (const details of pedidos) {

                const dataHora = details.dt_pedido

                console.log(dataHora)

                const horaFormatada = format(dataHora, 'HH:mm');

                const sacola = await ModelSacola.findAll({ where: { cd_pedido: details.cd_pedido } });
                const produtos = [];

                for (const produto of sacola) {
                    const produtoDetalhe = await ModelProduto.findOne({
                        where: { cd_produto: produto.cd_produto }
                    });

                    produtos.push({
                        nome: produtoDetalhe.nm_produto,
                        valorProduto: produtoDetalhe.vl_produto,
                        quantidade: produto.quantidade
                    });
                }

                const Cliente = await ModelCliente.findOne({ where: { cd_cliente: details.cd_cliente } });

                DetalhesPedido.push({
                    cliente: Cliente,
                    produtos: produtos,
                    valorTotalPedido: details.vl_total_pedido,
                    cdPedido: details.cd_pedido,
                    dataPedido: dataHora,
                    horaPedido: horaFormatada,
                    Pagamento: details.ds_tipo_pagamento
                });
            } 

            const totalPedidos = await ModelPedido.findAll({where: {cd_carrinho: carrinho, ds_status: {[Op.or]: ['pago', 'entregue']}}})

            const PedidosPendentes = await ModelPedido.findAll({where: {cd_carrinho: carrinho, ds_status:'pago'}})

            const PedidosEntregues = await ModelPedido.findAll({where: {cd_carrinho: carrinho, ds_status:'entregue'}})

            res.json({
                totalPedidos: totalPedidos.length,
                pedidosPendentes: PedidosPendentes.length,
                pedidosEntregues: PedidosEntregues.length,
                pedidos: pedidos,
                detalhesPedido: DetalhesPedido
            });
        } catch (error) {
            console.error('Erro ao buscar pedidos:', error);
            res.status(500).send('Erro ao buscar pedidos');
        }
    },

    CancelarPedido: async (req, res) => {
        const cd_pedido = req.body.cd_pedido

        await ModelPedido.update({
            ds_status: 'cancelado'
        }, {
            where: {
            cd_pedido: cd_pedido
            }
        });
        return res.status(201).json({ msg: `amém` });
    },

    EntregarPedido: async (req, res) => {
        const cd_pedido = req.body.cd_pedido

        await ModelPedido.update({
            ds_status: 'entregue'
        }, {
            where: {
            cd_pedido: cd_pedido
            }
        });
        return res.status(201).json({ msg: `amém` });
    },
};
