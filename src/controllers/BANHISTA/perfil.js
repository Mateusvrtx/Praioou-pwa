const { ModelCliente } = require('../../models/cliente');
const bcrypt = require('bcryptjs');
const { format } = require('date-fns');

module.exports = {
    CarregarPerfil: async (req, res) => {
        try {
            const cd_usuario = req.cookies.cookie_usuario;
            const usuario = await ModelCliente.findOne({ where: { cd_cliente: cd_usuario } });

            const ano = format(new Date(usuario.dt_entrada), 'Y');

            const themePreference = usuario.themePreference || 'light';

            res.render('banhista/perfill/index', {
                nome: usuario.nm_cliente,
                sobreN: usuario.nm_sobrenomeC,
                email: usuario.ds_emailC,
                telefone: usuario.nmr_telefoneC,
                fotoPerfilUrl: res.locals.fotoPerfilUrl,
                ano: ano,
                themePreference: themePreference
            });
        } catch (error) {
            console.error('Erro ao carregar perfil:', error);
            res.status(500).send('Erro ao carregar perfil');
        }
    },

    CarregarConfigC: async (req, res) => {
        try {
            const cd_usuario = req.cookies.cookie_usuario;
    
            const usuario = await ModelCliente.findOne({ where: { cd_cliente: cd_usuario } });
    
            if (!usuario) {
                return res.status(404).send('Usuário não encontrado');
            }
    
            const themePreference = usuario.themePreference || 'light';

            let ftPerfil = 'ImageDefault.jpg'

            if (usuario.nm_imgPerfilC !== null) {
                ftPerfil = usuario.nm_imgPerfilC
            }
            
            res.render('./banhista/perfilConfig/index', {
                nome: usuario.nm_cliente,
                SobreNome: usuario.nm_sobrenomeC,
                ftPerfil: ftPerfil,
                themePreference: themePreference
            });
        } catch (error) {
            console.error('Erro ao carregar configurações:', error);
            return res.status(500).send('Erro ao carregar as configurações');
        }
    },
    AtualizarNome: async (req, res) => {
        try {
            const { nomeDigit, senhaDigit, sobreNDigit } = req.body;

            const cd_usuario = req.cookies.cookie_usuario;
            let usuario = await ModelCliente.findOne({ where: { cd_cliente: cd_usuario } });

            const senhaCorreta = await bcrypt.compare(senhaDigit, usuario.ds_senhaC);

            // Se as senhas não coincidirem, retorna uma resposta de erro
            if (!senhaCorreta) {
                return res.status(401).json({ msg: 'Senha incorreta!' });
            }

            await usuario.update({
                nm_cliente: nomeDigit,
                nm_sobrenomeC: sobreNDigit
            });

            res.status(200).json({ msg: 'Nome atualizado com sucesso' });
        } catch (error) {
            console.error('Erro ao atualizar nome:', error);
            res.status(500).send('Erro ao atualizar nome');
        }
    },

    ExcluirConta: async (req, res) => {
        try {
            const senha = req.body.senha;

            const cd_usuario = req.cookies.cookie_usuario;
            let usuario = await ModelCliente.findOne({ where: { cd_cliente: cd_usuario } });

            const senhaCorreta = await bcrypt.compare(senha, usuario.ds_senhaC);

            // Se as senhas não coincidirem, retorna uma resposta de erro
            if (!senhaCorreta) {
                return res.status(401).json({ msg: 'Senha incorreta!' });
            }

            await usuario.destroy();

            res.clearCookie('cookie_usuario');
            res.status(200).json({ msg: 'Conta excluída com sucesso!' });
        } catch (error) {
            console.error('Erro ao excluir conta:', error);
            res.status(500).send('Erro ao excluir conta');
        }
    }
};
