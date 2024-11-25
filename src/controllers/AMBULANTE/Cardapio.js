const { ModelCardapio } = require("../../models/cardapio");
const { ModelCarrinho } = require("../../models/carrinho");
const { ModelProduto } = require("../../models/produto");

module.exports = {
    CarregarCardapio: async (req, res) => {
        try {
            const carrinho = req.params.id;
    
            console.log(carrinho);
    
            const detailsCarrinho = await ModelCarrinho.findOne({ where: { cd_carrinho: carrinho } });
            let cardapio = await ModelCardapio.findOne({ where: { cd_carrinho: carrinho } });

            console.log(cardapio);
    
            if (!cardapio) {
                cardapio = await ModelCardapio.create({
                    cd_carrinho: carrinho
                });
                console.log('Cardápio Criado:', cardapio);
            }            
    
            const produtos = await ModelProduto.findAll({ where: { cd_cardapio: cardapio.cd_cardapio } });
    
            res.render('ambulante/AddCardapio/index.ejs', {
                produtos: produtos,
                carrinho: detailsCarrinho
            });
        } catch (error) {
            console.error('Erro ao carregar o cardápio', error);
            res.status(500).send('Erro ao carregar o cardápio');
        }
    }    
}