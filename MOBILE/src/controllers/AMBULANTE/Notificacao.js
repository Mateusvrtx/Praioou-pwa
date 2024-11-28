const { ModelNotificacao } = require("../../models/notificacao")

module.exports = {
    RenderNotificacoes: async (req, res) => {
        const usuario = req.cookies.cookie_usuario

        const notificacoes = await ModelNotificacao.findAll({
            where: {
                cd_barraqueiro: usuario,
                ds_destinatario: 'ambulante'
            }, order: [
                ['dt_notificacao', 'DESC']
            ]
        })

        res.json(notificacoes);
    },

    VizualziarNotificacao: async(req, res) => {
        const cdNotificacao = req.body.cd_notificacao

        ModelNotificacao.update(
            {ds_vizu: true},
            {
                where: {
                    cd_notificacao: cdNotificacao
                }
            }
        )
    }
}