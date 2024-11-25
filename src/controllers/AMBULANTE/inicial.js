const { ModelCarrinho } = require("../../models/carrinho");
const { ModelImgCarrinho } = require("../../models/imgCarrinho");
const { ModelNotificacao } = require("../../models/notificacao");

module.exports = {
    CarregarCarrinhos: async(req, res) => {
        const usuario = req.cookies.cookie_usuario;

        const result = await ModelCarrinho.findAll({where: {cd_barraqueiro: usuario}, order: [['cd_carrinho', 'DESC']],});
        
        const carrinhos = [];

        for(const carrinho of result) {
            const imgs = await ModelImgCarrinho.findAll({
                where: {
                    cd_carrinho: carrinho.cd_carrinho
                },
                attributes: ['nm_imgCarrinho']
            })

            const primeiraFoto = imgs.length > 0 ? imgs[0].nm_imgCarrinho : 'indisponivel.png';
            
            console.log(primeiraFoto)

            carrinhos.push({
                primeiraFoto:primeiraFoto,
                carrinho: carrinho
            })
        }

        const qttNotificacao= await ModelNotificacao.count({
            where: {
                cd_barraqueiro: usuario,
                ds_destinatario: 'ambulante',
                ds_vizu: false
            }})

        res.render('ambulante/InicialB/index.ejs', {
            carrinhos: carrinhos,
            cd_usuario: usuario,
            qttNotificacao: qttNotificacao
        })
    }
}