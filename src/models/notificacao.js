const { DataTypes, DECIMAL, INTEGER } = require('sequelize')
const {conexaoSequelize} = require('../../config/bdConnection')
const {padraoTables} = require ('../../config/configTabelas');
const { ModelCliente } = require('./cliente');
const { Modelbarraqueiro } = require('./barraqueiro');

const ModelNotificacao = conexaoSequelize.define('notificacao', {
    cd_notificacao:{
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true, 
        primaryKey: true 
    },
    cd_barraqueiro: DataTypes.INTEGER,
    cd_cliente: DataTypes.INTEGER,
    ds_destinatario: DataTypes.ENUM('ambulante', 'banhista'),
    ds_titulo: DataTypes.TEXT(500),
    ds_descricao: DataTypes.TEXT(500),
    dt_notificacao: DataTypes.DATE,
    ds_tipo: DataTypes.ENUM('Nova estatistica','Nova Reserva', 'Plano Atualizado', 'Reserva cancelada','Novo membro Clube', 'Novo pedido', 'Novo pedido Clube','Clube Criado'),
    ds_vizu: DataTypes.BOOLEAN
}, padraoTables('notificacao'))

Modelbarraqueiro.hasMany(ModelNotificacao, {foreignKey: 'cd_barraqueiro'})
ModelNotificacao.belongsTo(Modelbarraqueiro, {foreignKey: 'cd_barraqueiro'})

ModelCliente.hasMany(ModelNotificacao, {foreignKey: 'cd_cliente'})
ModelNotificacao.belongsTo(ModelCliente, {foreignKey: 'cd_cliente'})

module.exports = {
    ModelNotificacao
}