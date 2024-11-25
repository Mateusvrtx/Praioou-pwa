const { ModelComentario } = require("../../models/comentarios");
const { ModelResposta } = require("../../models/resposta");

module.exports = {
    adcComentario: async (req, res) => {
        try {
            const { texto, estrelas } = req.body
            const idUsuario = req.cookies.cookie_usuario
            const idCarrinho = req.body.idCarrinho

            let reacoes = 0

            await ModelComentario.create({
                cd_carrinho: idCarrinho,
                cd_cliente: idUsuario,
                ds_avaliacao: texto,
                qt_estrelas: parseFloat(estrelas),
                dt_avaliacao: Date.now(),
                qt_like: reacoes,
                qt_deslike: reacoes
            })
            console.log(texto)
            res.redirect(`/reserva/${idCarrinho}`)
        }
        catch(error){
            console.error('Comentario não efetuado', error)
        }
    },

    responderComentario: async (req, res) => {
        try {
            const { texto, avali, idCarrinho} = req.body;
            
            const idUsuario = req.cookies.cookie_usuario;
    
            await ModelResposta.create({
                cd_avali: avali,
                cd_cliente: idUsuario,
                ds_resposta: texto,
                dt_resposta: new Date(),
            });
    
            res.redirect(`/reserva/${idCarrinho}`);
        } catch (error) {
            console.error('Erro ao enviar resposta:', error);
            res.status(500).send('Erro ao enviar resposta');
        }
    }
    ,
    
    


    calcularMedia: async (req, res) => {
        const idCarrinho = req.body.idCarrinho

        try {
            const avaliacoes = await ModelComentario.findAll()

            let total_avaliacao = 0,
                avaliacao_estrela = 0

            avaliacoes.forEach(avaliacao => {
                total_avaliacao += 1;
                avaliacao_estrela += avaliacao.qt_estrelas
            });

            const media_avaliacao = total_avaliacao > 0 ? (avaliacao_estrela / total_avaliacao).toFixed(1) : 0

            res.render(`/reserva/${idCarrinho}`, 
                {
                media_avaliacao: media_avaliacao,
                total_avaliacao: total_avaliacao,
                avaliacoes: avaliacoes
            })
        } catch (error) {
            console.error('Erro ao calcular média de estrelas:', error)
            res.status(500).send('Erro ao calcular média de estrelas')
        }
    }
}
