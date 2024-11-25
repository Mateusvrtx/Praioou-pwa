const { ModelPedido } = require("../../models/pedido");
const { ModelSacola } = require("../../models/sacola");
const { ModelProduto } = require("../../models/produto");
const { format } = require('date-fns');
const { ptBR, ca } = require("date-fns/locale");
const { ModelCarrinho } = require("../../models/carrinho");
const Cardapio = require("../AMBULANTE/Cardapio");
const { where } = require("sequelize");
const { ModelCardapio } = require("../../models/cardapio");
const moment = require('moment-timezone');

module.exports = {
    AddItemSacola: async (req, res) => {
        try {
            const cd_usuario = req.cookies.cookie_usuario;
            const { cd_produto, quantidade, id } = req.body;
    
            console.log(id);
    
            const cardapio = await ModelCardapio.findOne({ where: { cd_cardapio: id } });
    
            const carrinhoCardapio = await ModelCarrinho.findOne({ where: { cd_carrinho: cardapio.cd_carrinho } });
    
            const carrinho = carrinhoCardapio.cd_carrinho;
    
            let pedido = await ModelPedido.findOne({
                where: {
                    cd_carrinho: carrinho,
                    cd_cliente: cd_usuario,
                    ds_status: 'pendente'
                }
            });

            const dataBrasilia = moment().tz('America/Sao_Paulo');

            const dataUtc = dataBrasilia.clone().subtract(3, 'hours').format('YYYY-MM-DD HH:mm:ss');

            if (!pedido) {
                pedido = await ModelPedido.create({
                    cd_carrinho: carrinho,
                    cd_cliente: cd_usuario,
                    vl_total_pedido: null,
                    ds_guarda_sol: '2B',
                    dt_pedido: dataUtc, // Salvando a data em UTC
                    ds_tipo_pagamento: null,
                    ds_status: 'pendente'
                });
            }
    
            let item = await ModelSacola.findOne({
                where: {
                    cd_pedido: pedido.cd_pedido,
                    cd_produto: cd_produto
                }
            });
    
            if (item) {
                item.quantidade += quantidade;
                await item.save();
            } else {
                await ModelSacola.create({
                    cd_pedido: pedido.cd_pedido,
                    cd_produto,
                    quantidade
                });
            }
    
            const itensSacola = await ModelSacola.findAll({
                where: {
                    cd_pedido: pedido.cd_pedido
                }
            });
    
            let valorTotal = 0;
            for (const item of itensSacola) {
                const produto = await ModelProduto.findByPk(item.cd_produto);
                valorTotal += produto.vl_produto * item.quantidade;
            }
    
            await ModelPedido.update({
                vl_total_pedido: valorTotal
            }, {
                where: {
                    cd_pedido: pedido.cd_pedido
                }
            });
    
            res.status(201).send('Item adicionado à sacola com sucesso');
        } catch (error) {
            console.error('Erro ao adicionar item à sacola:', error);
            res.status(500).send('Erro ao adicionar item à sacola');
        }
    },
    

    MostraItensSacola: async (req, res) => {
        try {
            const cd_usuario = req.cookies.cookie_usuario;
            const pedido = await ModelPedido.findOne({
                 where: { 
                    cd_cliente: cd_usuario,
                    ds_status: 'pendente'
                    } });

            if (!pedido) {
                console.log(`Pedido não encontrado para o usuário: ${cd_usuario}`);
                res.render('banhista/sacola/index', { itensDetalhados: [], valorTotal: 0 });
                return;
            }

            const itensSacola = await ModelSacola.findAll({
                where: { cd_pedido: pedido.cd_pedido },
                include: [{
                    model: ModelProduto,
                    attributes: ['nm_produto', 'vl_produto', 'nm_imgProduto'],
                    required: false
                }]
            });

            let valorTotal = 0;
            const itensDetalhados = itensSacola.map(item => {
                if (!item.produto) {
                    console.error(`Produto com cd_produto ${item.cd_produto} não encontrado.`);
                    return {
                        id: item.cd_produto,
                        nome: 'Produto não encontrado',
                        valor: 0,
                        quantidade: item.quantidade
                    };
                }

                valorTotal += item.produto.vl_produto * item.quantidade;

                return {
                    id: item.cd_produto,
                    nome: item.produto.nm_produto,
                    valor: item.produto.vl_produto,
                    quantidade: item.quantidade,
                    imgProduto: item.produto.nm_imgProduto
                };
            });

            res.render('banhista/sacola/index', { itensDetalhados, valorTotal });
        } catch (error) {
            console.error('Erro ao obter itens da sacola:', error);
            res.status(500).send('Erro ao obter itens da sacola');
        }
    },
    
    UpdateQuantidade: async (req, res) => {
        try {
            const { id, quantidade } = req.body;
            
            const item = await ModelSacola.findOne({ where: { cd_produto: id } });
            
            item.quantidade = quantidade;
            await item.save();

            const pedido = await ModelPedido.findOne({where: {cd_pedido: item.cd_pedido}})

            const itensSacola = await ModelSacola.findAll({
                where: {
                    cd_pedido: pedido.cd_pedido
                }
            });

            let valorTotal = 0;
            for (const item of itensSacola) {
                const produto = await ModelProduto.findByPk(item.cd_produto);
                valorTotal += produto.vl_produto * item.quantidade;
            }

            await ModelPedido.update({
                vl_total_pedido: valorTotal
            }, {
                where: {
                    cd_pedido: pedido.cd_pedido
                }
            });


            res.status(200).send('Quantidade atualizada com sucesso');
        } catch (error) {
            console.error('Erro ao atualizar quantidade:', error);
            res.status(500).send('Erro ao atualizar quantidade');
        }
    },

    RemoveProduto: async (req, res) => {
        try {
            const { id } = req.body;

            const item = await ModelSacola.findOne({ where: { cd_produto: id } });

            if (!item) {
                return res.status(404).send('Item não encontrado na sacola');
            }

            const produto = await ModelProduto.findOne({where: {cd_produto: id}})

            const vlProduto = produto.vl_produto
            const qttProduto = item.quantidade
            const pedido = await ModelPedido.findOne({where: {cd_pedido: item.cd_pedido}})

            const vlTotal = pedido.vl_total_pedido

            const novoTotal = vlTotal - (vlProduto * qttProduto)

            await ModelPedido.update({
                vl_total_pedido: novoTotal
            }, {
                where: {
                    cd_pedido: pedido.cd_pedido
                }
            });
            
            await item.destroy();

            const sacolas = await ModelSacola.findAll({where: {cd_pedido: item.cd_pedido}})
            
            if(sacolas.length <= 0) {
                await pedido.destroy();
            }

            res.status(200).send('Produto removido com sucesso');
        } catch (error) {
            console.error('Erro ao remover produto:', error);
            res.status(500).send('Erro ao remover produto');
        }
    },
};
