const { ModelCarrinho } = require("../../models/carrinho")
const { Op} = require('sequelize');

module.exports = {
    FiltroValorCarrinho: async (req, res) => {
        const valor = req.body.valor

        // filtro entre 50 à 100
        if (valor === 1 ) {

            const carrinhos = await ModelCarrinho.findAll({
                where: {
                    vl_reserva: {
                        [Op.between]:[50, 100]
                    } 
                }
            })

            console.log(carrinhos)
            res.json({
                carrinhos: carrinhos
            });
        } else {

        }
    }
}