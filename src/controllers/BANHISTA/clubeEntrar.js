const { ModelCarrinho } = require("../../models/carrinho")
const { ModelClubeB } = require("../../models/clubeb")
const { ModelClubeUsuario } = require("../../models/clubeUsuario")
const { ModelImgCarrinho } = require("../../models/imgCarrinho")

module.exports = {
    CarregarEntrarClube: async (req, res) => {
        const idClube = req.params.id

        const clube = await ModelClubeB.findOne({where: {cd_clube: idClube}})

        const carrinho = await ModelCarrinho.findOne({where: {cd_carrinho: clube.cd_carrinho}})

        const imgs = await ModelImgCarrinho.findAll({
            where: {
                cd_carrinho: carrinho.cd_carrinho
            },
            attributes: ['nm_imgCarrinho']
        })

        const membros = await ModelClubeUsuario.count({where: {cd_clube: clube.cd_clube}})

        const primeiraFoto = imgs.length > 0 ? imgs[0].nm_imgCarrinho : 'indisponivel.png';

        res.render('banhista/ClubeEntrar/index.ejs',{
            clube: clube,
            ftCarrinho: primeiraFoto,
            membros: membros
        })
        
    }
}