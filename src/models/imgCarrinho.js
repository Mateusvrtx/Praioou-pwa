const { DataTypes, DECIMAL, INTEGER } = require('sequelize')
const {conexaoSequelize} = require('../../config/bdConnection')
const {padraoTables} = require ('../../config/configTabelas');
const { ModelCarrinho } = require('./carrinho');

const ModelImgCarrinho = conexaoSequelize.define('imgCarrinho', {
    cd_imagem:{
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true, 
        primaryKey: true 
    },
    cd_carrinho: DataTypes.INTEGER,
    nm_imgCarrinho: DataTypes.TEXT(100)
}, padraoTables('imgCarrinho'))

ModelCarrinho.hasMany(ModelImgCarrinho, {foreignKey: 'cd_carrinho'})
ModelImgCarrinho.belongsTo(ModelCarrinho, {foreignKey: 'cd_carrinho'})

module.exports = {
    ModelImgCarrinho
}