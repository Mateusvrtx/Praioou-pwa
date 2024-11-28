const { DataTypes, DECIMAL, INTEGER } = require('sequelize')
const {conexaoSequelize} = require('../../config/bdConnection')
const {padraoTables} = require ('../../config/configTabelas');
const { Modelbarraqueiro } = require('./barraqueiro');

const ModelCarrinho = conexaoSequelize.define('carrinho', {
    cd_carrinho: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true, 
        primaryKey: true 
    },
    cd_barraqueiro: DataTypes.INTEGER,
    nm_carrinho: DataTypes.STRING(45),
    ds_cidade: DataTypes.ENUM('São Vicente', 'Praia Grande', 'Santos', 'Guarujá', 'Itanhaém'),
    ds_localizacao: DataTypes.TEXT(85),
    ds_carrinho: DataTypes.TEXT(500),
    qt_conjunto: DataTypes.INTEGER,
    hr_inicioReserva: DataTypes.TIME,
    hr_fimReserva: DataTypes.TIME,
    vl_reserva: DataTypes.FLOAT
}, padraoTables('carrinho'));

Modelbarraqueiro.hasMany(ModelCarrinho, { foreignKey: 'cd_barraqueiro' });
ModelCarrinho.belongsTo(Modelbarraqueiro, { foreignKey: 'cd_barraqueiro' });

module.exports = {
    ModelCarrinho
}