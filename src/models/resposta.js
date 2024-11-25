const { DataTypes } = require('sequelize')
const {conexaoSequelize} = require('../../config/bdConnection')
const {padraoTables} = require ('../../config/configTabelas');
const { ModelCliente } = require('./cliente');
const { ModelComentario } = require('./comentarios');

const ModelResposta = conexaoSequelize.define('Resposta', {
    cd_resposta: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true 
    }, 
    cd_avali: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ModelComentario,
            key: 'cd_avali'
        }
    },
    cd_cliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ModelCliente, 
            key: 'cd_cliente'
        }
    },
    ds_resposta: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    dt_resposta: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, padraoTables('resposta'));

ModelResposta.belongsTo(ModelComentario, { foreignKey: 'cd_avali'});
ModelResposta.belongsTo(ModelCliente, { foreignKey: 'cd_cliente'});

ModelComentario.hasMany(ModelResposta, { foreignKey: 'cd_avali'});

module.exports = {
    ModelResposta
} 