const { DataTypes, DECIMAL } = require('sequelize')
const {conexaoSequelize} = require('../../config/bdConnection')
const {padraoTables} = require ('../../config/configTabelas');
const { ModelCardapio } = require('./cardapio');

const ModelProduto = conexaoSequelize.define('produto', {
    cd_produto: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true 
    },
    cd_cardapio: DataTypes.INTEGER,
    nm_produto: DataTypes.STRING(45),
    ds_produto: DataTypes.TEXT(150),
    vl_produto: DataTypes.FLOAT,
    ds_categoria:DataTypes.ENUM('doce', 'salgado', 'bebida'),
    ds_tipo_venda: DataTypes.ENUM('unidade', 'porção'),
    hr_tempo_preparo: DataTypes.INTEGER ,
    nm_imgProduto: DataTypes.STRING(200),
    bl_produto_clube: DataTypes.BOOLEAN
}, padraoTables('produto'));

ModelCardapio.hasMany(ModelProduto, {foreignKey: 'cd_cardapio'});
ModelProduto.belongsTo(ModelCardapio, {foreignKey: 'cd_cardapio'})

module.exports = {
    ModelProduto
}