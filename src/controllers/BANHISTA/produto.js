const { ModelCardapio } = require('../../models/cardapio');
const { ModelCarrinho } = require('../../models/carrinho');
const { ModelProduto } = require('../../models/produto');

const findAllProdutos = async (req, res) => {
    try {
        const IdCarrinho = req.params.id;

        const cardapio = await ModelCardapio.findOne({where: {cd_carrinho: IdCarrinho}})

        const produtos = await ModelProduto.findAll({ where: {cd_cardapio: cardapio.cd_cardapio}});

        res.json(produtos);
    } catch (error) {
        res.status(500).send('Erro ao buscar produtos');
    }
}

module.exports = { findAllProdutos };
