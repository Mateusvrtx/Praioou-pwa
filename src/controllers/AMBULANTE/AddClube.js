const { ModelCarrinho } = require("../../models/carrinho")
const { ModelClubeB } = require("../../models/clubeb")
const { ModelClubeUsuario } = require("../../models/clubeUsuario")

module.exports = {
    CarregarCarrinhosAddClube:  async (req, res) => {
        try {
            const usuario = req.cookies.cookie_usuario
    
            const carrinhos = await ModelCarrinho.findAll({ where: {cd_barraqueiro: usuario}})
    
            res.render('ambulante/AddClube/index.ejs', {
                carrinhos: carrinhos
            })
        } catch (error) {
            res.status(500).send('Erro ao carregar tela');
        }
    },

    AdicionarClube: async (req, res) => {
        try {
            const {
                nmClube,
                idCarrinho,
                vlEntrada,
                dsVantagens
            } = req.body
    
            await ModelClubeB.create({
                cd_carrinho: idCarrinho,
                nm_clube: nmClube,
                vl_entrada: vlEntrada,
                dt_criacao: Date.now(),
                ds_diferencial: dsVantagens,
                nm_imgClube: req.file ? req.file.filename : null 
            })
    
            return res.status(201).json({ msg: `Clube ${nmClube} criado com sucesso!` });
        } catch (error) {
            console.error('Erro ao criar clube', error);
            res.status(500).send('Erro ao criar clube');
        }
    },

    CarregarClubes: async (req, res) => {
        try {
            const usuario = req.cookies.cookie_usuario;
        
            const carrinhos = await ModelCarrinho.findAll({ where: { cd_barraqueiro: usuario }});
    
            const TodosClubes = [];
    
            for (const clubes of carrinhos) {
                const clubesEncontrados = await ModelClubeB.findAll({ where: { cd_carrinho: clubes.cd_carrinho }});
    
                for (const clube of clubesEncontrados) {
                    if (clube.cd_clube) {
                        const membros = await ModelClubeUsuario.findAll({ where: { cd_clube: clube.cd_clube }});

                        let dataPedido = new Date(clube.dt_criacao + 'T00:00:00');
                        let dataFormatada = dataPedido.toLocaleDateString('pt-BR');
    
                        TodosClubes.push({
                            nmClube: clube.nm_clube,
                            nmCarrinho: clubes.nm_carrinho,
                            qttMembros: membros.length,
                            dtCriacao: dataFormatada,
                            imgClube: clube.nm_imgClube,
                            idClube: clube.cd_clube
                        });
                    } else {
                        console.warn(`Clube encontrado sem cd_clube para carrinho ${clubes.cd_carrinho}`);
                    }
                }
            }
            
            res.render('ambulante/Clube/index.ejs', {
                clubes: TodosClubes 
            });
        } catch (error) {
            console.error('Erro ao carregar clubes', error);
            res.status(500).send('Erro ao carregar clubes');
        }
    },

    CarregarClubesJson: async (req, res) => {
        try {
            const usuario = req.cookies.cookie_usuario;
    
            const carrinhos = await ModelCarrinho.findAll({ where: { cd_barraqueiro: usuario }});
            const TodosClubes = [];
    
            for (const clubes of carrinhos) {
                const clubesEncontrados = await ModelClubeB.findAll({ where: { cd_carrinho: clubes.cd_carrinho }});
    
                for (const clube of clubesEncontrados) {
                    if (clube.cd_clube) {
                        const membros = await ModelClubeUsuario.findAll({ where: { cd_clube: clube.cd_clube }});
    
                        TodosClubes.push({
                            nmClube: clube.nm_clube,
                            nmCarrinho: clubes.nm_carrinho,
                            qttMembros: membros.length
                        });
                    } else {
                        console.warn(`Clube encontrado sem cd_clube para carrinho ${clubes.cd_carrinho}`);
                    }
                }
            }
            
            res.json({ clubes: TodosClubes });
        } catch (error) {
            console.error('Erro ao carregar clubes', error);
            res.status(500).json({ error: 'Erro ao carregar clubes' });
        }
    }    
}