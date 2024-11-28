const { Model } = require("sequelize");
const { conexaoSequelize } = require("../../../config/bdConnection");
const { Modelbarraqueiro } = require("../../models/barraqueiro");
const { ModelCarrinho } = require("../../models/carrinho");
const { ModelComentario } = require("../../models/comentarios");
const { ModelCliente } = require("../../models/cliente");
const { ModelImgCarrinho } = require("../../models/imgCarrinho");
const { ModelClubeB } = require("../../models/clubeb");

module.exports = {
    perfilBarraca: async (req, res) => {
        try {
            const carrinhoId = req.params.id;
            const cd_usuario = req.cookies.cookie_usuario;

            let usuario = await ModelCliente.findOne({ where: { cd_cliente: cd_usuario } });

            const carrinho = await ModelCarrinho.findOne({
                where: { cd_carrinho: carrinhoId },
                include: [{
                    model: Modelbarraqueiro,
                    attributes: [],
                    required: true,
                }]
            });

            const imgs = await ModelImgCarrinho.findAll({
                where: {
                    cd_carrinho: carrinho.cd_carrinho
                },
                attributes: ['nm_imgCarrinho']
            })

            const primeiraFoto = imgs.length > 0 ? imgs[0].nm_imgCarrinho : 'indisponivel.png';
    
            const comentarios = await ModelComentario.findAll({
                where: { cd_carrinho: carrinhoId },
                include: [{
                    model: ModelCarrinho,
                    attributes: [],
                    required: true,
                }]
            });
            const detalhesComentarios = [];

            for (const coment of comentarios) {
                const clienteId = coment.cd_cliente;

                const cliente = await ModelCliente.findOne({
                    where: { cd_cliente: clienteId }
                });

                let foto = cliente.nm_imgPerfilC

                if (foto === null) {
                    foto = 'ImageDefault.jpg'
                }

                detalhesComentarios.push({
                    id: coment.cd_avali,
                    comentario: coment.ds_avaliacao,
                    data: coment.dt_avaliacao,
                    estrelas: coment.qt_estrelas,
                    like: coment.qt_like,
                    deslike: coment.qt_deslike,
                    nome: cliente.nm_cliente,
                    sobrenome: cliente.nm_sobrenomeC,
                    foto: foto
                });
            }

            const clube = await ModelClubeB.findOne({where: {cd_carrinho: carrinhoId}})

            let ClubeExiste = 0

            if (clube) {
                ClubeExiste = 1
            }

            res.render('banhista/reserva/index', { 
                carrinho: carrinho,
                primeiraFoto:primeiraFoto,
                comentarios: detalhesComentarios,
                IDcarrinho: carrinhoId,
                clube: ClubeExiste
            });
        } catch (error) {
            console.error('Erro ao carregar perfil da barraca:', error);
            res.status(500).send('Erro ao carregar perfil da barraca');
        }
    },

    todasBarracas: async (req, res) => {
        try {

            const carrinhos = [];

            const resultado = await ModelCarrinho.findAll()

            for(const carrinho of resultado) {
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
    
            res.render('banhista/carrinho/index', {
                barracas: carrinhos
            });
        } catch (error) {
            console.error('Erro ao buscar as barracas:', error);
            res.status(500).send('Erro ao buscar as barracas');
        }
    }
}
