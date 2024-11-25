const { DataTypes, DECIMAL, ENUM } = require('sequelize')
const {conexaoSequelize} = require('../../config/bdConnection')
const {padraoTables} = require ('../../config/configTabelas')

const ModelCliente = conexaoSequelize.define('cliente', {
                    // Busca diretamente no banco um table com o nome destro das '' 
    cd_cliente: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true, // Definidindo autoIncrement: true (caso a tabela seja cirado sem valor, o próprio banco cria um valor único para esse coluna)
        primaryKey: true 
    },
    nm_cliente: DataTypes.STRING(45),
    nm_sobrenomeC: DataTypes.STRING(45),
    ds_emailC: DataTypes.STRING(100),
    ds_senhaC: DataTypes.STRING(15),
    nmr_telefoneC: DataTypes.DECIMAL(15),
    nm_cidade:DataTypes.ENUM('São Vicente', 'Praia Grande', 'Santos', 'Guarujá', 'Itanhaém'),
    nm_imgPerfilC: DataTypes.STRING(100),
    dt_entrada: DataTypes.DATE,
    ds_contaAtiva: DataTypes.ENUM('ativa', 'desativa'),
    themePreference: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'light'
    }
}, padraoTables('cliente'));

module.exports = {
    ModelCliente
}