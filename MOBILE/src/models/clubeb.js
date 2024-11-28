const { DataTypes } = require("sequelize");
const { conexaoSequelize } = require("../../config/bdConnection");
const { padraoTables } = require("../../config/configTabelas");
const { ModelCarrinho } = require("./carrinho");

const ModelClubeB = conexaoSequelize.define('clube', {
    cd_clube: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true, 
        primaryKey: true 
    },
    cd_carrinho: DataTypes.INTEGER,
    nm_clube: DataTypes.TEXT(100),
    vl_entrada: DataTypes.FLOAT,
    dt_criacao: DataTypes.DATE,
    ds_diferencial: DataTypes.TEXT(500),
    nm_imgClube: DataTypes.STRING(100)
}, padraoTables('clube'));

ModelCarrinho.hasMany(ModelClubeB, {foreignKey: 'cd_carrinho'});
ModelClubeB.belongsTo(ModelCarrinho, {foreignKey: 'cd_carrinho'});

module.exports = {
    ModelClubeB
}