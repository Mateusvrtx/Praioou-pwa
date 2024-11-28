const bcrypt = require('bcryptjs'); 
const { ModelCliente } = require('../models/cliente');
const { Modelbarraqueiro } = require('../models/barraqueiro');

module.exports = {
    CadastrarUsuario: async (req, resp) => {
        const {
            nmDigit,
            sobnmDigit,
            emailDigit, 
            senhaDigit ,
            nmrTelDigit ,
            nmCidade
        } = req.body;

    
        try {
            let UsuarioProposto = await ModelCliente.findOne({ where: { ds_emailC: emailDigit }});
    
            if (UsuarioProposto) {
                return resp.status(409).json({ msg: 'Já existe um usuário com esse email!' });
            }
    
            if (!senhaDigit) {
                return resp.status(400).json({ msg: 'A senha não foi fornecida!' });
            }
    
            const hashedSenha = await bcrypt.hash(senhaDigit, 10);
    
            UsuarioProposto = await ModelCliente.create({
                nm_cliente: nmDigit,
                nm_sobrenomeC: sobnmDigit,
                ds_emailC: emailDigit,
                ds_senhaC: hashedSenha, 
                nmr_telefoneC: nmrTelDigit,
                nm_cidade: nmCidade,
                nm_imgPerfilC: null,
                dt_entrada: Date.now(),
                ds_contaAtiva: 'ativa'
            });
    
            console.log({ msg: `Usuário ${nmDigit} criado com sucesso!` });
            return resp.status(201).json({ msg: `Usuário ${nmDigit} criado com sucesso!` });
        } catch (error) {
            console.error(error);
            return resp.status(500).json({ msg: 'Erro no servidor ao tentar cadastrar usuário!' });
        }
    },
    
    LoginUsuario: async (req, resp) => {
        const { emailDigit, senhaDigit } = req.body;
    
        try {
            const usuario = await ModelCliente.findOne({ where: { ds_emailC: emailDigit } });
    
            if (usuario) {
                const senhaCorretaC = await bcrypt.compare(senhaDigit, usuario.ds_senhaC);
                if (!senhaCorretaC) {
                    return resp.status(401).json({ msg: 'Senha incorreta!' });
                }

                const Hora = 3600000;
                const dia = Hora * 24;
                const dtQuandoIraExpirar = new Date(Date.now() + dia);

                resp.cookie('cookie_usuario', usuario.cd_cliente, {
                    httpOnly: true,
                    expires: dtQuandoIraExpirar
                });
    
                
                const themePreference = usuario.themePreference; 
                
                return resp.status(200).json({ msg: 'Login bem-sucedido!', usuario, themePreference });
            }
    
            const barraqueiro = await Modelbarraqueiro.findOne({ where: { ds_emailB: emailDigit } });
    
            if (barraqueiro) {
                const senhaCorretaB = await bcrypt.compare(senhaDigit, barraqueiro.ds_senhaB);
                if (!senhaCorretaB) {
                    return resp.status(401).json({ msg: 'Senha incorreta!' });
                }
    
                const Hora = 3600000;
                const dia = Hora * 24;
                const dtQuandoIraExpirar = new Date(Date.now() + dia);
    
                resp.cookie('cookie_usuario', barraqueiro.cd_barraqueiro, {
                    httpOnly: true,
                    expires: dtQuandoIraExpirar
                });
    
                const themePreference = barraqueiro.themePreference; // Supondo que `themePreference` seja a coluna correta
    
                return resp.status(201).json({ msg: 'Login bem-sucedido!', barraqueiro, themePreference });
            }

            return resp.status(404).json({ msg: 'Usuário não encontrado!' });
        } catch (error) {
            console.error(error);
            return resp.status(500).json({ msg: 'Erro no servidor ao tentar fazer login!' });
        }
    },
    
    LogoutUsuario: async (req, resp) => {
        try {
            resp.clearCookie('cookie_usuario');
            console.log({ msg: 'Logout bem sucedido.' });
    
            resp.redirect('/');
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
            resp.status(500).json({ msg: 'Erro ao fazer logout.' });
        } 
    },

    verificarAutenticacao: async (req, resp, next) => {
        if (req.cookies.cookie_usuario) {
            next();
        } else {
            return resp.redirect('/');
        }
    },
    
    updateThemePreferenceB: async (req, res) => {
        try {
            const userId = req.cookies.cookie_usuario;
            if (!userId) {
                return res.status(401).json({ msg: 'Usuário não autenticado!' });
            }
            const { themePreference } = req.body;
            const barraqueiro = await Modelbarraqueiro.findByPk(userId);
            if (!barraqueiro) {
                return res.status(404).json({ msg: 'Usuário não encontrado!' });
            }
          
            barraqueiro.themePreference = themePreference;
            await barraqueiro.save();
            
            return res.status(200).json({ msg: 'Preferência de tema atualizada com sucesso!' });
        } catch (error) {
            console.error('Erro ao atualizar preferência de tema:', error);
            return res.status(500).json({ msg: 'Erro no servidor!' });
        }
    },

    updateThemePreference: async (req, res) => {
        try {
            const userId = req.cookies.cookie_usuario;
            if (!userId) {
                return res.status(401).json({ msg: 'Usuário não autenticado!' });
            }
            const { themePreference } = req.body;
            const cliente = await ModelCliente.findByPk(userId);
            if (!cliente) {
                return res.status(404).json({ msg: 'Usuário não encontrado!' });
            }
          
            cliente.themePreference = themePreference;
            await cliente.save();
            
            return res.status(200).json({ msg: 'Preferência de tema atualizada com sucesso!' });
        } catch (error) {
            console.error('Erro ao atualizar preferência de tema:', error);
            return res.status(500).json({ msg: 'Erro no servidor!' });
        }
    }
    
}
