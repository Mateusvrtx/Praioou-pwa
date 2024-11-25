const { ModelCarrinho } = require("../../models/carrinho");

module.exports = {
    // Método para carregar as informações do carrinho para edição
    CarregarInformacoes: async (req, res) => {
        const idCarrinho = req.params.id;

        const carrinho = await ModelCarrinho.findOne({ where: { cd_carrinho: idCarrinho } });

        res.render('ambulante/EditarCarrinho/index.ejs', {
            carrinho: carrinho
        });
    },

    // Método para editar as informações do carrinho
    EditarCarrinho: async (req, res) => {
        const { 
            nmCarrinho, 
            locCarrinho, 
            dsCarrinho, 
            qtConjunto, 
            vlReserva, 
            dsCidade, 
            hrInicioReserva, 
            hrFimReserva 
        } = req.body;

        const carrinhoId = req.params.id;

        console.log(nmCarrinho)

        try {
            const updatedCarrinho = await ModelCarrinho.update(
                {
                    nm_carrinho: nmCarrinho,
                    ds_localizacao: locCarrinho,
                    ds_carrinho: dsCarrinho,
                    qt_conjunto: qtConjunto,
                    vl_reserva: vlReserva,
                    ds_cidade: dsCidade,
                    hr_inicio_reserva: hrInicioReserva,
                    hr_fim_reserva: hrFimReserva
                },
                {
                    where: { cd_carrinho: carrinhoId }
                }
            );

            console.log('chegou')

            if (updatedCarrinho[0] === 1) {
                res.status(200).json({ message: 'Carrinho atualizado com sucesso!' });
            } else {
                res.status(400).json({ error: 'Nenhuma alteração foi realizada.' });
            }

        } catch (error) {
            console.error('Erro ao editar o carrinho:', error);
            res.status(500).json({ error: 'Erro ao editar o carrinho.' });
        }
    }
};
