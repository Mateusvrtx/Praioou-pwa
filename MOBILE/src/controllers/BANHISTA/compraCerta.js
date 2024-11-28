const { ModelCarrinho } = require("../../models/carrinho");
const { ModelNotificacao } = require("../../models/notificacao");
const { ModelPedido } = require("../../models/pedido");
const moment = require('moment-timezone');

module.exports = {
    AdiconarHistorico: async (req, res) => { 
        const id = req.params.id;
        const io = req.io; 

        let pedido = await ModelPedido.findOne({ where: { cd_pedido: id } });

        if (pedido) {
            const transaction = await ModelPedido.sequelize.transaction();

            try {

                const dataBrasilia = moment().tz('America/Sao_Paulo');
                
                const dataUtc = dataBrasilia.clone().subtract(3, 'hours').format('YYYY-MM-DD HH:mm:ss');

                await ModelPedido.update({
                    ds_status: 'pago',
                    dt_pedido: dataUtc
                }, {
                    where: {
                        cd_pedido: id
                    },
                    transaction
                });

                const Cdcarrinho = pedido.cd_carrinho;
                const carrinho = await ModelCarrinho.findOne({ where: { cd_carrinho: Cdcarrinho } });

                if (carrinho) {
                    const cdAmbulante = carrinho.cd_barraqueiro;

                    const ambulanteSocketId = global.ambulantes[cdAmbulante];

                    if (ambulanteSocketId && io) {
                        io.to(ambulanteSocketId).emit('notification', {
                            type: 'pedido',
                            message: `Você tem um novo pedido do carrinho: ${carrinho.nm_carrinho}.`,
                            pedidoId: pedido.cd_pedido
                        });
                    } else {
                        console.log(`Socket ID não encontrado para o ambulante ${cdAmbulante}`);
                    }
                } else {
                    console.log(`Carrinho não encontrado para o ID ${Cdcarrinho}`);
                }

                await transaction.commit();

                await ModelNotificacao.create({
                    cd_barraqueiro: carrinho.cd_barraqueiro,
                    cd_cliente: pedido.cd_cliente,
                    ds_destinatario: 'ambulante',
                    ds_titulo: 'Novo Pedido Feito',
                    ds_descricao: 'Um novo pedido foi feito, você pode vê-lo na aba de comandas, todas as comandas seguem ordem de chegada, então fique de olho',
                    dt_notificacao: Date.now(),
                    ds_tipo: 'Novo pedido',
                    ds_vizu: false
                })

                await ModelNotificacao.create({
                    cd_barraqueiro: carrinho.cd_barraqueiro,
                    cd_cliente: pedido.cd_cliente,
                    ds_destinatario: 'banhista',
                    ds_titulo: 'Novo Pedido Feito',
                    ds_descricao: 'Seu pedido foi efetuado, em breve você vai recebe-lo, fique de olho nas suas notificações',
                    dt_notificacao: Date.now(),
                    ds_tipo: 'Novo pedido',
                    ds_vizu: false
                })

                console.log(`Pedido ${pedido.cd_pedido} atualizado com sucesso.`);
            } catch (error) {
                await transaction.rollback();
                console.error('Erro ao criar o histórico ou atualizar o pedido:', error);
            }
        } else { 
            console.log('Pedido não encontrado para o ID:', id);
        }

        res.render('banhista/compracerta/index');
    }
};
