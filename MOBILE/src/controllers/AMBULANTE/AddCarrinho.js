const { ModelCardapio } = require("../../models/cardapio");
const { ModelCarrinho } = require("../../models/carrinho");
const { ModelImgCarrinho } = require("../../models/imgCarrinho");

module.exports = {
    AdicionarCarrinho: async (req, res) => {
        try {
            const usuario = req.cookies.cookie_usuario;
    
            const {
                nmCarrinho,
                locCarrinho,
                dsCarrinho,
                qtConjunto,
                vlReserva,
                dsCidade,
                hrInicioReserva,
                hrFimReserva
            } = req.body;

            // Função para arredondar os minutos para 00 ou 30
            const roundMinutes = (time) => {
                const [hour, minutes] = time.split(":").map(Number);
                const roundedMinutes = minutes < 30 ? 0 : 30;  // Se minutos < 30, arredonda para 00, senão para 30
                const roundedHour = roundedMinutes === 0 && minutes >= 30 ? hour + 1 : hour;  // Se for 30, aumenta a hora
                return `${String(roundedHour).padStart(2, "0")}:${String(roundedMinutes).padStart(2, "0")}`;
            };

            // Arredondando os horários
            const hrInicioReservaArredondado = roundMinutes(hrInicioReserva);
            const hrFimReservaArredondado = roundMinutes(hrFimReserva);

            // Criando o carrinho com os horários arredondados
            const CarrinhoProposto = await ModelCarrinho.create({
                cd_barraqueiro: usuario,
                nm_carrinho: nmCarrinho,
                ds_cidade: dsCidade,
                ds_localizacao: locCarrinho,
                ds_carrinho: dsCarrinho,
                qt_conjunto: qtConjunto,
                hr_inicioReserva: hrInicioReservaArredondado, // Usando o horário arredondado
                hr_fimReserva: hrFimReservaArredondado, // Usando o horário arredondado
                vl_reserva: vlReserva
            });

            await ModelCardapio.create({
                cd_carrinho: CarrinhoProposto.cd_carrinho
            });

            const files = req.files;

            if (files && files.length > 0) {
                const registrosImagens = files.map(file => ({
                    cd_carrinho: CarrinhoProposto.cd_carrinho,
                    nm_imgCarrinho: file.filename
                }));
            
                for (let i = 0; i < registrosImagens.length; i++) {
                    try {
                        await ModelImgCarrinho.create(registrosImagens[i]);
                    } catch (error) {
                        console.error(`Erro ao adicionar imagem ${registrosImagens[i].nm_imgCarrinho}:`, error);
                    }
                }
            }

            res.status(201).json({ message: 'Carrinho e imagens adicionados com sucesso!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao adicionar carrinho e imagens.' });
        }
    }
};
