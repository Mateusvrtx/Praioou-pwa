const { ModelCardapio } = require("../../models/cardapio");
const { ModelProduto } = require("../../models/produto");

module.exports = {
    AddProduto: async (req, res) => {
        try {
            const {
                nmProduto,
                dsProduto,
                vlProduto,
                dsCategoria,
                dsTipo,
                hrPreparo,
                id
            } = req.body;

            let cardapio = await ModelCardapio.findOne({ where: { cd_carrinho: id } });
            if (!cardapio) {
                return res.status(404).json({ msg: 'Cardápio não encontrado!' });
            }

            await ModelProduto.create({
                cd_cardapio: cardapio.cd_cardapio,
                nm_produto: nmProduto,
                ds_produto: dsProduto,
                vl_produto: vlProduto,
                ds_categoria: dsCategoria,
                ds_tipo_venda: dsTipo,
                hr_tempo_preparo: hrPreparo,
                nm_imgProduto: req.file ? req.file.filename : null 
            });

            return res.status(201).json({ msg: `Produto ${nmProduto} criado com sucesso!` });
        } catch (error) {
            console.error('Erro ao adicionar produto', error);
            res.status(500).json({ msg: 'Erro ao adicionar produto' });
        }
    }
};
