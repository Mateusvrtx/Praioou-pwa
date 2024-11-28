const { ModelCarrinho } = require('../../models/carrinho');
const { ModelImgCarrinho } = require('../../models/imgCarrinho');
const { ModelPedido } = require('../../models/pedido');
const { ModelReserva } = require('../../models/reserva');
const dayjs = require('dayjs');
const { Sequelize, Op, fn } = require('sequelize');
require('dayjs/locale/pt-br');
dayjs.locale('pt-br');

module.exports = {
    renderDados: async(req,res) => {
        try {
            const usuario = req.cookies.cookie_usuario;

            const result = await ModelCarrinho.findAll({where: {cd_barraqueiro: usuario}, order: [['cd_carrinho', 'DESC']],});
            
            const carrinhos = [];
    
            for(const carrinho of result) {
                const imgs = await ModelImgCarrinho.findAll({
                    where: {
                        cd_carrinho: carrinho.cd_carrinho
                    },
                    attributes: ['nm_imgCarrinho'],
                })
                
                const primeiraFoto = imgs.length > 0 ? imgs[0].nm_imgCarrinho : 'indisponivel.png';
                
                console.log(primeiraFoto)
    
                carrinhos.push({
                    primeiraFoto:primeiraFoto,
                    carrinho: carrinho
                })
            }

            res.render('ambulante/dados/index', {
                carrinhos: carrinhos
            })
        } catch (error) {
            console.error('Erro na consulta ao banco:', error);
            res.status(500).send("Erro na obtenção de dados");
        }
    },

    renderPedidosPage: async (req, res) => {
    try {
        const id = req.body.id;
        const opc = req.body.opc;
        const data = req.body.data;

        if (opc === 'Reserva') {
            if (data === 'hoje') {
                const hoje = new Date();
                const dataFormatada = hoje.toISOString().split('T')[0]; 
                const reservasPorHora = [];
            
                for (let i = 0; i < 24; i++) {
                    const horaInicio = `${i.toString().padStart(2, '0')}:00:00`;
                    const horaFim = `${i.toString().padStart(2, '0')}:59:59`;
            
                    const reservasDoHora = await ModelReserva.count({
                        where: {
                            cd_carrinho: id,
                            dt_reserva: {
                                [Op.eq]: dataFormatada
                            },
                            hr_reserva: {
                                [Op.between]: [horaInicio, horaFim] 
                            }
                        }
                    });
            
                    console.log(reservasDoHora)
                    reservasPorHora.push({
                        hora: `${i.toString().padStart(2, '0')}:00`,
                        totalReservas: reservasDoHora || 0
                    });
                }
            
                return res.status(200).json({
                    tipo: 'hoje',
                    dados: reservasPorHora
                });
            } else if (data === 'ultimaSemana') {
                const reservas = [];
            
                for (let i = 0; i < 7; i++) {
                    const dia = dayjs().subtract(i, 'day').startOf('day');
                    const reservasDoDia = await ModelReserva.count({
                        where: {
                            cd_carrinho: id,
                            dt_reserva: {
                                [Op.gte]: dia.toDate(),
                                [Op.lt]: dia.add(1, 'day').toDate()
                            }
                        }
                    });
            
                    reservas.push({
                        data: dia.format('ddd'), 
                        totalReservas: reservasDoDia || 0
                    });
                }
            
                return res.status(200).json({
                    tipo: 'ultimaSemana',
                    dados: reservas
                });
            } else if (data === 'ultimoMes') {
                const reservas = [];
            
                for (let i = 0; i < 30; i++) {
                    const dia = dayjs().subtract(i, 'day').startOf('day');
                    const reservasDoDia = await ModelReserva.count({
                        where: {
                            cd_carrinho: id,
                            dt_reserva: {
                                [Op.gte]: dia.toDate(),
                                [Op.lt]: dia.add(1, 'day').toDate()
                            }
                        }
                    });
            
                    reservas.push({
                        data: dia.format('DD'),
                        totalReservas: reservasDoDia || 0
                    });
                }
            
                console.log('Último mês');
                return res.status(200).json({
                    tipo: 'ultimoMes',
                    dados: reservas
                });
            } else if (data === 'ultimosSeisMeses') {
                const reservas = [];
            
                for (let i = 0; i < 6; i++) {
                    const mes = dayjs().subtract(i, 'month').startOf('month');
                    const reservasDoMes = await ModelReserva.count({
                        where: {
                            cd_carrinho: id,
                            dt_reserva: {
                                [Op.gte]: mes.toDate(),
                                [Op.lt]: mes.add(1, 'month').toDate()
                            }
                        }
                    });
            
                    reservas.push({
                        data: mes.format('MMM'),
                        totalReservas: reservasDoMes || 0
                    });
                }
            
                console.log('Últimos seis meses');
                return res.status(200).json({
                    tipo: 'ultimosSeisMeses',
                    dados: reservas
                });
            }            
        } else if (opc === 'Pedidos') {
            if (data === 'hoje') {
                const hoje = new Date();
                const dataFormatada = hoje.toISOString().split('T')[0];
                const PedidosPorHora = [];
            
                for (let i = 0; i < 24; i++) {
                    const horaInicio = `${i.toString().padStart(2, '0')}:00:00`;
                    const horaFim = `${i.toString().padStart(2, '0')}:59:59`;
            
                    const pedidos = await ModelPedido.count({
                        where: {
                            cd_carrinho: id,
                            dt_pedido: {
                                [Op.and]: [
                                    Sequelize.where(fn('DATE', Sequelize.col('dt_pedido')), dataFormatada),
                                    Sequelize.where(fn('TIME', Sequelize.col('dt_pedido')), {
                                        [Op.between]: [horaInicio, horaFim]
                                    })
                                ]
                            },
                            ds_status: {
                                [Op.or]: ['pago', 'entregue']
                            }
                        }
                    });
            
                    PedidosPorHora.push({
                        hora: `${i.toString().padStart(2, '0')}:00`,
                        totalPedidos: pedidos || 0
                    });
                }
            
                return res.status(201).json({
                    tipo: 'hoje',
                    dados: PedidosPorHora
                });
            } else if (data === 'ultimaSemana') {
                const pedidos = [];
            
                for (let i = 0; i < 7; i++) {
                    const dia = dayjs().subtract(i, 'day').startOf('day');
                    const reservasDoDia = await ModelPedido.count({
                        where: {
                            cd_carrinho: id,
                            dt_pedido: {
                                [Op.gte]: dia.toDate(),
                                [Op.lt]: dia.add(1, 'day').toDate()
                            },
                            ds_status: {
                                [Op.or]: ['pago', 'entregue']
                            }
                        }
                    });
            
                    pedidos.push({
                        data: dia.format('ddd'),
                        totalPedidos: reservasDoDia || 0
                    });
                }
            
                return res.status(201).json({
                    tipo: 'ultimaSemana',
                    dados: pedidos
                });
            } else if (data === 'ultimoMes') {
                const pedidos = [];
            
                for (let i = 0; i < 30; i++) {
                    const dia = dayjs().subtract(i, 'day').startOf('day');
                    const reservasDoDia = await ModelPedido.count({
                        where: {
                            cd_carrinho: id,
                            dt_pedido: {
                                [Op.gte]: dia.toDate(),
                                [Op.lt]: dia.add(1, 'day').toDate()
                            },
                            ds_status: {
                                [Op.or]: ['pago', 'entregue']
                            }
                        }
                    });
            
                    pedidos.push({
                        data: dia.format('DD'),
                        totalPedidos: reservasDoDia || 0 
                    });
                }
            
                return res.status(201).json({
                    tipo: 'ultimoMes',
                    dados: pedidos
                });
            } else if (data === 'ultimosSeisMeses') {
                const pedidos = [];
            
                for (let i = 0; i < 7; i++) {
                    const mes = dayjs().subtract(i, 'month').startOf('month');
                    const reservasDoMes = await ModelPedido.count({
                        where: {
                            cd_carrinho: id,
                            dt_pedido: {
                                [Op.gte]: mes.toDate(),
                                [Op.lt]: mes.add(1, 'month').toDate()
                            },
                            ds_status: {
                                [Op.or]: ['pago', 'entregue']
                            }
                        }
                    });
            
                    pedidos.push({
                        data: mes.format('MMM'),
                        totalPedidos: reservasDoMes || 0
                    });
                }
            
                return res.status(201).json({
                    tipo: 'ultimosSeisMeses',
                    dados: pedidos 
                });
            }
        } else if (opc === 'Clientes') {
            if (data === 'hoje') {
                const hoje = new Date();
                const dataFormatada = hoje.toISOString().split('T')[0];
                const ClientesPorHora = [];

                for (let i = 0; i < 24; i++) {
                    const horaInicio = `${i.toString().padStart(2, '0')}:00:00`;
                    const horaFim = `${i.toString().padStart(2, '0')}:59:59`;
            
                    const clientesUnicos = await ModelPedido.count({
                        where: {
                            cd_carrinho: id,
                            dt_pedido: {
                                [Op.and]: [
                                    Sequelize.where(fn('DATE', Sequelize.col('dt_pedido')), dataFormatada),
                                    Sequelize.where(fn('TIME', Sequelize.col('dt_pedido')), {
                                        [Op.between]: [horaInicio, horaFim]
                                    })
                                ]
                            }
                        },
                        distinct: true,
                        col: 'cd_cliente'
                    });

                    console.log(clientesUnicos)

                    ClientesPorHora.push({
                        hora: `${i.toString().padStart(2, '0')}:00`,
                        totalClientes: clientesUnicos || 0
                    });
                }
                return res.status(202).json({
                    tipo: 'hoje',
                    dados: ClientesPorHora
                });
            } else if (data === 'ultimaSemana') {
                const clientes = [];

                for (let i = 0; i < 7; i++) {
                    const dia = dayjs().subtract(i, 'day').startOf('day');

                    const clientesUnicosDia = await ModelPedido.count({
                        where: {
                            cd_carrinho: id,
                            dt_pedido: {
                                [Op.gte]: dia.toDate(),
                                [Op.lt]: dia.add(1, 'day').toDate()
                            }
                        },
                        distinct: true,
                        col: 'cd_cliente' 
                    });

                    clientes.push({
                        data: dia.format('ddd'),
                        totalClientes: clientesUnicosDia
                    });
                }

                return res.status(202).json({
                    tipo: 'ultimaSemana',
                    dados: clientes
                });
            } else if (data === 'ultimoMes') {
                const clientes = [];

                for (let i = 0; i < 30; i++) {
                    const dia = dayjs().subtract(i, 'day').startOf('day');

                    const clientesUnicosDia = await ModelPedido.count({
                        where: {
                            cd_carrinho: id,
                            dt_pedido: {
                                [Op.gte]: dia.toDate(),
                                [Op.lt]: dia.add(1, 'day').toDate()
                            }
                        },
                        distinct: true,
                        col: 'cd_cliente' 
                    });

                    clientes.push({
                        data: dia.format('DD'),
                        totalClientes: clientesUnicosDia
                    });
                }

                return res.status(202).json({
                    tipo: 'ultimoMes',
                    dados: clientes
                });
            } else if (data === 'ultimosSeisMeses') {
                const clientes = [];

                for (let i = 0; i < 6; i++) {
                    const mes = dayjs().subtract(i, 'month').startOf('month');

                    const clientesUnicosMes = await ModelPedido.count({
                        where: {
                            cd_carrinho: id,
                            dt_pedido: {
                                [Op.gte]: mes.toDate(),
                                [Op.lt]: mes.add(1, 'month').toDate()
                            }
                        },
                        distinct: true,
                        col: 'cd_cliente' 
                    });

                    clientes.push({
                        data: mes.format('MMM'),
                        totalClientes: clientesUnicosMes
                    });
                }

                return res.status(202).json({
                    tipo: 'ultimosSeisMeses',
                    dados: clientes
                });
            }

        } else if (opc === 'Lucro') {
            if (data === 'hoje') {
                const hoje = new Date();
                const dataFormatada = hoje.toISOString().split('T')[0];
                const PedidosPorHora = [];
                
                for (let i = 0; i < 24; i++) {
                    const horaInicio = `${i.toString().padStart(2, '0')}:00:00`;
                    const horaFim = `${i.toString().padStart(2, '0')}:59:59`;
                
                    const totalPedidos = await ModelPedido.sum('vl_total_pedido', {
                        where: {
                            cd_carrinho: id,
                            dt_pedido: {
                                [Op.and]: [
                                    Sequelize.where(fn('DATE', Sequelize.col('dt_pedido')), dataFormatada),
                                    Sequelize.where(fn('TIME', Sequelize.col('dt_pedido')), {
                                        [Op.between]: [horaInicio, horaFim]
                                    })
                                ]
                            },
                            ds_status: {
                                [Op.or]: ['pago', 'entregue']
                            }
                        }
                    });
                
                    PedidosPorHora.push({
                        hora: `${i.toString().padStart(2, '0')}:00`,
                        totalPedidos: totalPedidos || 0
                    });
                }
                
                return res.status(203).json({
                    tipo: 'hoje',
                    dados: PedidosPorHora
                });
            } else if (data === 'ultimaSemana') {
                const pedidos= [];
                
                for (let i = 0; i < 7; i++) {
                    const dia = dayjs().subtract(i, 'day').startOf('day');
                    const totalPedidos = await ModelPedido.sum('vl_total_pedido', {
                        where: {
                            cd_carrinho: id,
                            dt_pedido: {
                                [Op.gte]: dia.toDate(),
                                [Op.lt]: dia.add(1, 'day').toDate()
                            },
                            ds_status: {
                                [Op.or]: ['pago', 'entregue']
                            }
                        }
                    });
                
                    pedidos.push({
                        data: dia.format('ddd'),
                        totalPedidos: totalPedidos || 0
                    });
                }
                
                return res.status(203).json({
                    tipo: 'ultimaSemana',
                    dados: pedidos
                });
            }  else if (data === 'ultimoMes') {
                const pedidos = [];
            
                for (let i = 0; i < 30; i++) {
                    const dia = dayjs().subtract(i, 'day').startOf('day');
                    const reservasDoDia = await ModelPedido.sum('vl_total_pedido', {
                        where: {
                            cd_carrinho: id,
                            dt_pedido: {
                                [Op.gte]: dia.toDate(),
                                [Op.lt]: dia.add(1, 'day').toDate()
                            },
                            ds_status: {
                                [Op.or]: ['pago', 'entregue']
                            }
                        }
                    });
            
                    pedidos.push({
                        data: dia.format('DD'),
                        totalPedidos: reservasDoDia || 0
                    });
                }
            
                return res.status(203).json({
                    tipo: 'ultimoMes',
                    dados: pedidos
                });
            }  else if (data === 'ultimosSeisMeses') {
                const pedidos = [];
            
                for (let i = 0; i < 7; i++) {
                    const mes = dayjs().subtract(i, 'month').startOf('month');
                    const reservasDoMes = await ModelPedido.sum('vl_total_pedido', {
                        where: {
                            cd_carrinho: id,
                            dt_pedido: {
                                [Op.gte]: mes.toDate(),
                                [Op.lt]: mes.add(1, 'month').toDate()
                            },
                            ds_status: {
                                [Op.or]: ['pago', 'entregue']
                            }
                        }
                    });
            
                    pedidos.push({
                        data: mes.format('MMM'),
                        totalPedidos: reservasDoMes || 0
                    });
                }
            
                return res.status(203).json({
                    tipo: 'ultimosSeisMeses',
                    dados: pedidos
                });
            }          
        }                
    } catch (error) {
        console.error('Erro na consulta ao banco:', error);
        return res.status(500).send("Erro na obtenção de dados");
    }
}
 
};