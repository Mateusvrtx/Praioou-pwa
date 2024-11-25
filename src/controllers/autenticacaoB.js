const bcrypt = require('bcryptjs');
const { Modelbarraqueiro } = require('../models/barraqueiro');
const { conexaoSequelize } = require('../../config/bdConnection');

module.exports = {
    CadastrarUsuarioB: async (req, resp) => {
        const {
            nmDigit,
            sobnmDigit,
            emailDigit,
            senhaDigit,
            nmrTelDigit,
            cpfdigit,
        } = req.body;
    
        try {
            // Hash da senha
            const hashedSenha = await bcrypt.hash(senhaDigit, 10);
    
            // Verifica se o email já existe no banco de dados
            let user = await Modelbarraqueiro.findOne({ where: { ds_emailB: emailDigit } });
    
            if (user) {
                return resp.status(409).json({ msg: 'Já existe um usuário com esse email!' });
            }
    
            // Criação do novo usuário
            user = await Modelbarraqueiro.create({
                nm_barraqueiro: nmDigit,
                nm_sobrenomeB: sobnmDigit,
                ds_emailB: emailDigit,
                cd_cpfB: cpfdigit,
                ds_senhaB: hashedSenha,
                nmr_telefoneB: nmrTelDigit,
                dt_entrada: new Date(),  // Garante que a data está no formato correto
                nm_imgPerfilB: null,      // Verifique se este campo pode aceitar null
                cd_plano: null,           // Verifique se este campo pode aceitar null
                cd_token: null,           // Verifique se este campo pode aceitar null
                ds_contaAtiva: 'ativa',
                themePreference: 'light'  // Padrão como 'light'
            });
    
            console.log(user);
    
            return resp.status(201).json({ msg: `Usuário ${nmDigit} criado com sucesso!` });
        } catch (error) {
            console.error(error);
            return resp.status(500).json({ msg: 'Erro no servidor ao tentar cadastrar usuário!' });
        }
    }
    ,
    
    // Função para realizar o login de um usuário existente
    LoginUsuarioB: async (req, resp) => {
        const { emailDigit, senhaDigit } = req.body;
    
        try {
            const usuario = await Modelbarraqueiro.findOne({ where: { ds_emailB: emailDigit } });
    
            if (!usuario) {
                return resp.status(404).json({ msg: 'Usuário não encontrado!' });
            }
    
            const senhaCorreta = await bcrypt.compare(senhaDigit, usuario.ds_senhaB);
    
            if (!senhaCorreta) {
                return resp.status(401).json({ msg: 'Senha incorreta!' });
            }
    
            const Hora = 3600000;
            const dtQuandoIraExpirar = new Date(Date.now() + Hora);
    
            // Define o cookie para o usuário barraqueiro
            resp.cookie('cookie_usuario', usuario.cd_barraqueiro, {
                httpOnly: true,
                expires: dtQuandoIraExpirar
            });
    
            // Pega a preferência de tema do banco de dados
            const themePreference = usuario.themePreference || 'light'; // 'light' como padrão
    
            // Define o cookie com a preferência de tema
            resp.cookie('theme_preference', themePreference, {
                httpOnly: true,
                expires: dtQuandoIraExpirar
            });
    
            return resp.status(200).json({ msg: 'Login bem-sucedido!', usuario, themePreference });
        } catch (error) {
            console.error(error);
            return resp.status(500).json({ msg: 'Erro no servidor ao tentar fazer login!' });
        }
    },
    
    
    // Função para realizar o logout de um usuário autenticado
    LogoutUsuario: async (req, resp) => {
        try {
            // Limpa as informações de autenticação do usuário
            resp.clearCookie('cookie_usuario');
            console.log({ msg: 'Logout bem sucedido.' });
    
            // Redireciona o usuário para a página inicial
            resp.redirect('/LandPage');
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
            resp.status(500).json({ msg: 'Erro ao fazer logout.' });
        } 
    },

    // Middleware para verificar se o usuário não está autenticado
    verificarAutenticacao: async (req, resp, next) => {
        // Verifica se o cookie de autenticação está presente
        if (req.cookies.cookie_usuario) {
            // Se o usuário estiver autenticado, continua para a próxima rota
            next();
        } else {
            // Se não estiver autenticado, redireciona para a página de login
            return resp.redirect('/');
        }
    }   
}
