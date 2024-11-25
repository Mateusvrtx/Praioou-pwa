const { ModelCardapio } = require("../../models/cardapio")
const { ModelCarrinho } = require("../../models/carrinho")
const { ModelClubeB } = require("../../models/clubeb")
const { ModelProduto } = require("../../models/produto")

module.exports = {
    CarregarCardapioClube: async (req, res) => {
        try {
            const idClube = req.params.idClube
    
            const clube = await ModelClubeB.findOne({where: {cd_clube: idClube}})
            const carrinho = await ModelCarrinho.findOne({where: {cd_carrinho: clube.cd_carrinho}})
            const cardapioCarrinho = await ModelCardapio.findOne({where: {cd_carrinho: carrinho.cd_carrinho}})
            const produtosClube = await ModelProduto.findAll({
                where: {
                    cd_cardapio: cardapioCarrinho.cd_cardapio,
                    bl_produto_clube: true
                }
            })
    
            res.render('ambulante/CardapioClube/index', {
                produtos: produtosClube,
                id: idClube
            })
        } catch (error) {
            console.log('erro ao carregar o cardápio do clube', error)
            return res.status(500).send('erro ao carregar o cardápio do clube');
        }
    },

    CarregarEditCardapioClube: async (req, res) => {
        try {
            const idClube = req.params.idClube
    
            const clube = await ModelClubeB.findOne({where: {cd_clube: idClube}})
            const carrinho = await ModelCarrinho.findOne({where: {cd_carrinho: clube.cd_carrinho}})
            const cardapioCarrinho = await ModelCardapio.findOne({where: {cd_carrinho: carrinho.cd_carrinho}})
            const produtos = await ModelProduto.findAll({
                where: {
                    cd_cardapio: cardapioCarrinho.cd_cardapio,
                }
            })

            res.render('ambulante/CardapioClubeE/index', {
                produtos: produtos,
            })
        }catch (error) {
            console.log('erro ao carregar o cardápio do clube', error)
            return res.status(500).send('erro ao carregar o cardápio do clube');
        }
    },

    AtualizarProdutoClube: async (req, res) => {
        try {
            const {
                tipo,
                ids 
            } = req.body;
    
            if (tipo === 'add' ){
                await ModelProduto.update(
                    { bl_produto_clube: true },
                    {
                        where: {
                            cd_produto: ids
                        }
                    }
                );
            }
            if (tipo === 'excluir' ){
                await ModelProduto.update(
                    { bl_produto_clube: false },
                    {
                        where: {
                            cd_produto: ids
                        }
                    }
                );
            }
            return res.status(200).json({ message: 'Produtos atualizados com sucesso' });
        } catch (error) {
            console.log('Erro ao atualizar produtos do clube', error);
            return res.status(500).send('Erro ao atualizar produtos do clube');
        }
    }
    
}