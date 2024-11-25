const { ModelCarrinho } = require("../../models/carrinho");
const { ModelNotificacao } = require("../../models/notificacao");
const { ModelReserva } = require("../../models/reserva");

module.exports = {
    CarregarHorarios: async(req, res) => {
        const idCarrinho = req.params.id;

        const carrinho = await ModelCarrinho.findOne({ where: { cd_carrinho: idCarrinho } });

        const horaInicio = carrinho.hr_inicioReserva;
        const horaFim = carrinho.hr_fimReserva;

        let horarios = [];
        let horaAtual = new Date(`1970-01-01T${horaInicio}`);
        const horaLimite = new Date(`1970-01-01T${horaFim}`);

        while (horaAtual <= horaLimite) {
            horarios.push(horaAtual.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
            horaAtual.setHours(horaAtual.getHours() + 1);
        }

        console.log(horarios)

        res.render('banhista/reservando/index', {
            horas:horarios
        })
    },

    ReservaPaga: async (req, res) => {
        const idReserva = req.params.id;
        const io = req.io; 

        let reserva = await ModelReserva.findOne({ where: { cd_reserva: idReserva } });

        if (reserva) {
            const transaction = await ModelReserva.sequelize.transaction();
            try {
                await ModelReserva.update({
                    ds_pagamento: 'pago'
                }, {
                    where: {
                        cd_reserva: idReserva
                    },
                    transaction
                });

                const cdCarrinho = reserva.cd_carrinho;
                const carrinho = await ModelCarrinho.findOne({ where: { cd_carrinho: cdCarrinho } });

                if (carrinho) {
                    const cdAmbulante = carrinho.cd_barraqueiro;

                    const ambulanteSocketId = global.ambulantes[cdAmbulante];

                    if (ambulanteSocketId && io) {
                        io.to(ambulanteSocketId).emit('notification', {
                            type: 'reserva',
                            message: `A reserva do carrinho: ${carrinho.nm_carrinho} foi paga.`,
                            reservaId: reserva.cd_reserva
                        });
                    } else {
                        console.log(`Socket ID não encontrado para o ambulante ${cdAmbulante}`);
                    }
                } else {
                    console.log(`Carrinho não encontrado para o ID ${cdCarrinho}`);
                }

                await transaction.commit();

                await ModelNotificacao.create({
                    cd_barraqueiro: carrinho.cd_barraqueiro,
                    cd_cliente: reserva.cd_cliente,
                    ds_destinatario: 'ambulante',
                    ds_titulo: 'Nova Reserva Feita',
                    ds_descricao: 'Uma nova reserva foi feita, você pode vê-la na sua aba de reservas, caso necessario você pode cancela-la ou verificas o status dela',
                    dt_notificacao: Date.now(),
                    ds_tipo: 'Nova Reserva',
                    ds_vizu: false
                })

                await ModelNotificacao.create({
                    cd_barraqueiro: carrinho.cd_barraqueiro,
                    cd_cliente: reserva.cd_cliente,
                    ds_destinatario: 'banhista',
                    ds_titulo: 'Nova Reserva Feita',
                    ds_descricao: 'Uma nova reserva foi feita, você pode vê-la na sua aba de reservas, caso necessário cancelar faça isso com pelo menos 2 horas de antecedencia',
                    dt_notificacao: Date.now(),
                    ds_tipo: 'Nova Reserva',
                    ds_vizu: false
                })

                console.log(`Reserva ${reserva.cd_reserva} atualizada com sucesso.`);
            } catch (error) {
                await transaction.rollback();
                console.error('Erro ao atualizar a reserva:', error);
            }
        } else { 
            console.log('Reserva não encontrada para o ID:', idReserva);
        }

        res.render('banhista/reservaPaga/index');
    }
}
