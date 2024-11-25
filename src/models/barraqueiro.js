const { DataTypes, DECIMAL, INTEGER } = require('sequelize')
const {conexaoSequelize} = require('../../config/bdConnection')
const {padraoTables} = require ('../../config/configTabelas');
const { ModelPlano } = require('./plano');

const Modelbarraqueiro = conexaoSequelize.define('barraqueiro', {
    cd_barraqueiro: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true, 
        primaryKey: true 
    },
    nm_barraqueiro: DataTypes.STRING(85),
    nm_sobrenomeB: DataTypes.STRING(85),
    ds_emailB: DataTypes.STRING(100),
    cd_cpfB: DataTypes.CHAR(15),
    ds_senhaB: DataTypes.STRING(100),
    nmr_telefoneB: DataTypes.CHAR(20),
    dt_entrada: DataTypes.DATE,
    nm_imgPerfilB: DataTypes.TEXT(200),
    cd_plano: DataTypes.INTEGER,
    cd_token: DataTypes.STRING(100),
    ds_contaAtiva: DataTypes.ENUM('ativa', 'desativa'),
    themePreference: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'light'
    }
}, padraoTables('barraqueiro'));

ModelPlano.hasMany(Modelbarraqueiro, {foreignKey: 'cd_plano'})
Modelbarraqueiro.belongsTo(ModelPlano, {foreignKey: 'cd_plano'})

module.exports = {
    Modelbarraqueiro
}