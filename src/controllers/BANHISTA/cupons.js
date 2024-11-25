const { ModelCarrinho } = require('../../models/carrinho');
const { ModelCupom } = require('../../models/cupom');

module.exports = {
    meusCupons: async (req, res) => {
        const cd_usuario = req.cookies.cookie_usuario;

        try {
            const cupons = await ModelCupom.findAll({ where: { cd_cliente: cd_usuario } });
            const qttCupons = await ModelCupom.count({ where: { cd_cliente: cd_usuario } });

            const cuponsData = [];

            for (const cupom of cupons) {
                const dataValidade = new Date(cupom.dt_validade_cupom);
                const dia = String(dataValidade.getDate()).padStart(2, '0');
                const mes = String(dataValidade.getMonth() + 1).padStart(2, '0');
                const ano = dataValidade.getFullYear();

                const carrinho = await ModelCarrinho.findOne({ where: { cd_carrinho: cupom.cd_carrinho } });

                cuponsData.push({
                    preco: cupom.vl_cupom,
                    validade: `${dia}/${mes}/${ano}`,
                    nmCarrinho: carrinho ? carrinho.nm_carrinho : 'Carrinho não encontrado',
                });
            }



            res.render('banhista/cupons/index', { cupons: cuponsData, qttCupons: qttCupons });
        } catch (error) {
            console.error("Erro ao carregar os cupons:", error);
            res.status(500).send("Erro ao carregar os cupons");
        }
    }
};
