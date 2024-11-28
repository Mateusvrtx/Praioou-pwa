const { conexaoSequelize } = require("../../../config/bdConnection");
const { ModelCardapio } = require("../../models/cardapio");
const { ModelProduto } = require("../../models/produto");
const { Sequelize, Op, fn } = require('sequelize');

module.exports = {
    filtroSalgado: async (req, res) => {
        try {
            const carrinho = req.params.id;

            if (!carrinho) {
                return res.status(400).json({ msg: 'ID do carrinho não foi fornecido.' });
            }

            const cardapio = await ModelCardapio.findOne({ where: { cd_carrinho: carrinho } });

            if (!cardapio) {
                return res.status(404).json({ msg: 'Cardápio não encontrado para o carrinho fornecido.' });
            }

            const produtos = await ModelProduto.findAll({
                where: {
                    cd_cardapio: cardapio.cd_cardapio,
                    ds_categoria: 'salgado'
                }
            });

            return res.json(produtos);
        } catch (error) {
            console.error('Erro ao filtrar produtos salgados:', error);
            return res.status(500).json({ msg: 'Erro ao buscar produtos salgados.', error: error.message });
        }
    },

    filtroDoce: async (req, res) => {
        try {
            const carrinho = req.params.id;

            if (!carrinho) {
                return res.status(400).json({ msg: 'ID do carrinho não foi fornecido.' });
            }

            const cardapio = await ModelCardapio.findOne({ where: { cd_carrinho: carrinho } });

            if (!cardapio) {
                return res.status(404).json({ msg: 'Cardápio não encontrado para o carrinho fornecido.' });
            }

            const produtos = await ModelProduto.findAll({
                where: {
                    cd_cardapio: cardapio.cd_cardapio,
                    ds_categoria: 'doce'
                }
            });

            return res.json(produtos);
        } catch (error) {
            console.error('Erro ao filtrar produtos salgados:', error);
            return res.status(500).json({ msg: 'Erro ao buscar produtos salgados.', error: error.message });
        }
    },

    filtroBebida: async (req, res) => {
        try {
            const carrinho = req.params.id;

            if (!carrinho) {
                return res.status(400).json({ msg: 'ID do carrinho não foi fornecido.' });
            }

            const cardapio = await ModelCardapio.findOne({ where: { cd_carrinho: carrinho } });

            if (!cardapio) {
                return res.status(404).json({ msg: 'Cardápio não encontrado para o carrinho fornecido.' });
            }

            const produtos = await ModelProduto.findAll({
                where: {
                    cd_cardapio: cardapio.cd_cardapio,
                    ds_categoria: 'bebida'
                }
            });

            return res.json(produtos);
        } catch (error) {
            console.error('Erro ao filtrar produtos salgados:', error);
            return res.status(500).json({ msg: 'Erro ao buscar produtos salgados.', error: error.message });
        }
    },

    FiltroPrecoTempo: async (req, res) => {
        try {
            const carrinho = req.params.id;
    
            if (!carrinho) {
                return res.status(400).json({ msg: 'ID do carrinho não foi fornecido.' });
            }
    
            const cardapio = await ModelCardapio.findOne({ where: { cd_carrinho: carrinho } });
    
            if (!cardapio) {
                return res.status(404).json({ msg: 'Cardápio não encontrado para o carrinho fornecido.' });
            }
    
            const { vlProduto, tmpPreparo, tipoFiltro } = req.body;
    
            let condicao = {
                cd_cardapio: cardapio.cd_cardapio,
            };
    
            if (vlProduto !== null) {
                condicao.vl_produto = { [Op.between]: [0, vlProduto] };
            }
    
            if (tmpPreparo !== null) {
                condicao.hr_tempo_preparo = { [Op.between]: [0, tmpPreparo] };
            }
    
            if (tipoFiltro) {
                condicao.ds_categoria = tipoFiltro;
            }
    
            const produtos = await ModelProduto.findAll({
                where: condicao,
            });
    
            return res.json(produtos);
        } catch (error) {
            console.error('Erro ao filtrar produtos:', error);
            return res.status(500).json({ msg: 'Erro ao buscar produtos.', error: error.message });
        }
    }
}
