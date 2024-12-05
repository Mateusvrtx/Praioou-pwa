const express = require('express');
const router = express.Router();
const auth = require('../controllers/autenticacao');
const authB = require('../controllers/autenticacaoB');
const comentarios = require('../controllers/BANHISTA/comentarios');
const carrinho = require('../controllers/BANHISTA/perfilBarraca');
const { findAllProdutos } = require('../controllers/BANHISTA/produto');
const pagamento = require('../controllers/pagamento');
const sacola = require('../controllers/BANHISTA/Sacola');
const perfil = require('../controllers/BANHISTA/perfil');
const cupom = require('../controllers/BANHISTA/cupons');
const { CarregarPontosClube, VerificarClube, CarregarTodosOsClubes } = require('../controllers/BANHISTA/clube');
const { AdiconarHistorico } = require('../controllers/BANHISTA/compraCerta');
const { CarregarHistorico } = require('../controllers/BANHISTA/historico');
const { CarregarNotificacoes } = require('../controllers/BANHISTA/notificacao');
const { filtroSalgado, filtroDoce, filtroBebida, FiltroPrecoTempo} = require('../controllers/BANHISTA/filtro');
const { imgPerfil, UploadImgPerfilC, ExcluirImagem } = require('../controllers/BANHISTA/upload');
const uploadMiddleware = require('../../middlewares/upload');
const { RenderCarrinhos, RenderComanda, CancelarPedido, EntregarPedido } = require('../controllers/AMBULANTE/comanda');
const AddCarrinho = require('../controllers/AMBULANTE/AddCarrinho');
const { CarregarPerfilB, CarregarConfigB, UploadImgPerfilB, imgPerfilB, ExcluirImagemB } = require('../controllers/AMBULANTE/PerfilB');
const { CarregarCarrinhos } = require('../controllers/AMBULANTE/inicial');
const { InfoCarrinho } = require('../controllers/AMBULANTE/Carrinho');
const { CarregarCardapio } = require('../controllers/AMBULANTE/Cardapio');
const AddProduto = require('../controllers/AMBULANTE/AddProduto');
const AddClube = require('../controllers/AMBULANTE/AddClube');
const { PagamentoReserva } = require('../controllers/AMBULANTE/reserva');

/* Bianca - dados */
const dadosController = require('../controllers/AMBULANTE/dadosController');
const { FiltroValorCarrinho } = require('../controllers/BANHISTA/filtros');
const { CarregarHorarios, ReservaPaga } = require('../controllers/BANHISTA/reserva');
const { CarregarCardapioClube, CarregarEditCardapioClube, AtualizarProdutoClube } = require('../controllers/AMBULANTE/CardapioClube');
const { CarregarEditClube, EditarClube } = require('../controllers/AMBULANTE/clube');
const { RenderNotificacoes, VizualziarNotificacao } = require('../controllers/AMBULANTE/Notificacao');
const { CarregarReservasPorHora, RenderCarrinhosReserva } = require('../controllers/AMBULANTE/ReservasCad');
const { ModelCarrinho } = require('../models/carrinho');
const { CarregarRecibos, CarregarCarrinhosRecibos } = require('../controllers/AMBULANTE/Recibos');
const { CarregarReservas } = require('../controllers/BANHISTA/SuasReservas');
const { CarregarEntrarClube } = require('../controllers/BANHISTA/clubeEntrar');
const { CarregarInformacoes, EditarCarrinho } = require('../controllers/AMBULANTE/EditarCarrinho');

/* BIANCA - GRÁFICO EM DADOS */
router.get('/dados', auth.verificarAutenticacao, dadosController.renderDados);
// Endpoint to fetch data for the chart
router.post('/dados/api', auth.verificarAutenticacao, dadosController.renderPedidosPage);

//////////////////// Rotas GET ////////////////////

// PADRÃO
router.get('/', async (req, resp) => { return resp.render('login/index.ejs'); });
router.get('/escolher', async (req, resp) => { return resp.render('escolher/index.ejs'); });
router.get('/problemas', async (req, resp) => { return resp.render('sac/problemas/index.ejs'); });
router.get('/duvidas', async (req, resp) => { return resp.render('sac/duvidas/index.ejs'); });
router.get('/denuncia', async (req, resp) => { return resp.render('sac/denuncia/index.ejs'); });

// BANHISTA
router.get('/CadBanhista', async (req, resp) => { return resp.render('banhista/CadBanhista/index.ejs'); });
router.get('/cardapio', auth.verificarAutenticacao, async (req, resp) => { return resp.render('banhista/cardapio/index.ejs'); });
router.get('/inicial', auth.verificarAutenticacao, async (req, resp) => { return resp.render('banhista/inicial/index.ejs'); });
router.get('/carrinho', auth.verificarAutenticacao, async (req, resp) => { return resp.render('banhista/carrinho/index.ejs'); });
router.get('/reserva', auth.verificarAutenticacao, async (req, resp) => { return resp.render('banhista/reserva/index.ejs'); });
router.get('/trocar-conta', auth.verificarAutenticacao, async (req, resp) => { return resp.render('banhista/TrocarConta/index.ejs'); })
router.get('/editar-dados', auth.verificarAutenticacao, async (req, resp) => { return resp.render('banhista/EditarDados/index.ejs'); })
router.get('/config-perfil', auth.verificarAutenticacao,  async (req, resp) => { return resp.render('banhista/perfilConfig/index.ejs'); })
router.get('/semreserva', auth.verificarAutenticacao, async (req, resp) => { return resp.render('banhista/SacolaSemReserva/index.ejs'); })
router.get('/carrinhosemreserva', auth.verificarAutenticacao, async (req, resp) => { return resp.render('banhista/CarrinhoSemReserva/index.ejs'); })
router.get('/clubePontos', auth.verificarAutenticacao, async (req, resp) => { return resp.render('banhista/clube/index.ejs'); });
router.get('/reserva', auth.verificarAutenticacao, async (req, resp) => { return resp.render('banhista/reserva/index.ejs'); });
router.get('/sacola', auth.verificarAutenticacao, async (req, resp) => { return resp.render('banhista/sacola/index.ejs'); });
router.get('/produtos/:id', auth.verificarAutenticacao, findAllProdutos);
router.get('/clube-entrar', auth.verificarAutenticacao, async (req, resp) => { return resp.render('banhista/ClubeEntrar/index.ejs'); })
router.get('/clubeInicial', auth.verificarAutenticacao, async (req, resp) => { return resp.render('banhista/TelaClube/index.ejs'); })
router.get('/TodosClubes', auth.verificarAutenticacao, async (req, resp) => { return resp.render('banhista/TodosClubes/index.ejs'); })
router.get('/perfil', auth.verificarAutenticacao, async (req, resp) => { return resp.render('banhista/perfill/index.ejs'); });
router.get('/cupons', auth.verificarAutenticacao, async (req, resp) => { return resp.render('banhista/cupons/index.ejs'); });
router.get('/historico', auth.verificarAutenticacao, async (req, resp) => { return resp.render('banhista/historico/index.ejs'); })
router.get('/notificacao', auth.verificarAutenticacao, async (req, resp) => { return resp.render('banhista/notificacao/index.ejs'); });
router.get('/seus-clubes', auth.verificarAutenticacao, async (req, resp) => { return resp.render('banhista/SeusClubes/index.ejs'); })
router.get('/mapa', auth.verificarAutenticacao, async (req, resp) => { return resp.render('banhista/mapa/index.ejs'); })
router.get('/reservando', auth.verificarAutenticacao, async (req, resp) => { return resp.render('banhista/reservando/index.ejs'); })
router.get('/reservaPaga', async (req, resp) => { return resp.render('banhista/reservaPaga/index.ejs'); })
router.get('/suasReservas', auth.verificarAutenticacao, async (req, resp) => { return resp.render('banhista/suasReservas/index.ejs'); })
router.get('/DetalhesCardapio', auth.verificarAutenticacao, async (req, resp) => { return resp.render('banhista/CardapioEscolhaClube/index.ejs'); })
router.get('/EscolhidoClube', auth.verificarAutenticacao, async (req, resp) => { return resp.render('banhista/CardapioEscolhaClube/index.ejs'); });
router.get('/ProdutoEscolhidoClube', auth.verificarAutenticacao, async (req, resp) => { return resp.render('banhista/ProdutoCarrinhoClube/index.ejs'); });


// AMBULANTE
router.get('/CadBarraqueiro', async (req, resp) => { return resp.render('ambulante/CadBarraqueiro/index.ejs'); });
router.get('/inicialB', auth.verificarAutenticacao, CarregarCarrinhos )
router.get('/planosCadastro', auth.verificarAutenticacao,async (req, resp) => { return resp.render('ambulante/CadPlanos/index.ejs'); });
router.get('/CarrinhoAmb/:id', auth.verificarAutenticacao, InfoCarrinho);
router.get('/notificacaoB', auth.verificarAutenticacao, async (req, resp) => { return resp.render('ambulante/notificacaoB/index.ejs'); });
router.get('/planos', auth.verificarAutenticacao, async (req, resp) => { return resp.render('ambulante/planos/index.ejs'); })
router.get('/perfilB', auth.verificarAutenticacao, imgPerfilB, CarregarPerfilB)
router.get('/configB', auth.verificarAutenticacao, CarregarConfigB)
router.get('/comanda', auth.verificarAutenticacao, RenderCarrinhos)
router.get('/editarCarrinho/:id', auth.verificarAutenticacao, CarregarInformacoes)
router.get('/meus-clubes', auth.verificarAutenticacao, async (req, resp) => { return resp.render('ambulante/MeusClubes/index.ejs'); })
router.get('/cardapio-clube', auth.verificarAutenticacao, async (req, resp) => { return resp.render('ambulante/CardapioClube/index.ejs'); })
router.get('/cardapio-clube-edit', auth.verificarAutenticacao, async (req, resp) => { return resp.render('ambulante/CardapioClubeE/index.ejs'); })
router.get('/cardapio-clube/:idClube', auth.verificarAutenticacao, CarregarCardapioClube)
router.get('/cardapio-clube-edit/:idClube', auth.verificarAutenticacao, CarregarEditCardapioClube)
// router.get('/dados', auth.verificarAutenticacao, async (req, resp) => { return resp.render('ambulante/dados/index.ejs'); })
router.get('/AddCarrinho', auth.verificarAutenticacao, async (req, resp) => { return resp.render('ambulante/AddCarrinho/index.ejs'); })
router.get('/AddCardapio/:id', auth.verificarAutenticacao, CarregarCardapio)
router.get('/AddProduto/:id', auth.verificarAutenticacao, async (req, resp) => { return resp.render('ambulante/AddProduto/index.ejs'); })
router.get('/ClubeJSON', auth.verificarAutenticacao, AddClube.CarregarClubesJson);
router.get('/CluberJSON/ClubeB', auth.verificarAutenticacao, AddClube.CarregarClubes);
router.get('/Alterardados', auth.verificarAutenticacao, async (req, resp) => { return resp.render('ambulante/AlterarDados/index.ejs'); })
router.get('/Recibos', auth.verificarAutenticacao, CarregarCarrinhosRecibos)
router.get('/CarregarNotificacoes', RenderNotificacoes)
router.get('/AddClube', auth.verificarAutenticacao, AddClube.CarregarCarrinhosAddClube)
router.get('/EditClube/:idClube', auth.verificarAutenticacao, CarregarEditClube)
router.get('/Privacidade', auth.verificarAutenticacao, async (req, resp) => { return resp.render('ambulante/Privacidade/index.ejs'); })
router.get('/Reservacad', auth.verificarAutenticacao, RenderCarrinhosReserva)
router.get('/Tutorial', auth.verificarAutenticacao, async (req, resp) => { return resp.render('ambulante/Tutorial/index.ejs'); })
router.get('/termos', auth.verificarAutenticacao, async (req, resp) => { return resp.render('ambulante/Termos/index.ejs'); })
//////////////////// Rotas POST ////////////////////

// PADRÃO
router.post('/login', auth.LoginUsuario);
router.post('/logout', auth.LogoutUsuario);


// BANHISTA
router.post('/cadastrar', auth.CadastrarUsuario);
router.post('/sacola', sacola.AddItemSacola);
router.post('/FinalizarPedido', pagamento.iniciarPagamento);
router.post('/update-quantidade', sacola.UpdateQuantidade);
router.post('/remove-produto', sacola.RemoveProduto);
router.post('/atualizarNome', perfil.AtualizarNome);
router.post('/comentarios/adicionar', comentarios.adcComentario);
router.post('/comentarios/responder', comentarios.responderComentario);
router.post('/DeletarConta', perfil.ExcluirConta);
router.post('/filtroSalgado/:id', filtroSalgado);
router.post('/filtroDoce/:id', filtroDoce);
router.post('/filtroBebida/:id', filtroBebida);
router.post('/upload', auth.verificarAutenticacao, uploadMiddleware.single('file'), UploadImgPerfilC);
router.post('/FiltroCarrinhos', auth.verificarAutenticacao, FiltroValorCarrinho)
router.post('/update-themeC', auth.updateThemePreference);
router.post('/VerificarClube/:id', VerificarClube)
router.post('/filtroPreco/:id', FiltroPrecoTempo)

router.delete('/imgPerfil', ExcluirImagem);

// AMBULANTE
router.post('/cadastrarB', authB.CadastrarUsuarioB); 
router.post('/RenderComanda', RenderComanda)
router.post('/AddCarrinho', auth.verificarAutenticacao, uploadMiddleware.array('file', 5), AddCarrinho.AdicionarCarrinho);
router.post('/AddProduto', auth.verificarAutenticacao, uploadMiddleware.single('file'), AddProduto.AddProduto);
router.post('/AddClube', uploadMiddleware.single('file'),AddClube.AdicionarClube);
router.post('/reservar', PagamentoReserva);
router.post('/CancelarPedido', CancelarPedido)
router.post('/EntregarPedido', EntregarPedido)
router.post('/imgPerfilB', auth.verificarAutenticacao, uploadMiddleware.single('file'), UploadImgPerfilB);
router.post('/imgPerfilB', uploadMiddleware.single('file'), UploadImgPerfilB);
router.post('/addProdutoClube', AtualizarProdutoClube)
router.post('/EditarClube', EditarClube)
router.post('/update-theme', auth.updateThemePreferenceB);
router.post('/VizualizarNotificacao', VizualziarNotificacao)
router.post('/CarregarReservas', CarregarReservasPorHora)
router.post('/CarregarRecibos', CarregarRecibos)
router.post('/EditarCarrinho/:id', EditarCarrinho)

router.delete('/imgPerfilB', ExcluirImagemB);

// Rotas GET para o pagamento
router.get('/compracerta', async (req, resp) => { return resp.render('banhista/compracerta/index.ejs'); });
router.get('/compraerrada', pagamento.renderCompraErrada);

module.exports = router;
