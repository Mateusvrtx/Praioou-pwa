const { ModelCliente } = require("../../models/cliente");
const fs = require('fs');
const path = require('path');

module.exports = {

    UploadImgPerfilC: async (req, resp) => { 
        try { 
            console.log('Arquivo encontrado no corpo da Requisição:', req.file); 
    
            if (!req.file) { 
                return resp.status(400).send('Você deve selecionar um arquivo! Não havia nenhum!');
            }
    
            const cdUsuario = req.cookies.cookie_usuario;
    
            let usuario = await ModelCliente.findOne({ where: { cd_cliente: cdUsuario } });
    
            await usuario.update({ 
                nm_imgPerfilC: req.file.filename 
            });
    
            console.log('Registro de imagem criado ou atualizado no banco de dados:'); 
    
            return resp.redirect('/perfil');
        } catch (erro) {
            console.error('Erro ao tentar fazer upload de imgs:', erro); 
            return resp.status(500).send(`Erro ao tentar fazer upload de imgs: ${erro}`); 
        }
    },

    imgPerfil: async (req, res, next) => {
        try {
            const usuario = await ModelCliente.findOne({ where: { cd_cliente: req.cookies.cookie_usuario } });

            if (usuario && usuario.nm_imgPerfilC) {
                res.locals.fotoPerfilUrl = `/uploads/${usuario.nm_imgPerfilC}`;
            } else {
                res.locals.fotoPerfilUrl = '/uploads/ImageDefault.jpg';
            }
        } catch (error) {
            console.error('Erro ao carregar foto de perfil:', error);
            res.locals.fotoPerfilUrl = '/uploads/ImageDefault.jpg';
        }
        next();
    },

    ExcluirImagem: async (req, res) => {
        const cdUsuario = req.cookies.cookie_usuario; // Obtém o ID do usuário a partir dos cookies
    
        try {
            let usuario = await ModelCliente.findOne({ where: { cd_cliente: cdUsuario } });

            const caminhoArquivo = path.join(__dirname, '../../../resources/static/assets/uploads/', usuario.nm_imgPerfilC);
            
            fs.unlink(caminhoArquivo, (err) => {
                if (err) {
                    console.error('Erro ao excluir fisicamente a imagem:', err);
                    return res.status(500).json({ error: 'Erro ao excluir fisicamente a imagem.' });
                }

                usuario.update({ 
                    nm_imgPerfilC: null
                }).then(() => {
                    console.log('Imagem excluída com sucesso.');
                    return res.status(200).json({ message: 'Imagem excluída com sucesso.' });
                }).catch((error) => {
                    console.error('Erro ao atualizar registro do usuário:', error);
                    return res.status(500).json({ error: 'Erro ao atualizar registro do usuário.' });
                });
            });

        } catch (error) { 
            console.error('Erro ao excluir imagem:', error);
            return res.status(500).json({ error: 'Erro ao excluir imagem.' });
        }
    }
}
