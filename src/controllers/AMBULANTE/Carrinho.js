const { Modelbarraqueiro } = require("../../models/barraqueiro");
const { ModelCarrinho } = require("../../models/carrinho");
const { ModelCliente } = require("../../models/cliente");
const { ModelComentario } = require("../../models/comentarios");
const { ModelImgCarrinho } = require("../../models/imgCarrinho");

module.exports = {
    InfoCarrinho: async(req, res) => {
        try {
            const carrinhoId = req.params.id;

            const carrinho = await ModelCarrinho.findOne({
                where: { cd_carrinho: carrinhoId },
                include: [{
                    model: Modelbarraqueiro,
                    attributes: [],
                    required: true,
                }]
            });
    
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

            const fotos = await ModelImgCarrinho.findAll({where: {cd_carrinho: carrinhoId}})

            let primeiraFoto = null;
            const outrasFotos = [];

            if (fotos.length > 0) {
                primeiraFoto = `/uploads/${fotos[0].nm_imgCarrinho}`;

                for (let i = 1; i < fotos.length; i++) {
                    outrasFotos.push(`/uploads/${fotos[i].nm_imgCarrinho}`);
                }
            }

            res.render('ambulante/CarrinhoAmb/index', { 
                carrinho: carrinho,
                comentarios: detalhesComentarios,
                primeiraFoto: primeiraFoto,
                outrasFotos: outrasFotos 
            }); 
        } catch (error) {
            console.error('Erro ao carregar perfil da barraca:', error);
            res.status(500).send('Erro ao carregar perfil da barraca');
        }
    }
}