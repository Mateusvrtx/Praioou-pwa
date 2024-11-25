const { Modelbarraqueiro } = require("../../models/barraqueiro");
const { format } = require('date-fns');
const fs = require('fs');
const path = require('path');

module.exports = {
    CarregarPerfilB: async (req, res) => {
        try {
            const usuario = req.cookies.cookie_usuario;

            const userProposto = await Modelbarraqueiro.findOne({ where: { cd_barraqueiro: usuario } });

            if (!userProposto) {
                return res.status(404).send('Usuário não encontrado');
            }

            const ano = format(new Date(userProposto.dt_entrada), 'y');

            const themePreference = userProposto.themePreference || 'light';

            res.render('./ambulante/perfilB/index', {
                nome: userProposto.nm_barraqueiro,
                SobreNome: userProposto.nm_sobrenomeB,
                fotoPerfilUrlB: res.locals.fotoPerfilUrlB,
                ano: ano,
                themePreference: themePreference // Envia a preferência de tema para o frontend
            });
        } catch (error) {
            console.error('Erro ao carregar perfil:', error);
            return res.status(500).send('Erro ao carregar o perfil');
        }
    },
    CarregarConfigB: async (req, res) => {
        try {
            const usuario = req.cookies.cookie_usuario;
    
            const userProposto = await Modelbarraqueiro.findOne({ where: { cd_barraqueiro: usuario } });
    
            if (!userProposto) {
                return res.status(404).send('Usuário não encontrado');
            }
    
            const themePreference = userProposto.themePreference || 'light';

            let ftPerfil = 'ImageDefault.jpg'

            if (userProposto.nm_imgPerfilB !== null) {
                ftPerfil = userProposto.nm_imgPerfilB
            }
    
            res.render('./ambulante/configB/index', {
                nome: userProposto.nm_barraqueiro,
                SobreNome: userProposto.nm_sobrenomeB,
                ftPerfil: ftPerfil,
                themePreference: themePreference // Envia a preferência de tema para o frontend
            });
        } catch (error) {
            console.error('Erro ao carregar configurações:', error);
            return res.status(500).send('Erro ao carregar as configurações');
        }
    },
    UploadImgPerfilB: async (req, res) => { 
        try { 
    
            if (!req.file) { 
                return res.status(400).send('Você deve selecionar um arquivo! Não havia nenhum!');
            }
            const cdUsuario = req.cookies.cookie_usuario;
            let usuario = await Modelbarraqueiro.findOne({ where: { cd_barraqueiro: cdUsuario } });

            if (usuario.nm_imgPerfilB != null) {
                const caminhoArquivo = path.join(__dirname, '../../../resources/static/assets/uploads/', usuario.nm_imgPerfilB);
                
                fs.unlink(caminhoArquivo, (err) => {
                    if (err) {
                        console.error('Erro ao excluir fisicamente a imagem:', err);
                        return res.status(500).json({ error: 'Erro ao excluir fisicamente a imagem.' });
                    }
                }) 
            }

            await usuario.update({ 
                nm_imgPerfilB: req.file.filename 
            });
    
            console.log('Registro de imagem criado ou atualizado no banco de dados:'); 
    
            return res.redirect('/perfilB');
        } catch (erro) {
            console.error('Erro ao tentar fazer upload de imgs:', erro); 
            return res.status(500).send(`Erro ao tentar fazer upload de imgs: ${erro}`); 
        }
    },

    imgPerfilB: async (req, res, next) => {
        try {
            const usuario = await Modelbarraqueiro.findOne({ where: { cd_barraqueiro: req.cookies.cookie_usuario } });

            if (usuario && usuario.nm_imgPerfilB) {
                res.locals.fotoPerfilUrlB = `/uploads/${usuario.nm_imgPerfilB}`;
            } else {
                res.locals.fotoPerfilUrlB = '/uploads/ImageDefault.jpg';
            }
        } catch (error) {
            console.error('Erro ao carregar foto de perfil:', error);
            res.locals.fotoPerfilUrl = '/uploads/ImageDefault.jpg';
        }
        next();
    },

    ExcluirImagemB: async (req, res) => {
        try {
            const cdUsuario = req.cookies.cookie_usuario; 
            let usuario = await Modelbarraqueiro.findOne({ where: { cd_barraqueiro: cdUsuario } });

            const caminhoArquivo = path.join(__dirname, '../../../resources/static/assets/uploads/', usuario.nm_imgPerfilB);
            
            fs.unlink(caminhoArquivo, (err) => {
                if (err) {
                    console.error('Erro ao excluir fisicamente a imagem:', err);
                    return res.status(500).json({ error: 'Erro ao excluir fisicamente a imagem.' });
                }
            });

            await usuario.update({ 
                nm_imgPerfilB: null
            })
        } catch (error) { 
            console.error('Erro ao excluir imagem:', error);
            return res.status(500).json({ error: 'Erro ao excluir imagem.' });
        }
    }
}