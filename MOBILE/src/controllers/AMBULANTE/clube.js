const { ModelCardapio } = require("../../models/cardapio");
const { ModelCarrinho } = require("../../models/carrinho");
const { ModelClubeB } = require("../../models/clubeb");
const { ModelProduto } = require("../../models/produto");

module.exports = {
    CarregarEditClube: async(req, res) => {
        try {
            const idCLube = req.params.idClube
            const usuario = req.cookies.cookie_usuario;
        
            const carrinhos = await ModelCarrinho.findAll({ where: { cd_barraqueiro: usuario }});
            const clube = await ModelClubeB.findOne({where: {cd_clube: idCLube}})
            const cardapio = await ModelCardapio.findOne({where: {cd_carrinho: clube.cd_carrinho}})
            const qttProdutosClube = await ModelProduto.count({where: {cd_cardapio: cardapio.cd_cardapio, bl_produto_clube: true}})

            res.render('ambulante/EditClube/index', {
                clube: clube,
                carrinhos: carrinhos,
                qttProdutos: qttProdutosClube
            })
        }catch(error){
            console.log('Erro ao carregar clube', error)
            return res.status(500).send('Erro ao carregar clube')
        }
    },

    EditarClube: async(req, res) => {
        try {
            const {
                nmClube,
                idCarrinho,
                vlEntrada,
                dsVantagens,
                idClube
            } = req.body

            await ModelClubeB.update(
            {
                nm_clube: nmClube,
                cd_carrinho: idCarrinho,
                vl_entrada: vlEntrada,
                ds_diferencial: dsVantagens
            },{
                where: {
                    cd_clube: idClube
                }
            }
        )
        return res.status(200).json({ message: 'Produtos atualizados com sucesso' });

        }catch (error){
            console.log('Erro ao editar clube', error)
            return res.status(500).send('Erro ao editar clube')
        }
    }
}