const { DataTypes } = require('sequelize')
const {conexaoSequelize} = require('../../config/bdConnection')
const {padraoTables} = require ('../../config/configTabelas');
const { ModelCarrinho } = require('./carrinho');
const {ModelCliente} = require('./cliente');

const ModelReserva = conexaoSequelize.define('reserva', {
    cd_reserva: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true 
    },
    cd_carrinho: DataTypes.INTEGER,
    cd_cliente: DataTypes.INTEGER,
    dt_reserva: DataTypes.DATEONLY,
    hr_reserva: DataTypes.TIME,
    qt_pessoas: DataTypes.INTEGER,
    vl_reserva: DataTypes.FLOAT,
    ds_reserva: DataTypes.ENUM('Finalizada','Ativa', 'Cancelada'),
    ds_pagamento: DataTypes.ENUM('pendente','pago'),
    hr_lembrete: DataTypes.TIME,
    nm_reservante: DataTypes.TEXT(85)
}, padraoTables('reserva'));

ModelCarrinho.hasMany(ModelReserva, {foreignKey: 'cd_carrinho'});
ModelReserva.belongsTo(ModelCarrinho, {foreignKey: 'cd_carrinho'});

ModelCliente.hasMany(ModelReserva, {foreignKey: 'cd_cliente'});
ModelReserva.belongsTo(ModelCliente, {foreignKey: 'cd_cliente'});

module.exports = {
    ModelReserva
} 
