drop database if exists db_praioou;
create database db_praioou;

use db_praioou;
	
create table if not exists cliente (
	cd_cliente int AUTO_INCREMENT,
    nm_cliente varchar(45),
    nm_sobrenomeC varchar(45),
    ds_emailC varchar(100),
    ds_senhaC varchar(100),
    nmr_telefoneC varchar(15),
    nm_cidade enum('São Vicente', 'Praia Grande', 'Santos', 'Guarujá', 'Itanhaém'),
    dt_entrada date,
    nm_imgPerfilC varchar(100),
	ds_contaAtiva enum('ativa', 'desativa'),
    themePreference VARCHAR(10) NOT NULL DEFAULT 'light',
    
	constraint pk_cliente
		primary key (cd_cliente)
);

select * from cliente;

create table if not exists plano(
	cd_plano int auto_increment,
	nm_plano varchar(30),
    dt_plano date,
    vl_plano decimal(3,1),
    
    constraint pk_plano
		primary key(cd_plano)
);

create table if not exists barraqueiro (
	cd_barraqueiro int auto_increment,
    nm_barraqueiro varchar(85),
    nm_sobrenomeB varchar(85),
    ds_emailB varchar(100),
    cd_cpfB char (17),
    ds_senhaB varchar (100),
    nmr_telefoneB char(20),
    dt_entrada date,
	cd_plano int,
    nm_imgPerfilB varchar(200),
    cd_token varchar(100),
    ds_contaAtiva enum('ativa', 'desativa'),
    themePreference VARCHAR(10) NOT NULL DEFAULT 'light',
    
    constraint pk_barraqueiro
		primary key (cd_barraqueiro),
        
	constraint fk_plano_barraqueiro
		foreign key(cd_plano)
			references plano(cd_plano) on delete cascade
);

create table if not exists carrinho (
	cd_carrinho int auto_increment,
    cd_barraqueiro int,
    nm_carrinho varchar(45),
    ds_cidade enum('São Vicente', 'Praia Grande', 'Santos', 'Guarujá', 'Itanhaém'),
    ds_localizacao text(85),
    ds_carrinho text(500),
    qt_conjunto int,
    hr_inicioReserva time,
    hr_fimReserva time,
    vl_reserva float,
    
    constraint pk_carrinho
		primary key (cd_carrinho),
        
	constraint fk_barraqueiro_carrinho
		foreign key(cd_barraqueiro)
			references barraqueiro(cd_barraqueiro) on delete cascade
);

create table if not exists imgCarrinho (
	cd_imagem int auto_increment,
    cd_carrinho int,
    nm_imgCarrinho varchar(100),
    
    constraint pk_imgCarrinho
		primary key (cd_imagem),
    
    constraint fk_imgCarrinho_carrinho
		foreign key(cd_carrinho)
			references carrinho(cd_carrinho) on delete cascade
);



create table if not exists reserva (
	cd_reserva int auto_increment,
    cd_carrinho int,
    cd_cliente int,
    dt_reserva date,
    hr_reserva time,
    qt_pessoas int,
    vl_reserva float,
    ds_reserva enum('Finalizada','Ativa', 'Cancelada'),
    ds_pagamento enum('pendente','pago'),
    hr_lembrete enum('30min','1hr', '2hrs', '3hrs', '6hrs'),
    nm_reservante varchar(85),
    
    constraint pk_reserva
		primary key (cd_reserva),
        
	constraint fk_reserva_carrinho
		foreign key (cd_carrinho)
			references carrinho (cd_carrinho) on delete cascade,
        
	constraint fk_reserva_cliente
		foreign key (cd_cliente)
			references cliente(cd_cliente) on delete cascade
);

select * from imgCarrinho;

create table if not exists cardapio (
	cd_cardapio int auto_increment,
    cd_carrinho int,

    constraint pk_cardapio
		primary key (cd_cardapio),
        
	constraint fk_cardapio_carrinho
		foreign key (cd_carrinho)
			references carrinho(cd_carrinho) on delete cascade
);

create table produto (
	cd_produto int auto_increment,
    cd_cardapio int,
    nm_produto varchar(45),
    ds_produto text(150),
    vl_produto float,
    ds_categoria enum('doce', 'salgado', 'bebida'),
    ds_tipo_venda enum('unidade', 'porção'),
    nm_imgProduto varchar(200),
    hr_tempo_preparo int,
    bl_produto_clube bool,
    
    constraint pk_produto
		primary key (cd_produto),
        
	constraint fk_produto_cardapio
		foreign key (cd_cardapio)
			references cardapio(cd_cardapio) on delete cascade
);

create table if not exists pedido (
	cd_pedido int auto_increment,
	cd_carrinho int,
    cd_cliente int,
    vl_total_pedido float,
    ds_guarda_sol char(2),
    ds_observacao text(100),
    dt_pedido datetime,
	ds_tipo_pagamento enum('Cartão', 'Pix', 'Dinheiro'),
    ds_status enum('pendente', 'pago', 'entregue', 'cancelado'),
    
    constraint pk_pedido
		primary key (cd_pedido),
	
    constraint fk_pedido_cliente
		foreign key (cd_cliente)
			references cliente(cd_cliente) on delete cascade,
	
    constraint fk_carrinho
		foreign key (cd_carrinho)
			references carrinho(cd_carrinho) on delete cascade
);

create table if not exists sacola (
	cd_pedido int not null,
    cd_produto int not null,
    quantidade int,
    ds_pago bool,
    
    constraint pk_sacola
        primary key (cd_pedido, cd_produto),
    
    constraint fk_sacola_pedido
        foreign key (cd_pedido)
            references pedido(cd_pedido) on delete cascade,
    
    constraint fk_sacola_produto
        foreign key (cd_produto)
            references produto(cd_produto) on delete cascade
);

create table if not exists clube (
	cd_clube int auto_increment,
	cd_carrinho int,
    nm_clube varchar(100),
    vl_entrada float,
    dt_criacao date,
    ds_diferencial text(500),
    nm_imgClube varchar(100),
    
    constraint pk_clube
		primary key (cd_clube),
        
	constraint fk_clube_carrinho
		foreign key (cd_carrinho)
			references carrinho(cd_carrinho) on delete cascade
);

select * from clube;

create table if not exists clube_usuario (
	cd_clube int,
    cd_cliente int,
    qt_pontos decimal(45),
    dt_entrada date,
    
    constraint pk_clube_usuario
		primary key (cd_clube, cd_cliente),
        
	constraint fk_clube_usuario_clube
		foreign key (cd_clube)
			references clube (cd_clube) on delete cascade,
            
	constraint fk_clube_usuario_cliente
		foreign key (cd_cliente)
			references cliente(cd_cliente) on delete cascade
);

create table if not exists avaliacao (
	cd_avali int auto_increment,
    cd_carrinho int,
    cd_cliente int,
    ds_avaliacao text(500),
    qt_estrelas int,
    qt_like int,
    qt_deslike int,
    dt_avaliacao date,
    
    constraint pk_avaliacao
		primary key (cd_avali),
        
	constraint fk_avaliacao_carrinho
		foreign key (cd_carrinho)
			references carrinho(cd_carrinho) on delete cascade,
            
	constraint fk_avaliacao_cliente
		foreign key (cd_cliente)
			references cliente(cd_cliente) on delete cascade
);

create table if not exists favorito_carrinho(
	cd_carrinho int,
    cd_cliente int,
    
    constraint fk_carrinho_favorito
		foreign key (cd_carrinho)
			references carrinho(cd_carrinho) on delete cascade,
            
	constraint fk_favorito_cliente
		foreign key (cd_cliente)
			references cliente(cd_cliente) on delete cascade
    
);

create table if not exists favorito_produto(
	cd_produto int,
    cd_cardapio int,
    cd_cliente int,

    
    constraint fk_produto_favorito
		foreign key (cd_produto)
			references produto(cd_produto) on delete cascade,
            
	constraint fk_favorito_produto_cliente
		foreign key (cd_cliente)
			references cliente(cd_cliente) on delete cascade,
            
	constraint fk_favorito_cardapio
		foreign key (cd_cardapio)
			references cardapio(cd_cardapio) on delete cascade
);

create table if not exists cupons(
		cd_cupom int auto_increment,
		vl_cupom decimal(10,2),
        dt_validade_cupom datetime,
        cd_carrinho int,
        cd_cliente int,
        
        constraint pk_cupom
			primary key (cd_cupom),
            
	constraint fk_cupom_cliente
		foreign key (cd_cliente)
			references cliente(cd_cliente) on delete cascade,   
            
	constraint fk_cupom_carrinho
		foreign key (cd_carrinho)
			references carrinho(cd_carrinho) on delete cascade

);

select * from barraqueiro;

create table if not exists historico(
    cd_historico int auto_increment,
    cd_pedido int,
    cd_cliente int,
    cd_carrinho int,
    vl_total_pedido float,
    dt_pedido datetime,

    constraint pk_historico
        primary key (cd_historico),
        
    constraint fk_historico_cliente
        foreign key (cd_cliente)
            references cliente(cd_cliente) on delete cascade  ,
            
    constraint fk_historico_pedido
        foreign key (cd_pedido)
            references pedido(cd_pedido) on delete cascade  ,
            
    constraint fk_historico_carrinho
        foreign key (cd_carrinho)
            references carrinho(cd_carrinho) on delete cascade  
);


create table if not exists notificacao (
	cd_notificacao int auto_increment,
    cd_barraqueiro int,
	cd_cliente int,
    ds_destinatario enum('ambulante','banhista'),
    ds_titulo text(500),
    ds_descricao text(500),
    dt_notificacao date,
    ds_tipo enum('Nova estatistica','Nova Reserva', 'Plano Atualizado', 'Reserva cancelada','Novo membro Clube', 'Novo pedido', 'Novo pedido Clube','Clube Criado'),
    ds_vizu boolean,
    
    constraint pk_notifi
			primary key (cd_notificacao),
            
	constraint fk_notifi_cliente
		foreign key (cd_cliente)
			references cliente(cd_cliente) on delete cascade  
);

create table if not exists Sistema (
	cd_cliente int,
	cd_barraqueiro int,
    ds_tema enum('claro', 'escuro'),
    ds_linguagem enum('ingles', 'coreano', 'japones', 'alemão'),
    
    
    constraint fk_sistem_cliente
		foreign key (cd_cliente)
			references cliente(cd_cliente) on delete cascade,
            
	constraint fk_sistem_barraqueiro
		foreign key (cd_barraqueiro)
			references barraqueiro(cd_barraqueiro) on delete cascade
);

-- ////////// INSERT //////////////

insert into cliente values (1, 'Mateus', 'Oliveira', 'mateus@gmail.com', '$2b$10$6S29oSFkSFQXeDCiFycwdu6l9pn5Oq/LpZ5LP194vKaTCCLpNbG1W', '(13) 98877-3546','São Vicente', '2022-02-06' , null, 'ativa', 'ligth');
insert into plano value (1,'aa', '2025-05-31', 40);
    
select * from pedido;	
insert into barraqueiro values (1,'Rafael','Dantas','rafaeldantas@gmail.com',48935984628,'$2b$10$6S29oSFkSFQXeDCiFycwdu6l9pn5Oq/LpZ5LP194vKaTCCLpNbG1W',13988357898, '2021-07-05' ,1, null , null, 'ativa', default);

-- insert into barraqueiro values (2, 'Wesley', 'Ferreira', 'wesleyferreira189@gmail.com', 43190376859, )
    
insert into carrinho values
(1,1,'Flor do verão','Santos' ,'Perto do canal 4, na direção do quiosque Rosa dos ventos', 'Carrinho completo, com comida de qualidade, e atendimento unico', 12 ,'09:00:00', '17:00:00' ,30);

-- (2,1,'Sete Mares', 'Localizada na praia do itarare, na direção do quiosque Burgman','Barraca cheia de vida, alegria e comida boa, preço justo e facilidade pro pagamentos',31, 120)

insert into cupons values (4, 50, '2024-05-02 00:00:00', 1,1);

select * from reserva;

insert into reserva values (1,1,1, '2024-02-05', '12:00',4, 55.02, 'Ativa', 'pago',Null, 'Carlos');

 insert into cardapio values 
    (1,1);
    
    select * from cliente;
 
insert into notificacao values 
	(1,1,null,'ambulante','Nova Reserva','Um novo cupom foi adicionado na sua aba de cupom', '2024-10-25','Nova Reserva ', false),
    (2,1,null,'ambulante','Novo Pedido','Um novo pedido foi feito, você pode vê-lo na aba de comandas, todas as comandas seguem ordem de chegada, então fique de olho', '2024-10-25','Novo Pedido', false),
    (3,1,null,'ambulante','Nova Estatística','Um novo cupom foi adicionado na sua aba de cupom', '2024-10-25','Nova Estatistica', true);
	

select * from carrinho;
	
insert into produto values
	(1,1,'isca de frango','Deliciosas tiras de frango empanadas e fritas até a perfeição, servidas com batatas fritas crocantes. Um prato irresistível para os amantes de frango.',60,'salgado', 'porção', 'isca.jpg',50, false),
    (2,1,'pastel de frango','Pastel crocante recheado com suculento frango desfiado, temperado com especiarias que garantem um sabor inesquecível. Disponível em diversas variedades para agradar todos os paladares.', 15, 'salgado', 'unidade', 'pastelfrango.jpg',25, false),
    (3,1,'pastel de carne','Pastel frito na hora, recheado com carne moída suculenta e bem temperada. Perfeito para quem adora um salgado tradicional, com várias opções para variar no sabor.', 15, 'salgado', 'unidade', 'pasteldecarne.jpg',40, false),
    (4,1,'espetinho','Saborosos espetinhos de churrasco, grelhados à perfeição, trazendo o autêntico sabor do churrasco brasileiro. Uma excelente escolha para um lanche rápido e saboroso.', 10.40, 'salgado', 'unidade', 'espetinho.jpg',30 ,false);
select * from produto;

insert into pedido values 
	(1,1,1, 40 , 'G5','Sem cebola e sem pimenta', '2024-11-26 15:00', 'Pix', 'pago');
    -- (2,2,1, 58.12, 'G5','aaa', '2024-02-05 12:00'),
    -- (3,2,1, 58.12, 'G5','aaa', '2024-02-05 13:00');

insert into sacola values 
	(1,2,1,null);
    
insert into imgCarrinho values
	(1,1,"Carrinho(1).webp"),
    (2,1,"Carrinho(2).webp"),
    (3,1,"Carrinho(3).webp");
    

    
select * from sacola;

select * from produto;

-- ////////// INSERT EXPLICITO //////////////

insert into cliente (cd_cliente, nm_cliente, nm_sobrenomeC, ds_emailC, ds_senhaC, nmr_telefoneC, dt_entrada, nm_imgPerfilC, ds_contaAtiva) values 
(2, 'Renato', 'Oliveira', 'renatinho@gmail.com', '$2b$10$6S29oSFkSFQXeDCiFycwdu6l9pn5Oq/LpZ5LP194vKaTCCLpNbG1W', '(13) 98877-3546', '2022-02-06' , null, 'ativa'),
(3, 'Andreia', 'Silva', 'andreiaSilvinha@gmail.com', '$2b$10$6S29oSFkSFQXeDCiFycwdu6l9pn5Oq/LpZ5LP194vKaTCCLpNbG1W', '(13) 98877-3546', '2022-02-06' , null, 'ativa'),
(4, 'Carla', 'Menezes', 'carlita@gmail.com', '$2b$10$6S29oSFkSFQXeDCiFycwdu6l9pn5Oq/LpZ5LP194vKaTCCLpNbG1W', '(11) 98765-4321', '2022-03-15', null, 'ativa'),
(5, 'Felipe', 'Santos', 'felipinho_santos@gmail.com', '$2b$10$6S29oSFkSFQXeDCiFycwdu6l9pn5Oq/LpZ5LP194vKaTCCLpNbG1W', '(21) 99654-7890', '2023-01-12', null, 'ativa'),
(6, 'Mariana', 'Alves', 'marialves@gmail.com', '$2b$10$6S29oSFkSFQXeDCiFycwdu6l9pn5Oq/LpZ5LP194vKaTCCLpNbG1W', '(85) 99988-7766', '2023-06-18', null, 'ativa'),
(7, 'Rodrigo', 'Ferreira', 'rodrigo.ferreira@gmail.com', '$2b$10$6S29oSFkSFQXeDCiFycwdu6l9pn5Oq/LpZ5LP194vKaTCCLpNbG1W', '(61) 99812-3456', '2022-11-09', null, 'ativa'),
(8, 'Bianca', 'Costa', 'biancacosta@gmail.com', '$2b$10$6S29oSFkSFQXeDCiFycwdu6l9pn5Oq/LpZ5LP194vKaTCCLpNbG1W', '(47) 99876-5432', '2023-04-21', null, 'ativa'),
(9, 'Gustavo', 'Lima', 'gustavo.lima@gmail.com', '$2b$10$6S29oSFkSFQXeDCiFycwdu6l9pn5Oq/LpZ5LP194vKaTCCLpNbG1W', '(21) 91234-5678', '2023-05-10', null, 'ativa'),
(10, 'Fernanda', 'Pereira', 'fernanda.p@gmail.com', '$2b$10$6S29oSFkSFQXeDCiFycwdu6l9pn5Oq/LpZ5LP194vKaTCCLpNbG1W', '(31) 98765-4321', '2023-07-01', null, 'ativa'),
(11, 'Thiago', 'Barbosa', 'thiagobarbosa@gmail.com', '$2b$10$6S29oSFkSFQXeDCiFycwdu6l9pn5Oq/LpZ5LP194vKaTCCLpNbG1W', '(19) 99456-7890', '2023-08-15', null, 'ativa'),
(12, 'Juliana', 'Fernandes', 'juliana.fernandes@gmail.com', '$2b$10$6S29oSFkSFQXeDCiFycwdu6l9pn5Oq/LpZ5LP194vKaTCCLpNbG1W', '(11) 91123-4567', '2023-09-22', null, 'ativa'),
(13, 'Ricardo', 'Gomes', 'ricardo.gomes@gmail.com', '$2b$10$6S29oSFkSFQXeDCiFycwdu6l9pn5Oq/LpZ5LP194vKaTCCLpNbG1W', '(47) 99877-6655', '2022-12-12', null, 'ativa'),
(14, 'Camila', 'Araújo', 'camila.araujo@gmail.com', '$2b$10$6S29oSFkSFQXeDCiFycwdu6l9pn5Oq/LpZ5LP194vKaTCCLpNbG1W', '(85) 99678-5432', '2023-03-14', null, 'ativa'),
(15, 'Bruno', 'Carvalho', 'bruno.carvalho@gmail.com', '$2b$10$6S29oSFkSFQXeDCiFycwdu6l9pn5Oq/LpZ5LP194vKaTCCLpNbG1W', '(67) 99955-1212', '2023-06-30', null, 'ativa'),
(16, 'Larissa', 'Souza', 'larissa.souza@gmail.com', '$2b$10$6S29oSFkSFQXeDCiFycwdu6l9pn5Oq/LpZ5LP194vKaTCCLpNbG1W', '(13) 91234-9999', '2023-10-08', null, 'ativa');



insert into plano (cd_plano, nm_plano, dt_plano, vl_plano) 
value (2,'Maresia', '2025-05-31', 14.99),
(3,'Água de coco', '2025-05-31', 24.99),
(4,'Pé na Areia', '2025-05-31', 49.99);

insert into barraqueiro (cd_barraqueiro, nm_barraqueiro, nm_sobrenomeB, ds_emailB, cd_cpfB, ds_senhaB, nmr_telefoneB, dt_entrada, cd_plano, nm_imgPerfilB, cd_token, ds_contaAtiva ) 
values (2,'Maikel','Linares','maikinho@gmail.com',48935984628,'$2b$10$6S29oSFkSFQXeDCiFycwdu6l9pn5Oq/LpZ5LP194vKaTCCLpNbG1W',13988357898, '2021-07-05' ,1, null , null, 'ativa');

insert into carrinho (cd_carrinho, cd_barraqueiro, nm_carrinho, ds_localizacao, ds_carrinho, qt_conjunto, vl_reserva) values
(2,1,'Mar de Monstros', 'Perto do canal 6, na direção do quiosque beira mar', 'Carrinho completo, com comida de qualidade, e atendimento unico', 22 , 48),
(3,2,'Hercules', 'Perto do canal 2, na direção do quiosque beira mar', 'Carrinho completo, com comida de qualidade, e atendimento unico', 34 , 33);

insert into carrinho (cd_carrinho, cd_barraqueiro, nm_carrinho, ds_localizacao, ds_carrinho, qt_conjunto, vl_reserva) values
(4,2,'Barraca da Angelina', 'Perto do Aquario municipal de santos, quase no final da faixa de areia', 'Carrinho completo, com comida de qualidade, e atendimento unico', 32 , 32);

insert into carrinho (cd_carrinho, cd_barraqueiro, nm_carrinho, ds_localizacao, ds_carrinho, qt_conjunto, vl_reserva) values
(5,2,'Sergião do Coco', 'Perto do Emissário Submarino de Santos, na direção do primeiro chuveirinho apos ele', 'Carrinho completo, com comida de qualidade, e atendimento unico', 25 , 33.90),
(6,2,'Barraca do Ceará', 'Na biquinha, mesma direção do mastro de São Vicente', 'Carrinho completo, com comida de qualidade, e atendimento unico', 28 , 19);

insert into imgCarrinho values
(4, 2,"Carrinho(4).webp"),
(5, 2, "Carrinho(5).webp"),
(6, 2, "Carrinho(6).webp");

insert into imgCarrinho values
(7, 3,"Carrinho(7).webp"),
(8, 3, "Carrinho(8).webp"),
(9, 3, "Carrinho(9).webp"),
(10, 4,"Carrinho(10).webp"),
(11, 4, "Carrinho(11).webp"),
(12, 4, "Carrinho(12).webp");

insert into imgCarrinho values
(13, 5,"Carrinho(13).webp"),
(14, 5, "Carrinho(14).webp"),
(15, 5, "Carrinho(15).webp"),
(16, 6,"Carrinho(12).webp"),
(17, 6, "Carrinho(11).webp"),
(18, 6, "Carrinho(10).webp");


insert into reserva (cd_reserva, cd_carrinho, cd_cliente, dt_reserva, hr_reserva, vl_reserva, ds_reserva, ds_pagamento, hr_lembrete, nm_reservante) values 
(2,1,1, '2024-10-27', '12:00', 55.02, 'Finalizada', 'pago',Null, 'Andre'),
(3,1,2, '2024-10-27', '12:00', 55.02, 'Cancelada', 'pago',Null, 'Fabio'),
(4,1,1, '2024-10-27', '17:00', 55.02, 'Finalizada', 'pago',Null, 'Fernanda'),
(5,1,2, '2024-10-27', '12:00', 55.02, 'Finalizada', 'pago',Null, 'Andreia'),
(6,2,1, '2024-10-27', '14:00', 55.02, 'Finalizada', 'pago',Null, 'Fernanda'),
(7,2,2, '2024-10-28', '12:00', 55.02, 'Ativa', 'pago',Null, 'Andre'),
(8,2,1, '2024-09-25', '12:00', 55.02, 'Ativa', 'pago',Null, 'Cleide'),
(9,2,2, '2024-09-23', '12:00', 55.02, 'Ativa', 'pago',Null, 'Julia'),
(10,2,1, '2024-09-23', '12:00', 55.02, 'Ativa', 'pago',Null, 'Juliana'),
(11,2,1, '2024-09-25', '12:00', 55.02, 'Ativa', 'pago',Null, 'Fernanda'),
(12,2,2, '2024-09-14', '12:00', 55.02, 'Ativa', 'pago',Null, 'Andreia'),
(13,1,1, '2024-09-16', '12:00', 55.02, 'Ativa', 'pago',Null, 'Marcos'),
(14,1,2, '2024-09-05', '12:00', 55.02, 'Ativa', 'pago',Null, 'Andre'),
(15,1,1, '2024-09-09', '12:00', 55.02, 'Ativa', 'pago',Null, 'Felipão'),
(16,2,2, '2024-09-10', '12:00', 55.02, 'Ativa', 'pago',Null, 'Katiazinha'),
(17, 1, 1, '2024-09-01', '10:00', 55.02, 'Ativa', 'pago', Null, 'Dudu'),
(18, 1, 2, '2024-09-02', '11:30', 55.02, 'Ativa', 'pago', Null, 'Fafá'),
(19, 1, 1, '2024-09-03', '14:15', 55.02, 'Ativa', 'pago', Null, 'Nanda'),
(20, 1, 2, '2024-09-04', '09:45', 55.02, 'Ativa', 'pago', Null, 'Dri'),
(21, 2, 1, '2024-08-05', '13:00', 55.02, 'Ativa', 'pago', Null, 'Fê'),
(22, 2, 2, '2024-08-06', '15:30', 55.02, 'Ativa', 'pago', Null, 'Andréia'),
(23, 2, 1, '2024-05-07', '16:00', 55.02, 'Ativa', 'pago', Null, 'Cley'),
(24, 2, 2, '2024-06-08', '17:45', 55.02, 'Ativa', 'pago', Null, 'Juju'),
(25, 2, 1, '2024-04-09', '08:30', 55.02, 'Ativa', 'pago', Null, 'Júlia'),
(26, 2, 1, '2024-04-10', '19:00', 55.02, 'Ativa', 'pago', Null, 'Fê'),
(27, 2, 2, '2024-07-11', '10:15', 55.02, 'Ativa', 'pago', Null, 'Dri'),
(28, 1, 1, '2024-09-12', '12:00', 55.02, 'Ativa', 'pago', Null, 'Marcão'),
(29, 1, 2, '2024-09-13', '16:30', 55.02, 'Ativa', 'pago', Null, 'André'),
(30, 1, 1, '2024-09-14', '18:00', 55.02, 'Ativa', 'pago', Null, 'Felipe'),
(31, 2, 2, '2024-09-15', '15:00', 55.02, 'Ativa', 'pago', Null, 'Katita'),
(32, 1, 1, '2024-09-15', '10:00', 55.02, 'Ativa', 'pago', Null, 'Dudu'),
(33, 1, 2, '2024-09-15', '11:30', 55.02, 'Ativa', 'pago', Null, 'Fafá'),
(34, 1, 1, '2024-09-15', '14:15', 55.02, 'Ativa', 'pago', Null, 'Nanda'),
(35, 1, 2, '2024-09-15', '09:45', 55.02, 'Ativa', 'pago', Null, 'Dri'),
(36, 2, 1, '2024-09-15', '13:00', 55.02, 'Ativa', 'pago', Null, 'Fê'),
(37, 2, 2, '2024-09-15', '15:30', 55.02, 'Ativa', 'pago', Null, 'Andréia'),
(38, 2, 1, '2024-09-15', '16:00', 55.02, 'Ativa', 'pago', Null, 'Cley'),
(39, 2, 2, '2024-09-15', '17:45', 55.02, 'Ativa', 'pago', Null, 'Juju'),
(40, 2, 1, '2024-09-15', '08:30', 55.02, 'Ativa', 'pago', Null, 'Júlia'),
(41, 2, 1, '2024-09-15', '17:00', 55.02, 'Ativa', 'pago', Null, 'Fê'),
(42, 2, 2, '2024-09-15', '13:15', 55.02, 'Ativa', 'pago', Null, 'Dri'),
(43, 1, 1, '2024-09-15', '12:00', 55.02, 'Ativa', 'pago', Null, 'Marcão'),
(44, 1, 2, '2024-09-15', '15:30', 55.02, 'Ativa', 'pago', Null, 'André'),
(45, 1, 1, '2024-09-15', '18:00', 55.02, 'Ativa', 'pago', Null, 'Felipe'),
(46, 2, 2, '2024-09-15', '14:00', 55.02, 'Ativa', 'pago', Null, 'Katita');

insert into reserva (cd_reserva, cd_carrinho, cd_cliente, dt_reserva, hr_reserva, vl_reserva, ds_reserva, ds_pagamento, hr_lembrete, nm_reservante) values 
(47, 1, 1, '2024-07-15', '12:00', 55.02, 'Ativa', 'pago', Null, 'Andre'),
(48, 1, 2, '2024-07-15', '14:00', 55.02, 'Cancelada', 'pago', Null, 'Fabio'),
(49, 1, 1, '2024-08-20', '17:00', 55.02, 'Ativa', 'pago', Null, 'Fernanda'),
(50, 1, 2, '2024-08-20', '10:00', 55.02, 'Ativa', 'pago', Null, 'Andreia'),
(51, 1, 1, '2024-08-22', '14:00', 55.02, 'Ativa', 'pago', Null, 'Fernanda'),
(52, 1, 2, '2024-09-18', '12:00', 55.02, 'Ativa', 'pago', Null, 'Andre'),
(53, 1, 1, '2024-09-25', '12:00', 55.02, 'Ativa', 'pago', Null, 'Cleide'),
(54, 1, 2, '2024-09-23', '14:00', 55.02, 'Ativa', 'pago', Null, 'Julia'),
(55, 1, 1, '2024-09-23', '16:00', 55.02, 'Ativa', 'pago', Null, 'Juliana'),
(56, 1, 1, '2024-09-25', '12:00', 55.02, 'Ativa', 'pago', Null, 'Fernanda'),
(57, 1, 2, '2024-09-14', '12:00', 55.02, 'Ativa', 'pago', Null, 'Andreia'),
(58, 1, 1, '2024-09-16', '10:00', 55.02, 'Ativa', 'pago', Null, 'Marcos'),
(59, 1, 2, '2024-09-05', '14:00', 55.02, 'Ativa', 'pago', Null, 'Andre'),
(60, 1, 1, '2024-10-02', '16:00', 55.02, 'Ativa', 'pago', Null, 'Felipão'),
(61, 1, 2, '2024-10-05', '12:00', 55.02, 'Ativa', 'pago', Null, 'Katiazinha'),
(62, 1, 1, '2024-10-10', '10:00', 55.02, 'Ativa', 'pago', Null, 'Dudu'),
(63, 1, 2, '2024-10-12', '11:00', 55.02, 'Ativa', 'pago', Null, 'Fafá'),
(64, 1, 1, '2024-10-15', '14:00', 55.02, 'Ativa', 'pago', Null, 'Nanda'),
(65, 1, 2, '2024-10-18', '09:00', 55.02, 'Ativa', 'pago', Null, 'Dri'),
(66, 1, 1, '2024-07-07', '13:00', 55.02, 'Ativa', 'pago', Null, 'Fê'),
(67, 1, 2, '2024-07-08', '15:00', 55.02, 'Ativa', 'pago', Null, 'Andréia'),
(68, 1, 1, '2024-09-12', '16:00', 55.02, 'Ativa', 'pago', Null, 'Cley'),
(69, 1, 2, '2024-09-13', '17:00', 55.02, 'Ativa', 'pago', Null, 'Juju'),
(70, 1, 1, '2024-09-15', '08:00', 55.02, 'Ativa', 'pago', Null, 'Júlia'),
(71, 1, 1, '2024-08-28', '19:00', 55.02, 'Ativa', 'pago', Null, 'Fê'),
(72, 1, 2, '2024-07-11', '10:00', 55.02, 'Ativa', 'pago', Null, 'Dri'),
(73, 1, 1, '2024-09-14', '12:00', 55.02, 'Ativa', 'pago', Null, 'Marcão'),
(74, 1, 2, '2024-09-13', '16:00', 55.02, 'Ativa', 'pago', Null, 'André'),
(75, 1, 1, '2024-09-14', '18:00', 55.02, 'Ativa', 'pago', Null, 'Felipe'),
(76, 1, 2, '2024-09-16', '15:00', 55.02, 'Ativa', 'pago', Null, 'Katita'),
(77, 1, 1, '2024-09-15', '10:00', 55.02, 'Ativa', 'pago', Null, 'Dudu'),
(78, 1, 2, '2024-09-23', '11:00', 55.02, 'Ativa', 'pago', Null, 'Fafá'),
(79, 1, 1, '2024-10-12', '14:00', 55.02, 'Ativa', 'pago', Null, 'Nanda'),
(80, 1, 2, '2024-10-10', '09:00', 55.02, 'Ativa', 'pago', Null, 'Dri'),
(81, 1, 1, '2024-09-14', '13:00', 55.02, 'Ativa', 'pago', Null, 'Fê'),
(82, 1, 2, '2024-09-12', '15:00', 55.02, 'Ativa', 'pago', Null, 'Andréia'),
(83, 1, 1, '2024-09-16', '16:00', 55.02, 'Ativa', 'pago', Null, 'Cley'),
(84, 1, 2, '2024-09-25', '17:00', 55.02, 'Ativa', 'pago', Null, 'Juju'),
(85, 1, 1, '2024-10-15', '12:00', 55.02, 'Ativa', 'pago', Null, 'Júlia');

insert into reserva (cd_reserva, cd_carrinho, cd_cliente, dt_reserva, hr_reserva, vl_reserva, ds_reserva, ds_pagamento, hr_lembrete, nm_reservante) values 
(86, 1, 1, '2024-07-09', '12:00', 55.02, 'Ativa', 'pago', Null, 'Andre'),
(87, 1, 2, '2024-07-13', '14:00', 55.02, 'Cancelada', 'pago', Null, 'Fabio'),
(88, 1, 1, '2024-08-19', '17:00', 55.02, 'Ativa', 'pago', Null, 'Fernanda'),
(89, 1, 2, '2024-08-21', '10:00', 55.02, 'Ativa', 'pago', Null, 'Andreia'),
(90, 1, 1, '2024-08-23', '14:00', 55.02, 'Ativa', 'pago', Null, 'Fernanda'),
(91, 1, 2, '2024-09-10', '12:00', 55.02, 'Ativa', 'pago', Null, 'Andre'),
(92, 1, 1, '2024-09-20', '12:00', 55.02, 'Ativa', 'pago', Null, 'Cleide'),
(93, 1, 2, '2024-09-22', '14:00', 55.02, 'Ativa', 'pago', Null, 'Julia'),
(94, 1, 1, '2024-09-24', '16:00', 55.02, 'Ativa', 'pago', Null, 'Juliana'),
(95, 1, 1, '2024-09-26', '12:00', 55.02, 'Ativa', 'pago', Null, 'Fernanda'),
(96, 1, 2, '2024-09-18', '12:00', 55.02, 'Ativa', 'pago', Null, 'Andreia'),
(97, 1, 1, '2024-09-19', '10:00', 55.02, 'Ativa', 'pago', Null, 'Marcos'),
(98, 1, 2, '2024-09-03', '14:00', 55.02, 'Ativa', 'pago', Null, 'Andre'),
(99, 1, 1, '2024-10-01', '16:00', 55.02, 'Ativa', 'pago', Null, 'Felipão'),
(100, 1, 2, '2024-10-06', '12:00', 55.02, 'Ativa', 'pago', Null, 'Katiazinha'),
(101, 1, 1, '2024-10-09', '10:00', 55.02, 'Ativa', 'pago', Null, 'Dudu'),
(102, 1, 2, '2024-10-13', '11:00', 55.02, 'Ativa', 'pago', Null, 'Fafá'),
(103, 1, 1, '2024-10-16', '14:00', 55.02, 'Ativa', 'pago', Null, 'Nanda'),
(104, 1, 2, '2024-10-17', '09:00', 55.02, 'Ativa', 'pago', Null, 'Dri'),
(105, 1, 1, '2024-07-14', '13:00', 55.02, 'Ativa', 'pago', Null, 'Fê'),
(106, 1, 2, '2024-07-12', '15:00', 55.02, 'Ativa', 'pago', Null, 'Andréia'),
(107, 1, 1, '2024-09-09', '16:00', 55.02, 'Ativa', 'pago', Null, 'Cley'),
(108, 1, 2, '2024-09-11', '17:00', 55.02, 'Ativa', 'pago', Null, 'Juju'),
(109, 1, 1, '2024-09-13', '08:00', 55.02, 'Ativa', 'pago', Null, 'Júlia'),
(110, 1, 1, '2024-08-27', '19:00', 55.02, 'Ativa', 'pago', Null, 'Fê'),
(111, 1, 2, '2024-07-10', '10:00', 55.02, 'Ativa', 'pago', Null, 'Dri'),
(112, 1, 1, '2024-09-08', '12:00', 55.02, 'Ativa', 'pago', Null, 'Marcão'),
(113, 1, 2, '2024-09-12', '16:00', 55.02, 'Ativa', 'pago', Null, 'André'),
(114, 1, 1, '2024-09-15', '18:00', 55.02, 'Ativa', 'pago', Null, 'Felipe'),
(115, 1, 2, '2024-09-17', '15:00', 55.02, 'Ativa', 'pago', Null, 'Katita'),
(116, 1, 1, '2024-09-18', '10:00', 55.02, 'Ativa', 'pago', Null, 'Dudu'),
(117, 1, 2, '2024-09-20', '11:00', 55.02, 'Ativa', 'pago', Null, 'Fafá'),
(118, 1, 1, '2024-10-11', '14:00', 55.02, 'Ativa', 'pago', Null, 'Nanda'),
(119, 1, 2, '2024-10-08', '09:00', 55.02, 'Ativa', 'pago', Null, 'Dri'),
(120, 1, 1, '2024-09-13', '13:00', 55.02, 'Ativa', 'pago', Null, 'Fê'),
(121, 1, 2, '2024-09-14', '15:00', 55.02, 'Ativa', 'pago', Null, 'Andréia'),
(122, 1, 1, '2024-09-19', '16:00', 55.02, 'Ativa', 'pago', Null, 'Cley'),
(123, 1, 2, '2024-09-21', '17:00', 55.02, 'Ativa', 'pago', Null, 'Juju'),
(124, 1, 1, '2024-10-14', '12:00', 55.02, 'Ativa', 'pago', Null, 'Júlia');


--  mes 11

insert into reserva (cd_reserva, cd_carrinho, cd_cliente, dt_reserva, hr_reserva, vl_reserva, ds_reserva, ds_pagamento, hr_lembrete, nm_reservante) values 
(216, 1, 1, '2024-11-26', '07:00', 55.02, 'Ativa', 'pago', Null, 'Andre'),
(217, 1, 2, '2024-11-26', '07:00', 55.02, 'Ativa', 'pago', Null, 'Fabio'),
(218, 1, 1, '2024-11-26', '07:00', 55.02, 'Ativa', 'pago', Null, 'Fernanda'),
(219, 1, 2, '2024-11-26', '08:00', 55.02, 'Ativa', 'pago', Null, 'Andreia'),
(220, 1, 1, '2024-11-26', '08:00', 55.02, 'Ativa', 'pago', Null, 'Cleide'),
(221, 1, 2, '2024-11-26', '08:00', 55.02, 'Ativa', 'pago', Null, 'Julia'),
(222, 1, 1, '2024-11-27', '09:00', 55.02, 'Ativa', 'pago', Null, 'Juliana'),
(223, 1, 1, '2024-11-27', '09:00', 55.02, 'Ativa', 'pago', Null, 'Fernanda'),
(224, 1, 2, '2024-11-27', '10:00', 55.02, 'Ativa', 'pago', Null, 'Andre'),
(225, 1, 1, '2024-11-27', '10:00', 55.02, 'Ativa', 'pago', Null, 'Felipão'),
(226, 1, 2, '2024-11-27', '10:00', 55.02, 'Ativa', 'pago', Null, 'Katiazinha'),
(227, 1, 1, '2024-11-28', '11:00', 55.02, 'Ativa', 'pago', Null, 'Dudu'),
(228, 1, 2, '2024-11-28', '11:00', 55.02, 'Ativa', 'pago', Null, 'Fafá'),
(229, 1, 1, '2024-11-28', '11:00', 55.02, 'Ativa', 'pago', Null, 'Cley'),
(230, 1, 2, '2024-11-28', '12:00', 55.02, 'Ativa', 'pago', Null, 'Juju'),
(231, 1, 1, '2024-11-28', '12:00', 55.02, 'Ativa', 'pago', Null, 'Fê'),
(232, 1, 2, '2024-11-28', '12:00', 55.02, 'Ativa', 'pago', Null, 'Nanda'),
(233, 1, 1, '2024-11-29', '13:00', 55.02, 'Ativa', 'pago', Null, 'Dudu'),
(234, 1, 2, '2024-11-29', '13:00', 55.02, 'Ativa', 'pago', Null, 'Felipe'),
(235, 1, 1, '2024-11-29', '14:00', 55.02, 'Ativa', 'pago', Null, 'Júlia'),
(236, 1, 2, '2024-11-30', '14:00', 55.02, 'Ativa', 'pago', Null, 'Marcos');

insert into reserva (cd_reserva, cd_carrinho, cd_cliente, dt_reserva, hr_reserva, vl_reserva, ds_reserva, ds_pagamento, hr_lembrete, nm_reservante) values 
(237, 1, 1, '2024-11-24', '07:00', 55.02, 'Ativa', 'pago', Null, 'Andre'),
(238, 1, 2, '2024-11-24', '07:00', 55.02, 'Ativa', 'pago', Null, 'Fabio'),
(239, 1, 1, '2024-11-24', '07:00', 55.02, 'Ativa', 'pago', Null, 'Fernanda'),
(240, 1, 2, '2024-11-24', '08:00', 55.02, 'Ativa', 'pago', Null, 'Andreia'),
(241, 1, 1, '2024-11-25', '08:00', 55.02, 'Ativa', 'pago', Null, 'Cleide'),
(242, 1, 2, '2024-11-25', '08:00', 55.02, 'Ativa', 'pago', Null, 'Julia'),
(243, 1, 1, '2024-11-26', '09:00', 55.02, 'Ativa', 'pago', Null, 'Juliana'),
(244, 1, 1, '2024-11-26', '09:00', 55.02, 'Ativa', 'pago', Null, 'Fernanda'),
(245, 1, 2, '2024-11-26', '10:00', 55.02, 'Ativa', 'pago', Null, 'Andre'),
(246, 1, 1, '2024-11-27', '10:00', 55.02, 'Ativa', 'pago', Null, 'Felipão'),
(247, 1, 2, '2024-11-27', '10:00', 55.02, 'Ativa', 'pago', Null, 'Katiazinha'),
(248, 1, 1, '2024-11-27', '11:00', 55.02, 'Ativa', 'pago', Null, 'Dudu'),
(249, 1, 2, '2024-11-28', '11:00', 55.02, 'Ativa', 'pago', Null, 'Fafá'),
(250, 1, 1, '2024-11-28', '11:00', 55.02, 'Ativa', 'pago', Null, 'Cley'),
(251, 1, 2, '2024-11-29', '12:00', 55.02, 'Ativa', 'pago', Null, 'Juju'),
(252, 1, 1, '2024-11-29', '12:00', 55.02, 'Ativa', 'pago', Null, 'Fê'),
(253, 1, 2, '2024-11-29', '12:00', 55.02, 'Ativa', 'pago', Null, 'Nanda'),
(254, 1, 1, '2024-11-30', '13:00', 55.02, 'Ativa', 'pago', Null, 'Dudu'),
(255, 1, 2, '2024-11-30', '13:00', 55.02, 'Ativa', 'pago', Null, 'Felipe'),
(256, 1, 1, '2024-11-30', '14:00', 55.02, 'Ativa', 'pago', Null, 'Júlia'),
(257, 1, 2, '2024-11-30', '14:00', 55.02, 'Ativa', 'pago', Null, 'Marcos');

insert into reserva (cd_reserva, cd_carrinho, cd_cliente, dt_reserva, hr_reserva, vl_reserva, ds_reserva, ds_pagamento, hr_lembrete, nm_reservante) values 
(258, 1, 1, '2024-11-25', '07:00', 55.02, 'Ativa', 'pago', Null, 'Andre'),
(259, 1, 2, '2024-11-25', '07:00', 55.02, 'Ativa', 'pago', Null, 'Fabio'),
(260, 1, 1, '2024-11-25', '07:00', 55.02, 'Ativa', 'pago', Null, 'Fernanda'),
(261, 1, 2, '2024-11-25', '08:00', 55.02, 'Ativa', 'pago', Null, 'Andreia'),
(262, 1, 1, '2024-11-25', '08:00', 55.02, 'Ativa', 'pago', Null, 'Cleide'),
(263, 1, 2, '2024-11-25', '08:00', 55.02, 'Ativa', 'pago', Null, 'Julia'),
(264, 1, 1, '2024-11-26', '09:00', 55.02, 'Ativa', 'pago', Null, 'Juliana'),
(265, 1, 1, '2024-11-26', '09:00', 55.02, 'Ativa', 'pago', Null, 'Fernanda'),
(266, 1, 2, '2024-11-26', '10:00', 55.02, 'Ativa', 'pago', Null, 'Andre'),
(267, 1, 1, '2024-11-26', '10:00', 55.02, 'Ativa', 'pago', Null, 'Felipão'),
(268, 1, 2, '2024-11-26', '10:00', 55.02, 'Ativa', 'pago', Null, 'Katiazinha'),
(269, 1, 1, '2024-11-27', '11:00', 55.02, 'Ativa', 'pago', Null, 'Dudu'),
(270, 1, 2, '2024-11-27', '11:00', 55.02, 'Ativa', 'pago', Null, 'Fafá'),
(271, 1, 1, '2024-11-27', '11:00', 55.02, 'Ativa', 'pago', Null, 'Cley'),
(272, 1, 2, '2024-11-28', '12:00', 55.02, 'Ativa', 'pago', Null, 'Juju'),
(273, 1, 1, '2024-11-28', '12:00', 55.02, 'Ativa', 'pago', Null, 'Fê'),
(274, 1, 2, '2024-11-28', '12:00', 55.02, 'Ativa', 'pago', Null, 'Nanda'),
(275, 1, 1, '2024-11-29', '13:00', 55.02, 'Ativa', 'pago', Null, 'Dudu'),
(276, 1, 2, '2024-11-29', '13:00', 55.02, 'Ativa', 'pago', Null, 'Felipe'),
(277, 1, 1, '2024-11-29', '14:00', 55.02, 'Ativa', 'pago', Null, 'Júlia'),
(278, 1, 2, '2024-11-30', '14:00', 55.02, 'Ativa', 'pago', Null, 'Marcos'),
(279, 1, 1, '2024-11-30', '14:00', 55.02, 'Ativa', 'pago', Null, 'Andreia'),
(280, 1, 2, '2024-11-30', '14:30', 55.02, 'Ativa', 'pago', Null, 'Fernanda');

insert into reserva (cd_reserva, cd_carrinho, cd_cliente, dt_reserva, hr_reserva, vl_reserva, ds_reserva, ds_pagamento, hr_lembrete, nm_reservante) values 
(281, 1, 1, '2024-11-17', '07:00', 55.02, 'Ativa', 'pago', Null, 'Andre'),
(282, 1, 2, '2024-11-17', '07:30', 55.02, 'Ativa', 'pago', Null, 'Fabio'),
(283, 1, 1, '2024-11-17', '08:00', 55.02, 'Ativa', 'pago', Null, 'Fernanda'),
(284, 1, 2, '2024-11-18', '09:00', 55.02, 'Ativa', 'pago', Null, 'Andreia'),
(285, 1, 1, '2024-11-18', '09:30', 55.02, 'Ativa', 'pago', Null, 'Cleide'),
(286, 1, 2, '2024-11-18', '10:00', 55.02, 'Ativa', 'pago', Null, 'Julia'),
(287, 1, 1, '2024-11-19', '10:30', 55.02, 'Ativa', 'pago', Null, 'Juliana'),
(288, 1, 1, '2024-11-19', '11:00', 55.02, 'Ativa', 'pago', Null, 'Fernanda'),
(289, 1, 2, '2024-11-20', '11:30', 55.02, 'Ativa', 'pago', Null, 'Andre'),
(290, 1, 1, '2024-11-20', '12:00', 55.02, 'Ativa', 'pago', Null, 'Felipão'),
(291, 1, 2, '2024-11-20', '12:30', 55.02, 'Ativa', 'pago', Null, 'Katiazinha'),
(292, 1, 1, '2024-11-21', '13:00', 55.02, 'Ativa', 'pago', Null, 'Dudu'),
(293, 1, 2, '2024-11-21', '13:30', 55.02, 'Ativa', 'pago', Null, 'Fafá'),
(294, 1, 1, '2024-11-21', '14:00', 55.02, 'Ativa', 'pago', Null, 'Cley'),
(295, 1, 2, '2024-11-22', '14:30', 55.02, 'Ativa', 'pago', Null, 'Juju'),
(296, 1, 1, '2024-11-22', '15:00', 55.02, 'Ativa', 'pago', Null, 'Fê'),
(297, 1, 2, '2024-11-22', '15:30', 55.02, 'Ativa', 'pago', Null, 'Nanda'),
(298, 1, 1, '2024-11-23', '16:00', 55.02, 'Ativa', 'pago', Null, 'Dudu'),
(299, 1, 2, '2024-11-23', '16:30', 55.02, 'Ativa', 'pago', Null, 'Felipe'),
(300, 1, 1, '2024-11-23', '17:00', 55.02, 'Ativa', 'pago', Null, 'Júlia'),
(301, 1, 2, '2024-11-23', '17:30', 55.02, 'Ativa', 'pago', Null, 'Marcos');

insert into reserva (cd_reserva, cd_carrinho, cd_cliente, dt_reserva, hr_reserva, vl_reserva, ds_reserva, ds_pagamento, hr_lembrete, nm_reservante) values 
(302, 1, 1, '2024-11-01', '07:00', 55.02, 'Ativa', 'pago', Null, 'Andre'),
(303, 1, 2, '2024-11-01', '07:30', 55.02, 'Ativa', 'pago', Null, 'Fabio'),
(304, 1, 1, '2024-11-01', '08:00', 55.02, 'Ativa', 'pago', Null, 'Fernanda'),
(305, 1, 2, '2024-11-02', '08:30', 55.02, 'Ativa', 'pago', Null, 'Andreia'),
(306, 1, 1, '2024-11-02', '09:00', 55.02, 'Ativa', 'pago', Null, 'Cleide'),
(307, 1, 2, '2024-11-02', '09:30', 55.02, 'Ativa', 'pago', Null, 'Julia'),
(308, 1, 1, '2024-11-03', '10:00', 55.02, 'Ativa', 'pago', Null, 'Juliana'),
(309, 1, 2, '2024-11-03', '10:30', 55.02, 'Ativa', 'pago', Null, 'Fernanda'),
(310, 1, 1, '2024-11-04', '11:00', 55.02, 'Ativa', 'pago', Null, 'Andre'),
(311, 1, 2, '2024-11-04', '11:30', 55.02, 'Ativa', 'pago', Null, 'Felipão'),
(312, 1, 1, '2024-11-05', '12:00', 55.02, 'Ativa', 'pago', Null, 'Katiazinha'),
(313, 1, 2, '2024-11-05', '12:30', 55.02, 'Ativa', 'pago', Null, 'Dudu'),
(314, 1, 1, '2024-11-06', '13:00', 55.02, 'Ativa', 'pago', Null, 'Fafá'),
(315, 1, 2, '2024-11-06', '13:30', 55.02, 'Ativa', 'pago', Null, 'Cley'),
(316, 1, 1, '2024-11-07', '14:00', 55.02, 'Ativa', 'pago', Null, 'Juju'),
(317, 1, 2, '2024-11-07', '14:30', 55.02, 'Ativa', 'pago', Null, 'Fê'),
(318, 1, 1, '2024-11-08', '15:00', 55.02, 'Ativa', 'pago', Null, 'Nanda'),
(319, 1, 2, '2024-11-08', '15:30', 55.02, 'Ativa', 'pago', Null, 'Dudu'),
(320, 1, 1, '2024-11-09', '16:00', 55.02, 'Ativa', 'pago', Null, 'Felipe'),
(321, 1, 2, '2024-11-09', '16:30', 55.02, 'Ativa', 'pago', Null, 'Júlia'),
(322, 1, 1, '2024-11-10', '17:00', 55.02, 'Ativa', 'pago', Null, 'Marcos'),
(323, 1, 2, '2024-11-10', '17:30', 55.02, 'Ativa', 'pago', Null, 'Andreia'),
(324, 1, 1, '2024-11-11', '07:00', 55.02, 'Ativa', 'pago', Null, 'Fernanda'),
(325, 1, 2, '2024-11-11', '07:30', 55.02, 'Ativa', 'pago', Null, 'Fabio'),
(326, 1, 1, '2024-11-12', '08:00', 55.02, 'Ativa', 'pago', Null, 'Cleide'),
(327, 1, 2, '2024-11-12', '08:30', 55.02, 'Ativa', 'pago', Null, 'Julia'),
(328, 1, 1, '2024-11-13', '09:00', 55.02, 'Ativa', 'pago', Null, 'Juliana'),
(329, 1, 2, '2024-11-13', '09:30', 55.02, 'Ativa', 'pago', Null, 'Andreia'),
(330, 1, 1, '2024-11-13', '10:00', 55.02, 'Ativa', 'pago', Null, 'Fernanda');

insert into reserva (cd_reserva, cd_carrinho, cd_cliente, dt_reserva, hr_reserva, vl_reserva, ds_reserva, ds_pagamento, hr_lembrete, nm_reservante) values 
(331, 1, 1, '2024-11-03', '07:00', 55.02, 'Ativa', 'pago', Null, 'Andre'),
(332, 1, 2, '2024-11-03', '07:30', 55.02, 'Ativa', 'pago', Null, 'Fabio'),
(333, 1, 1, '2024-11-03', '08:00', 55.02, 'Ativa', 'pago', Null, 'Fernanda'),
(334, 1, 2, '2024-11-04', '08:30', 55.02, 'Ativa', 'pago', Null, 'Andreia'),
(335, 1, 1, '2024-11-04', '09:00', 55.02, 'Ativa', 'pago', Null, 'Cleide'),
(336, 1, 2, '2024-11-04', '09:30', 55.02, 'Ativa', 'pago', Null, 'Julia'),
(337, 1, 1, '2024-11-05', '10:00', 55.02, 'Ativa', 'pago', Null, 'Juliana'),
(338, 1, 2, '2024-11-05', '10:30', 55.02, 'Ativa', 'pago', Null, 'Fernanda'),
(339, 1, 1, '2024-11-06', '11:00', 55.02, 'Ativa', 'pago', Null, 'Andre'),
(340, 1, 2, '2024-11-06', '11:30', 55.02, 'Ativa', 'pago', Null, 'Felipão'),
(341, 1, 1, '2024-11-07', '12:00', 55.02, 'Ativa', 'pago', Null, 'Katiazinha'),
(342, 1, 2, '2024-11-07', '12:30', 55.02, 'Ativa', 'pago', Null, 'Dudu'),
(343, 1, 1, '2024-11-08', '13:00', 55.02, 'Ativa', 'pago', Null, 'Fafá'),
(344, 1, 2, '2024-11-08', '13:30', 55.02, 'Ativa', 'pago', Null, 'Cley'),
(345, 1, 1, '2024-11-09', '14:00', 55.02, 'Ativa', 'pago', Null, 'Juju'),
(346, 1, 2, '2024-11-09', '14:30', 55.02, 'Ativa', 'pago', Null, 'Fê'),
(347, 1, 1, '2024-11-09', '15:00', 55.02, 'Ativa', 'pago', Null, 'Nanda'),
(348, 1, 2, '2024-11-09', '15:30', 55.02, 'Ativa', 'pago', Null, 'Dudu'),
(349, 1, 1, '2024-11-09', '16:00', 55.02, 'Ativa', 'pago', Null, 'Felipe'),
(350, 1, 2, '2024-11-09', '16:30', 55.02, 'Ativa', 'pago', Null, 'Júlia');

/*insert into reserva (cd_reserva, cd_carrinho, cd_cliente, dt_reserva, hr_reserva, vl_reserva, ds_reserva, ds_pagamento, hr_lembrete, nm_reservante) values 
(351, 1, 1, '2024-11-26', '07:15', 55.02, 'Ativa', 'pago', Null, 'Andre'),
(352, 1, 2, '2024-11-26', '07:45', 55.02, 'Ativa', 'pago', Null, 'Fabio'),
(353, 1, 1, '2024-11-26', '08:30', 55.02, 'Ativa', 'pago', Null, 'Fernanda'),
(354, 1, 2, '2024-11-26', '09:00', 55.02, 'Ativa', 'pago', Null, 'Andreia'),
(355, 1, 1, '2024-11-26', '09:45', 55.02, 'Ativa', 'pago', Null, 'Cleide'),
(356, 1, 2, '2024-11-26', '10:15', 55.02, 'Ativa', 'pago', Null, 'Julia'),
(357, 1, 1, '2024-11-26', '10:45', 55.02, 'Ativa', 'pago', Null, 'Juliana'),
(358, 1, 2, '2024-11-26', '11:30', 55.02, 'Ativa', 'pago', Null, 'Fernanda'),
(359, 1, 1, '2024-11-26', '12:00', 55.02, 'Ativa', 'pago', Null, 'Andre'),
(360, 1, 2, '2024-11-26', '12:30', 55.02, 'Ativa', 'pago', Null, 'Felipão'),
(361, 1, 1, '2024-11-26', '13:15', 55.02, 'Ativa', 'pago', Null, 'Katiazinha'),
(362, 1, 2, '2024-11-26', '13:45', 55.02, 'Ativa', 'pago', Null, 'Dudu'),
(363, 1, 1, '2024-11-26', '14:15', 55.02, 'Ativa', 'pago', Null, 'Fafá'),
(364, 1, 2, '2024-11-26', '14:45', 55.02, 'Ativa', 'pago', Null, 'Cley'),
(365, 1, 1, '2024-11-26', '15:30', 55.02, 'Ativa', 'pago', Null, 'Juju'),
(366, 1, 2, '2024-11-26', '16:00', 55.02, 'Ativa', 'pago', Null, 'Fê'),
(367, 1, 1, '2024-11-26', '16:30', 55.02, 'Ativa', 'pago', Null, 'Nanda'),
(368, 1, 2, '2024-11-26', '17:00', 55.02, 'Ativa', 'pago', Null, 'Dudu'),
(369, 1, 1, '2024-11-26', '17:30', 55.02, 'Ativa', 'pago', Null, 'Felipe'),
(370, 1, 2, '2024-11-26', '18:00', 55.02, 'Ativa', 'pago', Null, 'Júlia');*/

-- fim do mes 11

insert into pedido (cd_pedido, cd_carrinho, cd_cliente, vl_total_pedido, ds_guarda_sol, ds_observacao, dt_pedido, ds_tipo_pagamento, ds_status) 
values
(2, 1, 1, 25.50, 'K8', 'Sem pimenta, por favor.', '2024-10-01 12:00', 'Pix', 'entregue'),
(3, 1, 1, 180.75, null, 'sem oregano', '2024-10-01 13:30', 'Pix', 'entregue'),
(4, 1, 1, 650.00, 'G7', null, '2024-09-30 15:15', 'Pix', 'entregue'),
(5, 1, 1, 85.00, 'G9', 'Sem cebola.', '2024-11-26 12:00', 'Pix', 'pago'),
(6, 1, 2, 40.00, null, null, '2024-11-26 09:30', 'Pix', 'cancelado'),
(7, 2, 2, 22.00, 'P7', 'Com extra de queijo.', '2024-10-01 11:00:00', 'Pix', 'pago'),
(8, 2, 2, 19.99, null, 'Por favor, evite a pimenta.', '2024-08-03 12:30', 'Pix', 'pago'),
(9, 2, 2, 32.50, 'T9', null, '2024-08-03 13:45', 'Pix', 'pago'),
(10, 2, 3, 29.90, 'G2', null, '2024-08-03 15:00', 'Pix', 'pago'),
(11, 2, 3, 27.50, null, 'Sem refrigerante.', '2024-08-03 16:15', 'Pix', 'pago'),
(12, 1, 3, 35.00, 'W7', 'Por favor, adicione batatas.', '2024-11-26 17:30', 'Pix', 'pago'),
(13, 1, 3, 45.00, null, null, '2024-11-26 18:00', 'Pix', 'pago'),
(14, 1, 1, 20.00, 'OP', 'Com molho barbecue.', '2024-11-26 19:00', 'Pix', 'pago'),
(15, 1, 1, 22.00, null, null, '2024-11-26 20:00', 'Pix', 'pago'),
(16, 2, 2, 20.50, 'I5', 'Com extra de azeitonas.', '2024-08-03 21:00', 'Pix', 'pago'),
(17, 2, 2, 21.00, null, 'Sem mostarda.', '2024-08-03 22:00', 'Pix', 'pago'),
(18, 2, 3, 18.00, 'E6', null, '2024-08-04 10:00', 'Pix', 'pago'),
(19, 2, 2, 20.00, null, null, '2024-08-04 11:30', 'Pix', 'pago'),
(20, 2, 3, 30.00, 'G2', null, '2024-08-04 12:00', 'Pix', 'pago');

insert into pedido (cd_pedido, cd_carrinho, cd_cliente, vl_total_pedido, ds_guarda_sol, ds_observacao, dt_pedido, ds_tipo_pagamento, ds_status) 
values
(21, 1, 1, 25.50, 'K8', 'Sem pimenta, por favor.', '2024-07-01 12:00', 'Pix', 'entregue'),
(22, 1, 1, 25.50, 'K8', 'Sem pimenta, por favor.', '2024-07-01 12:00', 'Pix', 'entregue'),
(23, 1, 1, 180.75, null, 'sem oregano', '2024-07-02 13:30', 'Pix', 'entregue'),
(24, 1, 1, 180.75, null, 'sem oregano', '2024-07-02 13:30', 'Pix', 'entregue'),
(25, 1, 1, 180.75, null, 'sem oregano', '2024-07-02 13:30', 'Pix', 'entregue'),
(26, 1, 1, 650.00, 'G7', null, '2024-07-03 15:15', 'Pix', 'entregue'),
(27, 1, 1, 650.00, 'G7', null, '2024-07-03 15:15', 'Pix', 'entregue'),
(28, 1, 1, 650.00, 'G7', null, '2024-07-03 15:15', 'Pix', 'entregue'),
(29, 1, 1, 85.00, 'G9', 'Sem cebola.', '2024-07-04 12:00', 'Pix', 'entregue'),
(30, 1, 1, 85.00, 'G9', 'Sem cebola.', '2024-07-04 12:00', 'Pix', 'entregue'),
(31, 1, 2, 40.00, null, null, '2024-07-05 09:30', 'Pix', 'cancelado'),
(32, 1, 2, 40.00, null, null, '2024-07-05 09:30', 'Pix', 'cancelado'),
(33, 1, 2, 22.00, 'P7', 'Com extra de queijo.', '2024-07-06 11:00:00', 'Pix', 'entregue'),
(34, 1, 2, 22.00, 'P7', 'Com extra de queijo.', '2024-07-06 11:00:00', 'Pix', 'entregue'),
(35, 1, 2, 19.99, null, 'Por favor, evite a pimenta.', '2024-07-07 12:30', 'Pix', 'entregue'),
(36, 1, 2, 19.99, null, 'Por favor, evite a pimenta.', '2024-07-07 12:30', 'Pix', 'entregue'),
(37, 1, 2, 32.50, 'T9', null, '2024-07-08 13:45', 'Pix', 'entregue'),
(38, 1, 2, 32.50, 'T9', null, '2024-07-08 13:45', 'Pix', 'entregue'),
(39, 1, 3, 29.90, 'G2', null, '2024-07-09 15:00', 'Pix', 'entregue'),
(40, 1, 3, 29.90, 'G2', null, '2024-07-09 15:00', 'Pix', 'entregue'),
(41, 1, 3, 27.50, null, 'Sem refrigerante.', '2024-07-10 16:15', 'Pix', 'entregue'),
(42, 1, 3, 27.50, null, 'Sem refrigerante.', '2024-07-10 16:15', 'Pix', 'entregue'),
(43, 1, 3, 35.00, 'W7', 'Por favor, adicione batatas.', '2024-07-11 17:30', 'Pix', 'entregue'),
(44, 1, 3, 35.00, 'W7', 'Por favor, adicione batatas.', '2024-07-11 17:30', 'Pix', 'entregue'),
(45, 1, 3, 35.00, 'W7', 'Por favor, adicione batatas.', '2024-07-11 17:30', 'Pix', 'entregue'),
(46, 1, 3, 45.00, null, null, '2024-07-12 18:00', 'Pix', 'entregue'),
(47, 1, 3, 45.00, null, null, '2024-07-12 18:00', 'Pix', 'entregue'),
(48, 1, 3, 45.00, null, null, '2024-07-12 18:00', 'Pix', 'entregue'),
(49, 1, 3, 45.00, null, null, '2024-07-12 18:00', 'Pix', 'entregue'),
(50, 1, 1, 20.00, 'OP', 'Com molho barbecue.', '2024-07-13 19:00', 'Pix', 'entregue'),
(51, 1, 1, 20.00, 'OP', 'Com molho barbecue.', '2024-07-13 19:00', 'Pix', 'entregue'),
(52, 1, 1, 22.00, null, null, '2024-07-14 20:00', 'Pix', 'entregue'),
(53, 1, 1, 22.00, null, null, '2024-07-14 20:00', 'Pix', 'entregue'),
(54, 1, 2, 20.50, 'I5', 'Com extra de azeitonas.', '2024-08-01 21:00', 'Pix', 'entregue'),
(55, 1, 2, 20.50, 'I5', 'Com extra de azeitonas.', '2024-08-01 21:00', 'Pix', 'entregue'),
(56, 1, 2, 21.00, null, 'Sem mostarda.', '2024-08-02 22:00', 'Pix', 'entregue'),
(57, 1, 2, 21.00, null, 'Sem mostarda.', '2024-08-02 22:00', 'Pix', 'entregue'),
(58, 1, 2, 21.00, null, 'Sem mostarda.', '2024-08-02 22:00', 'Pix', 'entregue'),
(59, 1, 3, 18.00, 'E6', null, '2024-08-03 10:00', 'Pix', 'entregue'),
(60, 1, 3, 18.00, 'E6', null, '2024-08-03 10:00', 'Pix', 'entregue'),
(61, 1, 3, 18.00, 'E6', null, '2024-08-03 10:00', 'Pix', 'entregue'),
(62, 1, 3, 18.00, 'E6', null, '2024-08-03 10:00', 'Pix', 'entregue'),
(63, 1, 2, 20.00, null, null, '2024-08-04 11:30', 'Pix', 'entregue'),
(64, 1, 2, 20.00, null, null, '2024-08-04 11:30', 'Pix', 'entregue'),
(65, 1, 3, 30.00, 'G2', null, '2024-08-05 12:00', 'Pix', 'entregue'),
(66, 1, 3, 30.00, 'G2', null, '2024-08-05 12:00', 'Pix', 'entregue'),
(67, 1, 1, 50.00, 'F4', 'Sem alho.', '2024-08-06 13:00', 'Pix', 'entregue'),
(68, 1, 1, 50.00, 'F4', 'Sem alho.', '2024-08-06 13:00', 'Pix', 'entregue'),
(69, 1, 1, 75.50, null, 'Apenas com frango.', '2024-08-07 14:30', 'Pix', 'entregue'),
(70, 1, 1, 75.50, null, 'Apenas com frango.', '2024-08-07 14:30', 'Pix', 'entregue'),
(71, 1, 1, 55.00, 'B1', 'Por favor, sem maionese.', '2024-09-01 10:00', 'Pix', 'entregue'),
(72, 1, 2, 35.00, 'A2', null, '2024-09-02 11:15', 'Pix', 'entregue'),
(73, 1, 2, 40.00, null, null, '2024-09-03 12:30', 'Pix', 'entregue'),
(74, 1, 3, 60.00, 'C3', 'Com molho picante.', '2024-09-04 13:45', 'Pix', 'entregue'),
(75, 1, 3, 25.00, null, 'Sem pimenta.', '2024-09-05 14:30', 'Pix', 'entregue'),
(76, 1, 1, 90.00, 'D4', 'Com batata frita.', '2024-09-06 15:00', 'Pix', 'entregue'),
(77, 1, 2, 20.00, 'E5', null, '2024-09-07 16:00', 'Pix', 'entregue'),
(78, 1, 3, 22.00, null, 'Com extra de queijo.', '2024-09-08 17:00', 'Pix', 'entregue'),
(79, 1, 1, 18.00, null, null, '2024-09-09 18:00', 'Pix', 'entregue'),
(80, 1, 2, 55.00, 'F6', 'Sem cebola.', '2024-09-10 19:00', 'Pix', 'entregue'),
(81, 1, 3, 30.00, 'G7', 'Com extra de batata.', '2024-09-11 20:00', 'Pix', 'entregue'),
(82, 1, 1, 45.00, null, null, '2024-09-12 21:00', 'Pix', 'entregue'),
(83, 1, 2, 70.00, 'H8', null, '2024-09-13 22:00', 'Pix', 'entregue'),
(84, 1, 3, 100.00, null, 'Com molho de ervas.', '2024-09-14 23:00', 'Pix', 'entregue'),
(85, 1, 1, 50.00, 'J9', 'Sem pimenta.', '2024-10-01 08:00', 'Pix', 'entregue'),
(86, 1, 2, 80.00, 'K1', 'Com molho barbecue.', '2024-10-02 09:00', 'Pix', 'entregue'),
(87, 1, 3, 55.00, null, 'Por favor, adicione mais batatas.', '2024-10-03 10:00', 'Pix', 'entregue'),
(88, 1, 1, 22.50, null, 'Com cebola e maionese.', '2024-10-04 11:00', 'Pix', 'entregue'),
(89, 1, 2, 90.00, 'L1', null, '2024-10-05 12:00', 'Pix', 'entregue'),
(90, 1, 3, 75.00, 'M2', 'Sem queijo.', '2024-10-06 13:00', 'Pix', 'entregue'),
(91, 1, 1, 40.00, 'N3', 'Com extra de azeitona.', '2024-10-07 14:00', 'Pix', 'entregue'),
(92, 1, 2, 25.00, null, null, '2024-10-08 15:00', 'Pix', 'entregue'),
(93, 1, 3, 30.00, 'O4', 'Com extra de ketchup.', '2024-10-09 16:00', 'Pix', 'entregue'),
(94, 1, 1, 50.00, 'P5', 'Sem cebola e sem maionese.', '2024-10-10 17:00', 'Pix', 'entregue'),
(95, 1, 2, 85.00, null, 'Com molho picante.', '2024-10-11 18:00', 'Pix', 'entregue'),
(96, 1, 3, 95.00, 'Q6', null, '2024-10-12 19:00', 'Pix', 'entregue'),
(97, 1, 1, 60.00, null, 'Com muito queijo.', '2024-10-13 20:00', 'Pix', 'entregue'),
(98, 1, 2, 40.00, 'R7', null, '2024-10-14 21:00', 'Pix', 'entregue'),
(99, 1, 3, 30.00, 'S8', null, '2024-10-15 22:00', 'Pix', 'entregue'),
(100, 1, 1, 20.00, null, 'Com muito molho.', '2024-10-16 23:00', 'Pix', 'entregue');

insert into pedido (cd_pedido, cd_carrinho, cd_cliente, vl_total_pedido, ds_guarda_sol, ds_observacao, dt_pedido, ds_tipo_pagamento, ds_status) 
values
(101, 1, 1, 25.50, 'K8', 'Sem pimenta, por favor.', '2024-10-01 12:00', 'Pix', 'entregue'),
(102, 1, 1, 25.50, 'K8', 'Sem pimenta, por favor.', '2024-10-01 12:00', 'Pix', 'entregue'),
(103, 1, 1, 180.75, null, 'sem oregano', '2024-10-02 13:30', 'Pix', 'entregue'),
(104, 1, 1, 180.75, null, 'sem oregano', '2024-10-02 13:30', 'Pix', 'entregue'),
(105, 1, 1, 180.75, null, 'sem oregano', '2024-10-02 13:30', 'Pix', 'entregue'),
(106, 1, 1, 650.00, 'G7', null, '2024-10-03 15:15', 'Pix', 'entregue'),
(107, 1, 1, 650.00, 'G7', null, '2024-10-03 15:15', 'Pix', 'entregue'),
(108, 1, 1, 650.00, 'G7', null, '2024-10-03 15:15', 'Pix', 'entregue'),
(109, 1, 1, 85.00, 'G9', 'Sem cebola.', '2024-10-04 12:00', 'Pix', 'entregue'),
(110, 1, 1, 85.00, 'G9', 'Sem cebola.', '2024-10-04 12:00', 'Pix', 'entregue'),
(111, 1, 2, 40.00, null, null, '2024-10-05 09:30', 'Pix', 'entregue'),
(112, 1, 2, 40.00, null, null, '2024-10-05 09:30', 'Pix', 'entregue'),
(113, 1, 2, 22.00, 'P7', 'Com extra de queijo.', '2024-10-06 11:00:00', 'Pix', 'entregue'),
(114, 1, 2, 22.00, 'P7', 'Com extra de queijo.', '2024-10-06 11:00:00', 'Pix', 'entregue'),
(115, 1, 2, 19.99, null, 'Por favor, evite a pimenta.', '2024-10-07 12:30', 'Pix', 'entregue'),
(116, 1, 2, 19.99, null, 'Por favor, evite a pimenta.', '2024-10-07 12:30', 'Pix', 'entregue'),
(117, 1, 2, 32.50, 'T9', null, '2024-10-08 13:45', 'Pix', 'entregue'),
(118, 1, 2, 32.50, 'T9', null, '2024-10-08 13:45', 'Pix', 'entregue'),
(119, 1, 3, 29.90, 'G2', null, '2024-10-09 15:00', 'Pix', 'entregue'),
(120, 1, 3, 29.90, 'G2', null, '2024-10-09 15:00', 'Pix', 'entregue'),
(121, 1, 3, 27.50, null, 'Sem refrigerante.', '2024-10-10 16:15', 'Pix', 'entregue'),
(122, 1, 3, 27.50, null, 'Sem refrigerante.', '2024-10-10 16:15', 'Pix', 'entregue'),
(123, 1, 3, 35.00, 'W7', 'Por favor, adicione batatas.', '2024-10-11 17:30', 'Pix', 'entregue'),
(124, 1, 3, 35.00, 'W7', 'Por favor, adicione batatas.', '2024-10-11 17:30', 'Pix', 'entregue'),
(125, 1, 3, 35.00, 'W7', 'Por favor, adicione batatas.', '2024-10-11 17:30', 'Pix', 'entregue'),
(126, 1, 3, 45.00, null, null, '2024-10-12 18:00', 'Pix', 'entregue'),
(127, 1, 3, 45.00, null, null, '2024-10-12 18:00', 'Pix', 'entregue'),
(128, 1, 3, 45.00, null, null, '2024-10-12 18:00', 'Pix', 'entregue'),
(129, 1, 3, 45.00, null, null, '2024-10-12 18:00', 'Pix', 'entregue'),
(130, 1, 1, 20.00, 'OP', 'Com molho barbecue.', '2024-10-13 19:00', 'Pix', 'entregue'),
(131, 1, 1, 20.00, 'OP', 'Com molho barbecue.', '2024-10-13 19:00', 'Pix', 'entregue'),
(132, 1, 1, 22.00, null, null, '2024-10-14 20:00', 'Pix', 'entregue'),
(133, 1, 1, 22.00, null, null, '2024-10-14 20:00', 'Pix', 'entregue'),
(134, 1, 2, 20.50, 'I5', 'Com extra de azeitonas.', '2024-10-15 21:00', 'Pix', 'entregue'),
(135, 1, 2, 20.50, 'I5', 'Com extra de azeitonas.', '2024-10-15 21:00', 'Pix', 'entregue'),
(136, 1, 2, 21.00, null, 'Sem mostarda.', '2024-10-16 22:00', 'Pix', 'entregue'),
(137, 1, 2, 21.00, null, 'Sem mostarda.', '2024-10-16 22:00', 'Pix', 'entregue'),
(138, 1, 2, 21.00, null, 'Sem mostarda.', '2024-10-16 22:00', 'Pix', 'entregue'),
(139, 1, 3, 18.00, 'E6', null, '2024-10-17 10:00', 'Pix', 'entregue'),
(140, 1, 3, 18.00, 'E6', null, '2024-10-17 10:00', 'Pix', 'entregue'),
(141, 1, 3, 18.00, 'E6', null, '2024-10-17 10:00', 'Pix', 'entregue'),
(142, 1, 3, 18.00, 'E6', null, '2024-10-17 10:00', 'Pix', 'entregue'),
(143, 1, 2, 20.00, null, null, '2024-10-18 11:30', 'Pix', 'entregue'),
(144, 1, 2, 20.00, null, null, '2024-10-18 11:30', 'Pix', 'entregue'),
(145, 1, 3, 30.00, 'G2', null, '2024-10-19 12:00', 'Pix', 'entregue'),
(146, 1, 3, 30.00, 'G2', null, '2024-10-19 12:00', 'Pix', 'entregue'),
(147, 1, 1, 50.00, 'F4', 'Sem alho.', '2024-10-20 13:00', 'Pix', 'entregue'),
(148, 1, 1, 50.00, 'F4', 'Sem alho.', '2024-10-20 13:00', 'Pix', 'entregue'),
(149, 1, 1, 75.50, null, 'Apenas queijo e tomate.', '2024-10-21 14:00', 'Pix', 'entregue'),
(150, 1, 1, 75.50, null, 'Apenas queijo e tomate.', '2024-10-21 14:00', 'Pix', 'entregue'),
(151, 1, 2, 32.00, null, null, '2024-10-22 15:30', 'Pix', 'entregue'),
(152, 1, 2, 32.00, null, null, '2024-10-22 15:30', 'Pix', 'entregue'),
(153, 1, 2, 38.50, null, null, '2024-10-23 16:45', 'Pix', 'entregue'),
(154, 1, 2, 38.50, null, null, '2024-10-23 16:45', 'Pix', 'entregue'),
(155, 1, 3, 25.00, 'J8', 'Sem sal.', '2024-10-24 18:00', 'Pix', 'entregue'),
(156, 1, 3, 25.00, 'J8', 'Sem sal.', '2024-10-24 18:00', 'Pix', 'entregue'),
(157, 1, 1, 50.00, null, null, '2024-10-25 19:15', 'Pix', 'entregue'),
(158, 1, 1, 50.00, null, null, '2024-10-25 19:15', 'Pix', 'entregue'),
(159, 1, 1, 20.00, 'H9', 'Sem cebola e sem pimenta.', '2024-10-26 20:30', 'Pix', 'entregue'),
(160, 1, 1, 20.00, 'H9', 'Sem cebola e sem pimenta.', '2024-10-26 20:30', 'Pix', 'entregue'),
(161, 1, 2, 45.00, null, 'Com extra de molho.', '2024-10-27 21:45', 'Pix', 'entregue'),
(162, 1, 2, 45.00, null, 'Com extra de molho.', '2024-10-27 21:45', 'Pix', 'entregue'),
(163, 1, 3, 30.00, 'E2', null, '2024-10-28 10:00', 'Pix', 'entregue'),
(164, 1, 3, 30.00, 'E2', null, '2024-10-28 10:00', 'Pix', 'entregue');

insert into pedido (cd_pedido, cd_carrinho, cd_cliente, vl_total_pedido, ds_guarda_sol, ds_observacao, dt_pedido, ds_tipo_pagamento, ds_status) 
values
(165, 1, 1, 25.50, 'K8', 'Sem pimenta, por favor.', '2024-10-21 12:00', 'Pix', 'entregue'),
(166, 1, 1, 25.50, 'K8', 'Sem pimenta, por favor.', '2024-10-21 12:00', 'Pix', 'entregue'),
(167, 1, 1, 180.75, null, 'sem oregano', '2024-10-22 13:30', 'Pix', 'entregue'),
(168, 1, 1, 180.75, null, 'sem oregano', '2024-10-22 13:30', 'Pix', 'entregue'),
(169, 1, 1, 180.75, null, 'sem oregano', '2024-10-22 13:30', 'Pix', 'entregue'),
(170, 1, 1, 650.00, 'G7', null, '2024-10-23 15:15', 'Pix', 'entregue'),
(171, 1, 1, 650.00, 'G7', null, '2024-10-23 15:15', 'Pix', 'entregue'),
(172, 1, 1, 650.00, 'G7', null, '2024-10-23 15:15', 'Pix', 'entregue'),
(173, 1, 1, 85.00, 'G9', 'Sem cebola.', '2024-10-24 12:00', 'Pix', 'entregue'),
(174, 1, 1, 85.00, 'G9', 'Sem cebola.', '2024-10-24 12:00', 'Pix', 'entregue'),
(175, 1, 2, 40.00, null, null, '2024-10-25 09:30', 'Pix', 'entregue'),
(176, 1, 2, 40.00, null, null, '2024-10-25 09:30', 'Pix', 'entregue'),
(177, 1, 2, 22.00, 'P7', 'Com extra de queijo.', '2024-10-26 11:00:00', 'Pix', 'entregue'),
(178, 1, 2, 22.00, 'P7', 'Com extra de queijo.', '2024-10-26 11:00:00', 'Pix', 'entregue'),
(179, 1, 2, 19.99, null, 'Por favor, evite a pimenta.', '2024-10-27 12:30', 'Pix', 'entregue'),
(180, 1, 2, 19.99, null, 'Por favor, evite a pimenta.', '2024-10-27 12:30', 'Pix', 'entregue'),
(181, 1, 2, 32.50, 'T9', null, '2024-10-28 13:45', 'Pix', 'entregue'),
(182, 1, 2, 32.50, 'T9', null, '2024-10-28 13:45', 'Pix', 'entregue'),
(183, 1, 3, 29.90, 'G2', null, '2024-10-21 15:00', 'Pix', 'entregue'),
(184, 1, 3, 29.90, 'G2', null, '2024-10-21 15:00', 'Pix', 'entregue'),
(185, 1, 3, 27.50, null, 'Sem refrigerante.', '2024-10-22 16:15', 'Pix', 'entregue'),
(186, 1, 3, 27.50, null, 'Sem refrigerante.', '2024-10-22 16:15', 'Pix', 'entregue'),
(187, 1, 3, 35.00, 'W7', 'Por favor, adicione batatas.', '2024-10-23 17:30', 'Pix', 'entregue'),
(188, 1, 3, 35.00, 'W7', 'Por favor, adicione batatas.', '2024-10-23 17:30', 'Pix', 'entregue'),
(189, 1, 3, 35.00, 'W7', 'Por favor, adicione batatas.', '2024-10-23 17:30', 'Pix', 'entregue'),
(190, 1, 3, 45.00, null, null, '2024-10-24 18:00', 'Pix', 'entregue'),
(191, 1, 3, 45.00, null, null, '2024-10-24 18:00', 'Pix', 'entregue'),
(192, 1, 3, 45.00, null, null, '2024-10-24 18:00', 'Pix', 'entregue'),
(193, 1, 3, 45.00, null, null, '2024-10-24 18:00', 'Pix', 'entregue'),
(194, 1, 1, 20.00, 'OP', 'Com molho barbecue.', '2024-10-25 19:00', 'Pix', 'entregue'),
(195, 1, 1, 20.00, 'OP', 'Com molho barbecue.', '2024-10-25 19:00', 'Pix', 'entregue'),
(196, 1, 1, 22.00, null, null, '2024-10-26 20:00', 'Pix', 'entregue'),
(197, 1, 1, 22.00, null, null, '2024-10-26 20:00', 'Pix', 'entregue'),
(198, 1, 2, 20.50, 'I5', 'Com extra de azeitonas.', '2024-10-27 21:00', 'Pix', 'entregue'),
(199, 1, 2, 20.50, 'I5', 'Com extra de azeitonas.', '2024-10-27 21:00', 'Pix', 'entregue'),
(200, 1, 2, 21.00, null, 'Sem mostarda.', '2024-10-28 22:00', 'Pix', 'entregue'),
(201, 1, 2, 21.00, null, 'Sem mostarda.', '2024-10-28 22:00', 'Pix', 'entregue'),
(202, 1, 2, 21.00, null, 'Sem mostarda.', '2024-10-28 22:00', 'Pix', 'entregue'),
(203, 1, 3, 18.00, 'E6', null, '2024-10-21 10:00', 'Pix', 'entregue'),
(204, 1, 3, 18.00, 'E6', null, '2024-10-21 10:00', 'Pix', 'entregue'),
(205, 1, 3, 18.00, 'E6', null, '2024-10-21 10:00', 'Pix', 'entregue'),
(206, 1, 3, 18.00, 'E6', null, '2024-10-21 10:00', 'Pix', 'entregue'),
(207, 1, 2, 20.00, null, null, '2024-10-22 11:30', 'Pix', 'entregue'),
(208, 1, 2, 20.00, null, null, '2024-10-22 11:30', 'Pix', 'entregue'),
(209, 1, 3, 30.00, 'G2', null, '2024-10-23 12:00', 'Pix', 'entregue'),
(210, 1, 3, 30.00, 'G2', null, '2024-10-23 12:00', 'Pix', 'entregue'),
(211, 1, 1, 50.00, 'F4', 'Sem alho.', '2024-10-24 13:00', 'Pix', 'entregue'),
(212, 1, 1, 50.00, 'F4', 'Sem alho.', '2024-10-24 13:00', 'Pix', 'entregue'),
(213, 1, 1, 40.00, null, null, '2024-10-25 15:45', 'Pix', 'entregue'),
(214, 1, 1, 40.00, null, null, '2024-10-25 15:45', 'Pix', 'entregue'),
(215, 1, 1, 25.00, 'R8', null, '2024-10-26 09:00', 'Pix', 'entregue'),
(216, 1, 1, 25.00, 'R8', null, '2024-10-26 09:00', 'Pix', 'entregue'),
(217, 1, 1, 32.50, 'D3', null, '2024-10-27 14:00', 'Pix', 'entregue'),
(218, 1, 1, 32.50, 'D3', null, '2024-10-27 14:00', 'Pix', 'entregue'),
(219, 1, 1, 22.50, 'H6', null, '2024-10-28 17:00', 'Pix', 'entregue'),
(220, 1, 1, 22.50, 'H6', null, '2024-10-28 17:00', 'Pix', 'entregue');

insert into pedido (cd_pedido, cd_carrinho, cd_cliente, vl_total_pedido, ds_guarda_sol, ds_observacao, dt_pedido, ds_tipo_pagamento, ds_status) 
values
(221, 1, 1, 25.50, 'K8', 'Sem pimenta, por favor.', '2024-07-01 12:00', 'Pix', 'entregue'),
(222, 1, 1, 25.50, 'K8', 'Sem pimenta, por favor.', '2024-07-01 12:00', 'Pix', 'entregue'),
(223, 1, 1, 180.75, null, 'sem oregano', '2024-07-02 13:30', 'Pix', 'entregue'),
(224, 1, 1, 180.75, null, 'sem oregano', '2024-07-02 13:30', 'Pix', 'entregue'),
(225, 1, 1, 180.75, null, 'sem oregano', '2024-07-02 13:30', 'Pix', 'entregue'),
(226, 1, 1, 650.00, 'G7', null, '2024-07-03 15:15', 'Pix', 'entregue'),
(227, 1, 1, 650.00, 'G7', null, '2024-07-03 15:15', 'Pix', 'entregue'),
(228, 1, 1, 650.00, 'G7', null, '2024-07-03 15:15', 'Pix', 'entregue'),
(229, 1, 1, 85.00, 'G9', 'Sem cebola.', '2024-07-04 12:00', 'Pix', 'entregue'),
(230, 1, 1, 85.00, 'G9', 'Sem cebola.', '2024-07-04 12:00', 'Pix', 'entregue'),
(231, 1, 2, 40.00, null, null, '2024-07-05 09:30', 'Pix', 'entregue'),
(232, 1, 2, 40.00, null, null, '2024-07-05 09:30', 'Pix', 'entregue'),
(233, 1, 2, 22.00, 'P7', 'Com extra de queijo.', '2024-07-06 11:00:00', 'Pix', 'entregue'),
(234, 1, 2, 22.00, 'P7', 'Com extra de queijo.', '2024-07-06 11:00:00', 'Pix', 'entregue'),
(235, 1, 2, 19.99, null, 'Por favor, evite a pimenta.', '2024-07-07 12:30', 'Pix', 'entregue'),
(236, 1, 2, 19.99, null, 'Por favor, evite a pimenta.', '2024-07-07 12:30', 'Pix', 'entregue'),
(237, 1, 2, 32.50, 'T9', null, '2024-07-08 13:45', 'Pix', 'entregue'),
(238, 1, 2, 32.50, 'T9', null, '2024-07-08 13:45', 'Pix', 'entregue'),
(239, 1, 3, 29.90, 'G2', null, '2024-07-09 15:00', 'Pix', 'entregue'),
(240, 1, 3, 29.90, 'G2', null, '2024-07-09 15:00', 'Pix', 'entregue'),
(241, 1, 3, 27.50, null, 'Sem refrigerante.', '2024-07-10 16:15', 'Pix', 'entregue'),
(242, 1, 3, 27.50, null, 'Sem refrigerante.', '2024-07-10 16:15', 'Pix', 'entregue'),
(243, 1, 3, 35.00, 'W7', 'Por favor, adicione batatas.', '2024-07-11 17:30', 'Pix', 'entregue'),
(244, 1, 3, 35.00, 'W7', 'Por favor, adicione batatas.', '2024-07-11 17:30', 'Pix', 'entregue'),
(245, 1, 3, 35.00, 'W7', 'Por favor, adicione batatas.', '2024-07-11 17:30', 'Pix', 'entregue'),
(246, 1, 3, 45.00, null, null, '2024-07-12 18:00', 'Pix', 'entregue'),
(247, 1, 3, 45.00, null, null, '2024-07-12 18:00', 'Pix', 'entregue'),
(248, 1, 3, 45.00, null, null, '2024-07-12 18:00', 'Pix', 'entregue'),
(249, 1, 3, 45.00, null, null, '2024-07-12 18:00', 'Pix', 'entregue'),
(250, 1, 1, 20.00, 'OP', 'Com molho barbecue.', '2024-07-13 19:00', 'Pix', 'entregue'),
(251, 1, 1, 20.00, 'OP', 'Com molho barbecue.', '2024-07-13 19:00', 'Pix', 'entregue'),
(252, 1, 1, 22.00, null, null, '2024-07-14 20:00', 'Pix', 'entregue'),
(253, 1, 1, 22.00, null, null, '2024-07-14 20:00', 'Pix', 'entregue'),
(254, 1, 2, 20.50, 'I5', 'Com extra de azeitonas.', '2024-08-01 21:00', 'Pix', 'entregue'),
(255, 1, 2, 20.50, 'I5', 'Com extra de azeitonas.', '2024-08-01 21:00', 'Pix', 'entregue'),
(256, 1, 2, 21.00, null, 'Sem mostarda.', '2024-08-02 22:00', 'Pix', 'entregue'),
(257, 1, 2, 21.00, null, 'Sem mostarda.', '2024-08-02 22:00', 'Pix', 'entregue'),
(258, 1, 2, 21.00, null, 'Sem mostarda.', '2024-08-02 22:00', 'Pix', 'entregue'),
(259, 1, 3, 18.00, 'E6', null, '2024-08-03 10:00', 'Pix', 'entregue'),
(260, 1, 3, 18.00, 'E6', null, '2024-08-03 10:00', 'Pix', 'entregue'),
(261, 1, 3, 18.00, 'E6', null, '2024-08-03 10:00', 'Pix', 'entregue'),
(262, 1, 3, 18.00, 'E6', null, '2024-08-03 10:00', 'Pix', 'entregue'),
(263, 1, 2, 20.00, null, null, '2024-08-04 11:30', 'Pix', 'entregue'),
(264, 1, 2, 20.00, null, null, '2024-08-04 11:30', 'Pix', 'entregue'),
(265, 1, 3, 30.00, 'G2', null, '2024-08-05 12:00', 'Pix', 'entregue'),
(266, 1, 3, 30.00, 'G2', null, '2024-08-05 12:00', 'Pix', 'entregue'),
(267, 1, 1, 50.00, 'F4', 'Sem alho.', '2024-08-06 13:00', 'Pix', 'entregue'),
(268, 1, 1, 50.00, 'F4', 'Sem alho.', '2024-08-06 13:00', 'Pix', 'entregue');


insert into reserva (cd_reserva, cd_carrinho, cd_cliente, dt_reserva, hr_reserva, vl_reserva, ds_reserva, ds_pagamento, hr_lembrete, nm_reservante) values 
(125, 1, 1, '2024-10-01', '12:00', 55.02, 'Ativa', 'pago', Null, 'Andre'),
(126, 1, 2, '2024-10-01', '14:00', 55.02, 'Cancelada', 'pago', Null, 'Fabio'),
(127, 1, 1, '2024-10-01', '16:00', 55.02, 'Ativa', 'pago', Null, 'Fernanda'),
(128, 1, 2, '2024-10-01', '18:00', 55.02, 'Ativa', 'pago', Null, 'Andreia'),
(129, 1, 1, '2024-10-02', '12:00', 55.02, 'Ativa', 'pago', Null, 'Cleide'),
(130, 1, 2, '2024-10-02', '14:00', 55.02, 'Ativa', 'pago', Null, 'Julia'),
(131, 1, 1, '2024-10-02', '16:00', 55.02, 'Ativa', 'pago', Null, 'Juliana'),
(132, 1, 1, '2024-10-03', '10:00', 55.02, 'Ativa', 'pago', Null, 'Fernanda'),
(133, 1, 2, '2024-10-03', '11:00', 55.02, 'Ativa', 'pago', Null, 'Andre'),
(134, 1, 1, '2024-10-03', '12:00', 55.02, 'Ativa', 'pago', Null, 'Felipão'),
(135, 1, 2, '2024-10-04', '14:00', 55.02, 'Ativa', 'pago', Null, 'Katiazinha'),
(136, 1, 1, '2024-10-04', '15:00', 55.02, 'Ativa', 'pago', Null, 'Dudu'),
(137, 1, 2, '2024-10-04', '16:00', 55.02, 'Ativa', 'pago', Null, 'Fafá'),
(138, 1, 1, '2024-10-05', '09:00', 55.02, 'Ativa', 'pago', Null, 'Nanda'),
(139, 1, 2, '2024-10-05', '11:00', 55.02, 'Ativa', 'pago', Null, 'Dri'),
(140, 1, 1, '2024-10-05', '13:00', 55.02, 'Ativa', 'pago', Null, 'Marcão'),
(141, 1, 2, '2024-10-06', '10:00', 55.02, 'Ativa', 'pago', Null, 'André'),
(142, 1, 1, '2024-10-06', '12:00', 55.02, 'Ativa', 'pago', Null, 'Júlia'),
(143, 1, 2, '2024-10-06', '14:00', 55.02, 'Ativa', 'pago', Null, 'Felipe'),
(144, 1, 1, '2024-10-06', '16:00', 55.02, 'Ativa', 'pago', Null, 'Marcos'),
(145, 1, 2, '2024-10-07', '12:00', 55.02, 'Ativa', 'pago', Null, 'Andreia'),
(146, 1, 1, '2024-10-07', '14:00', 55.02, 'Ativa', 'pago', Null, 'Cley'),
(147, 1, 2, '2024-10-08', '10:00', 55.02, 'Ativa', 'pago', Null, 'Dudu'),
(148, 1, 1, '2024-10-08', '14:00', 55.02, 'Ativa', 'pago', Null, 'Nanda'),
(149, 1, 2, '2024-10-08', '16:00', 55.02, 'Ativa', 'pago', Null, 'Juju'),
(150, 1, 1, '2024-10-09', '08:00', 55.02, 'Ativa', 'pago', Null, 'Felipão'),
(151, 1, 2, '2024-10-09', '09:00', 55.02, 'Ativa', 'pago', Null, 'Katiazinha'),
(152, 1, 1, '2024-10-09', '10:00', 55.02, 'Ativa', 'pago', Null, 'Cley'),
(153, 1, 2, '2024-10-10', '12:00', 55.02, 'Ativa', 'pago', Null, 'Fafá'),
(154, 1, 1, '2024-10-10', '14:00', 55.02, 'Ativa', 'pago', Null, 'Dri'),
(155, 1, 2, '2024-10-10', '16:00', 55.02, 'Ativa', 'pago', Null, 'Nanda'),
(156, 1, 1, '2024-10-11', '12:00', 55.02, 'Ativa', 'pago', Null, 'Marcão'),
(157, 1, 2, '2024-10-11', '14:00', 55.02, 'Ativa', 'pago', Null, 'Felipão'),
(158, 1, 1, '2024-10-12', '10:00', 55.02, 'Ativa', 'pago', Null, 'Júlia'),
(159, 1, 2, '2024-10-12', '12:00', 55.02, 'Ativa', 'pago', Null, 'Andreia'),
(160, 1, 1, '2024-10-12', '14:00', 55.02, 'Ativa', 'pago', Null, 'André'),
(161, 1, 2, '2024-10-12', '16:00', 55.02, 'Ativa', 'pago', Null, 'Felipe'),
(162, 1, 1, '2024-10-13', '10:00', 55.02, 'Ativa', 'pago', Null, 'Marcos'),
(163, 1, 2, '2024-10-13', '12:00', 55.02, 'Ativa', 'pago', Null, 'Katiazinha'),
(164, 1, 1, '2024-10-14', '14:00', 55.02, 'Ativa', 'pago', Null, 'Nanda'),
(165, 1, 2, '2024-10-14', '16:00', 55.02, 'Ativa', 'pago', Null, 'Dudu'),
(166, 1, 1, '2024-10-15', '12:00', 55.02, 'Ativa', 'pago', Null, 'Felipão'),
(167, 1, 2, '2024-10-15', '14:00', 55.02, 'Ativa', 'pago', Null, 'Cley'),
(168, 1, 1, '2024-10-15', '16:00', 55.02, 'Ativa', 'pago', Null, 'Andreia'),
(169, 1, 2, '2024-10-16', '10:00', 55.02, 'Ativa', 'pago', Null, 'Juju'),
(170, 1, 1, '2024-10-16', '12:00', 55.02, 'Ativa', 'pago', Null, 'Dri'),
(171, 1, 2, '2024-10-17', '14:00', 55.02, 'Ativa', 'pago', Null, 'Fafá'),
(172, 1, 1, '2024-10-17', '16:00', 55.02, 'Ativa', 'pago', Null, 'Felipe'),
(173, 1, 2, '2024-10-18', '10:00', 55.02, 'Ativa', 'pago', Null, 'Nanda'),
(174, 1, 1, '2024-10-18', '12:00', 55.02, 'Ativa', 'pago', Null, 'Marcos'),
(175, 1, 2, '2024-10-19', '14:00', 55.02, 'Ativa', 'pago', Null, 'Andreia'),
(176, 1, 1, '2024-10-19', '16:00', 55.02, 'Ativa', 'pago', Null, 'Felipão'),
(177, 1, 2, '2024-10-20', '12:00', 55.02, 'Ativa', 'pago', Null, 'Katiazinha'),
(178, 1, 1, '2024-10-20', '14:00', 55.02, 'Ativa', 'pago', Null, 'Dri'),
(179, 1, 2, '2024-10-21', '10:00', 55.02, 'Ativa', 'pago', Null, 'Fafá'),
(180, 1, 1, '2024-10-21', '12:00', 55.02, 'Ativa', 'pago', Null, 'Cley'),
(181, 1, 2, '2024-10-22', '14:00', 55.02, 'Ativa', 'pago', Null, 'Felipe'),
(182, 1, 1, '2024-10-22', '16:00', 55.02, 'Ativa', 'pago', Null, 'Nanda'),
(183, 1, 2, '2024-10-23', '12:00', 55.02, 'Ativa', 'pago', Null, 'Marcos'),
(184, 1, 1, '2024-10-23', '14:00', 55.02, 'Ativa', 'pago', Null, 'Juju');

insert into reserva (cd_reserva, cd_carrinho, cd_cliente, dt_reserva, hr_reserva, vl_reserva, ds_reserva, ds_pagamento, hr_lembrete, nm_reservante) values 
(185, 1, 1, '2024-11-13', '12:00', 55.02, 'Ativa', 'pago', Null, 'Andre'),
(186, 1, 2, '2024-11-21', '14:00', 55.02, 'Ativa', 'pago', Null, 'Fabio'),	
(187, 1, 1, '2024-11-25', '16:00', 55.02, 'Ativa', 'pago', Null, 'Fernanda'),
(188, 1, 2, '2024-10-21', '18:00', 55.02, 'Ativa', 'pago', Null, 'Andreia'),
(189, 1, 1, '2024-10-22', '12:00', 55.02, 'Ativa', 'pago', Null, 'Cleide'),
(190, 1, 2, '2024-10-22', '14:00', 55.02, 'Ativa', 'pago', Null, 'Julia'),
(191, 1, 1, '2024-10-22', '16:00', 55.02, 'Ativa', 'pago', Null, 'Juliana'),
(192, 1, 1, '2024-10-22', '18:00', 55.02, 'Ativa', 'pago', Null, 'Fernanda'),
(193, 1, 2, '2024-10-23', '10:00', 55.02, 'Ativa', 'pago', Null, 'Andre'),
(194, 1, 1, '2024-10-23', '11:00', 55.02, 'Ativa', 'pago', Null, 'Felipão'),
(195, 1, 2, '2024-10-23', '14:00', 55.02, 'Ativa', 'pago', Null, 'Katiazinha'),
(196, 1, 1, '2024-10-23', '15:00', 55.02, 'Ativa', 'pago', Null, 'Dudu'),
(197, 1, 2, '2024-10-24', '09:00', 55.02, 'Ativa', 'pago', Null, 'Fafá'),
(198, 1, 1, '2024-10-24', '11:00', 55.02, 'Ativa', 'pago', Null, 'Nanda'),
(199, 1, 2, '2024-10-24', '12:00', 55.02, 'Ativa', 'pago', Null, 'Dri'),
(200, 1, 1, '2024-10-25', '14:00', 55.02, 'Ativa', 'pago', Null, 'Marcão'),
(201, 1, 2, '2024-10-25', '15:00', 55.02, 'Ativa', 'pago', Null, 'André'),
(202, 1, 1, '2024-10-25', '16:00', 55.02, 'Ativa', 'pago', Null, 'Júlia'),
(203, 1, 2, '2024-10-25', '17:00', 55.02, 'Ativa', 'pago', Null, 'Felipe'),
(204, 1, 1, '2024-10-26', '10:00', 55.02, 'Ativa', 'pago', Null, 'Marcos'),
(205, 1, 2, '2024-10-26', '12:00', 55.02, 'Ativa', 'pago', Null, 'Andreia'),
(206, 1, 1, '2024-10-26', '14:00', 55.02, 'Ativa', 'pago', Null, 'Cley'),
(207, 1, 2, '2024-10-27', '10:00', 55.02, 'Ativa', 'pago', Null, 'Dudu'),
(208, 1, 1, '2024-10-27', '12:00', 55.02, 'Ativa', 'pago', Null, 'Nanda'),
(209, 1, 2, '2024-10-27', '14:00', 55.02, 'Ativa', 'pago', Null, 'Felipão'),
(210, 1, 1, '2024-10-27', '16:00', 55.02, 'Ativa', 'pago', Null, 'Cley'),
(211, 1, 2, '2024-10-28', '10:00', 55.02, 'Ativa', 'pago', Null, 'Andreia'),
(212, 1, 1, '2024-10-28', '12:00', 55.02, 'Ativa', 'pago', Null, 'Juju'),
(213, 1, 2, '2024-10-28', '14:00', 55.02, 'Ativa', 'pago', Null, 'Fafá'),
(214, 1, 1, '2024-10-28', '16:00', 55.02, 'Ativa', 'pago', Null, 'Felipe'),
(215, 1, 2, '2024-10-28', '18:00', 55.02, 'Ativa', 'pago', Null, 'Marcos');

insert into produto (cd_produto, cd_cardapio, nm_produto, ds_produto, vl_produto, ds_categoria, ds_tipo_venda, nm_imgProduto, hr_tempo_preparo, bl_produto_clube) values
	(5,1,'Acaraje','Delicioso acaraje frito na hora, tamanho grande e extremamente recheado, feito com qualidade e carinho junto com produtos de alta qualidade',20,'salgado', 'unidade', 'Acarajé.jpeg',30, false),
    (6,1,'Cerveja Bhama','Cerveja Bhama 550ml, gelada, pode ser servida no copo caso queira, basta colocar na observação',15,'Bebida', 'unidade', 'Cerveja Bhama 550ml.jpeg',10, false),
    (7,1,'Cerveja Itaipava','Cerveja Itaipava 350ml, gelada, pode ser servida no copo caso queira, basta colocar na observação',15,'Bebida', 'unidade', 'Cerveja Itaipava 350ml.jpeg',10, false),
    (8,1,'Suco de Limão','Suco de limão gelado, copo americano,acompanha gelo e rodelas de limão na borda e dentro do cpo',18,'Bebida', 'unidade', 'Suco de limão Copo.jpeg',20, false),
    (9,1,'Mini churros','Mini churros de doce de leite, passados no açucar com canela, fritos na hora e bem recheados.',35,'doce', 'porção', 'Churros.jpeg',50, false),
    (10,1,'Pastel Doce','Pastel de chocolate com morango, feito na hora, com chocolate de qualidade e morangos frescos',20,'doce', 'unidade', 'PastelChoco.jpeg',30, false),
    (11,1,'Picole','Picote natural, temos de morango, maracuja, abacaxi, limão e uva, coloque na des',15,'doce', 'unidade', 'Picole.jpeg',5.50, false),
    (12,1,'Guarana','Refrigerante guarana Antatica lata 350ml, gelado, acompanha copo com gelo se quiser',10,'Bebida', 'unidade', 'Guarana Antartica  lata 350ml.jpeg',10, false),
    (13,1,'Espeto camarão','Espetinho de camarão com queijo,  assado na hora, produtos de qualidade e preparo rapido ',19.50,'salgado', 'unidade', 'Espetinho de camarão com queijo.jpeg',20, false);
    
insert into sacola (cd_pedido, cd_produto, quantidade, ds_pago) values
(2, 7, 3, true),
(2, 5, 1, true),
(3,8, 3, true),
(3,9, 1, true),
(3,4, 4, true),
(3,3, 2, true),
(3,1, 1, true),
(4, 5, 1, true),
(4,8, 3, true),
(4,9, 1, true),
(4,4, 4, true);

insert into sacola(cd_pedido, cd_produto, quantidade, ds_pago) value
(5, 7, 3, true),
(5, 5, 1, true),
(6,8, 3, true),
(6,9, 1, true),
(6,4, 4, true),
(12,3, 2, true),
(12,1, 1, true),
(13, 5, 1, true),
(13,8, 3, true),
(13,9, 1, true),
(13,4, 4, true),
(15,3, 2, true),
(15,1, 1, true),
(15, 5, 1, true),
(14,8, 3, true),
(14,9, 1, true),
(14,4, 4, true);

select * from reserva;


insert into clube (cd_clube, cd_carrinho, nm_clube, vl_entrada, dt_criacao, ds_diferencial, nm_imgClube) values 
(3, 2,'Clube Juninho Play', 8, '2024-08-03','O melhor clube que você poderia fazer parte', "clube1.jpeg"),
(4, 2,'Clube da andorinha', 5, '2024-01-06','O melhor clube que você poderia fazer parte', "clube2.jpeg"),
(5, 2,'Clube do praieiro', 10, '2024-011-25','O melhor clube que você poderia fazer parte', "clube3.jpeg");

insert into clube_usuario (cd_clube, cd_cliente, qt_pontos) values 
(3,1, 900),
(4,1, 300),
(5,1, 180),
(3,2, 900),
(4,2, 300),
(5,2, 180),
(3,3, 900),
(4,3, 300),
(5,3, 180),
(3,4, 900),
(4,4, 300),
(5,4, 180),
(3,5, 900),
(4,5, 300),
(5,5, 180),
(5,6, 180),
(3,6, 900),
(4,6, 300),
(5,7, 180),
(3,7, 900),
(4,7, 300),
(5,8, 180),
(3,8, 900),
(4,8, 300),
(5,9, 180),
(3,9, 900),
(4,9, 300),
(3,10, 900),
(4,11, 300),
(5,12, 180),
(3,13, 900),
(4,14, 300),
(5,15, 180),
(5,16, 180);


insert into historico (cd_historico, cd_pedido, cd_cliente, cd_carrinho, vl_total_pedido, dt_pedido) values
(1, 2, 1, 1, 35, '2024-10-01 12:00'),
(2, 3, 1, 2, 138.40, '2024-10-01 12:00'),
(3, 4, 1, 3, 83.40, '2024-10-02 13:30'),
(4, 3, 1, 4, 138.40, '2024-10-02 13:30');  