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
    dt_entrada date,
    nm_imgPerfilC varchar(100),
	ds_contaAtiva enum('ativa', 'desativa'),
    
    
	constraint pk_cliente
		primary key (cd_cliente)
);

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
    cd_token varchar(100),
    ds_contaAtiva enum('ativa', 'desativa'),
    
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
    ds_localizacao text(85),
    ds_carrinho text(500),
    qt_conjunto int,
    vl_reserva float,
    
    constraint pk_carrinho
		primary key (cd_carrinho),
        
	constraint fk_barraqueiro_carrinho
		foreign key(cd_barraqueiro)
			references barraqueiro(cd_barraqueiro) on delete cascade
);

create table if not exists reserva (
	cd_reserva int auto_increment,
    cd_carrinho int,
    cd_cliente int,
    dt_reserva date,
    hr_reserva time,
    vl_reserva float,
    ds_reserva enum('Ativa', 'Cancelada'),
    hr_lembrete time,
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
    hr_tempo_preparo int,
    
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
    ds_status enum('pendente', 'pago', 'entregue'),
    
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
    ds_diferencial text(500),
    
    constraint pk_clube
		primary key (cd_clube),
        
	constraint fk_clube_carrinho
		foreign key (cd_carrinho)
			references carrinho(cd_carrinho) on delete cascade
);

create table if not exists clube_usuario (
	cd_clube int,
    cd_cliente int,
    qt_pontos decimal(45),
    
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
    qt_estrelas decimal(5,1),
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
	cd_cliente int,
    ds_titulo text(500),
    ds_descricao text(500),
    ds_tipo enum('Cupom','Pedido','Pontos', 'Atualiza'),
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

create table if not exists PlataformaProble(
cd_cliente int,
cd_barraqueiro int,
nm_completo varchar(85),
ds_email varchar(100),
ds_problema text(500),

constraint fk_problem_cliente
	foreign key (cd_cliente)
		references cliente(cd_cliente) on delete cascade,
        
constraint fk_problem_barraqueiro
	foreign key (cd_barraqueiro)
		references barraqueiro(cd_barraqueiro) on delete cascade
);



-- ////////// INSERT //////////////

insert into cliente values (1, 'Mateus', 'Oliveira', 'mateus@gmail.com', '$2b$10$6S29oSFkSFQXeDCiFycwdu6l9pn5Oq/LpZ5LP194vKaTCCLpNbG1W', '(13) 98877-3546', '2022-02-06' , null, 'ativa');

insert into plano value (1,'aa', '2025-05-31', 40);
    
insert into barraqueiro values (1,'Rafael','Dantas','rafaeldantas@gmail.com',48935984628,'$2b$10$6S29oSFkSFQXeDCiFycwdu6l9pn5Oq/LpZ5LP194vKaTCCLpNbG1W',13988357898, '2021-07-05' ,1, null, 'ativa');

-- insert into barraqueiro values (2, 'Wesley', 'Ferreira', 'wesleyferreira189@gmail.com', 43190376859, )
    
insert into carrinho values
(1,1,'Flor do verão', 'Perto do canal 4, na direção do quiosque Rosa dos ventos', 'Carrinho completo, com comida de qualidade, e atendimento unico', 12 , 30);

-- (2,1,'Sete Mares', 'Localizada na praia do itarare, na direção do quiosque Burgman','Barraca cheia de vida, alegria e comida boa, preço justo e facilidade pro pagamentos',31, 120)

insert into clube values (1, 1,'Clube Sete Mares', 10, 'O melhor clube que você poderia fazer parte');

insert into clube_usuario values (1,1, 100);

insert into cupons values (4, 50, '2024-05-02 00:00:00', 1,1);

select * from sacola;

insert into reserva values (1,1,1, '2024-02-05', '12:00', 55.02, 'Ativa', '12:01', 'Carlos');

 insert into cardapio values (1,1);
 
insert into notificacao values (1,1,'Novo Cupom','Um novo cupom foi adicionado na sua aba de cupom', 'Cupom', false);	

select * from cliente;
	
insert into produto values
	(1,1,'isca de frango','Deliciosas tiras de frango empanadas e fritas até a perfeição, servidas com batatas fritas crocantes. Um prato irresistível para os amantes de frango.',60,'salgado', 'porção',  50),
    (2,1,'pastel de frango','Pastel crocante recheado com suculento frango desfiado, temperado com especiarias que garantem um sabor inesquecível. Disponível em diversas variedades para agradar todos os paladares.', 15, 'salgado', 'unidade', 25),
    (3,1,'pastel de carne','Pastel frito na hora, recheado com carne moída suculenta e bem temperada. Perfeito para quem adora um salgado tradicional, com várias opções para variar no sabor.', 15, 'salgado', 'unidade', 40),
    (4,1,'espetinho','Saborosos espetinhos de churrasco, grelhados à perfeição, trazendo o autêntico sabor do churrasco brasileiro. Uma excelente escolha para um lanche rápido e saboroso.', 10, 'salgado', 'unidade', 30);	

select * from produto;

insert into pedido values 
	(1,1,1, 40 , 'G5','Sem cebola e sem pimenta', '2024-02-05 15:00', 'Pix', 'pago');
    -- (2,2,1, 58.12, 'G5','aaa', '2024-02-05 12:00'),
    -- (3,2,1, 58.12, 'G5','aaa', '2024-02-05 13:00');

insert into sacola values 
	(1,2,1,null);
    

    
select * from sacola;

select * from pedido;	
-- //////////////////////////////////////////////////// PROCEDURES ////////////////////////////////////////////////////

-- ///////// PROCEDURE DE CRIAÇÃO /////////
delimiter $$ 
create procedure adicionar_cliente(
	in nome varchar(45),
    in sobrenomeC varchar(45),
    in emailC varchar(100),
    in senhaC varchar(100),
    in telefoneC varchar(15)
)
begin
	insert into cliente(nm_cliente, nm_sobrenomeC, ds_emailC, ds_senhaC, nmr_telefoneC)
		values (nome, sobrenomeC, emailC, senhaC, telefoneC);
	select concat(nome , ' foi cadastrado com sucesso :)' ) as Concluido;
end $$
delimiter ; 

delimiter $$ 
create procedure adicionar_barraqueiro(
	in nome varchar(45),
    in sobrenomeB varchar(45),
    in emailB varchar(100),
    in senhaB varchar(100),
    in telefoneB varchar(15),
    in cpfB char (15) 
)
begin
if exists(select cd_barraqueiro from barraqueiro where ds_emailB = emailB) then
	select concat('Esse E-mail ja esta sendo utilizado, faça login') as Erro;
    else
	insert into barraqueiro(nm_barraqueiro, nm_sobrenomeB, ds_emailB, ds_senhaB, nmr_telefoneB, cd_cpfB,  cd_plano,
    cd_token)
		values (nome, sobrenomeB, emailB, senhaB, telefoneB, cpfB, null, null);
	select concat(nome , ' foi cadastrado com sucesso :)' ) as Concluido;
	end if;
end $$
delimiter ;

-- TESTEEEEEEEEEEEEE( TODOS OS COMANDO ACIMA SERAO USADOS PARA A ATVD DO RAFA)
-- ///////// PROCEDURE DE ATUALIZAÇÃO /////////
delimiter $$
create procedure atualiza_cliente(
	in email varchar(100),
    in nome varchar(45),
	in sobrenomeC varchar(45)
)
begin
	declare cliente int;
	select count(*) into cliente from cliente where ds_emailC = email;
    if cliente > 0 then
		update cliente set nm_cliente = nome where ds_emailC = email;
		update cliente set nm_sobrenomeC = sobrenomeC where ds_emailC = email;
        select 'Nome atualizado' as sucesso;
        else
        select 'usuario não encontrado' as erro;
	end if;
    end $$
delimiter ;


-- ///////// PROCEDURE DE EXCLUSÃO /////////
delimiter $$
create procedure excluir_cliente(
	in email varchar (100)
)
begin
	if exists (select cd_cliente from cliente where ds_emailC = email) then
		delete from cliente where ds_emailC = email;
			select('Essa conta foi excluida') as Exclui;
	end if;
    end $$
delimiter ;

-- //////////////////////////////////////////////////// TRIGGER ////////////////////////////////////////////////////

-- trigger que adiciona um cupom de 50 reais de desconto na primeira compra para novos clientes (pode servir para qualquer carrinho ja que não a codigo de carrinho inserido no cupom)
delimiter $$

create trigger adiciona_cupom
after insert on cliente
for each row
begin
insert into cupons(vl_cupom, dt_validade_cupom, cd_carrinho, cd_cliente)
values (50.0, '2024-02-12', null, new.cd_cliente);
end $$
delimiter ;

-- ///////////// Trigger para atualizar pontos /////////////
delimiter $$

create trigger atualiza_pontos
after insert on historico
for each row
begin
update clube_usuario set qt_pontos = qt_pontos + new.vl_total_pedido
where cd_cliente = new.cd_cliente;
end $$;
delimiter ;

-- ///////////// Trigger de notificação para cupons /////////////
delimiter $$

create trigger noti_cupons
after insert on cupons
for each row
begin
	insert into notificacao (cd_cliente, ds_titulo, ds_descricao, ds_tipo, ds_vizu)
    values (new.cd_cliente, 'Novo Cupom', 'Um novo cupom foi adicionado na sua aba de cupom', 'Cupom', 0);
end $$
delimiter ;

-- ///////////// trigger de notificação para pedidos /////////////
delimiter $$

create trigger noti_pedido
after insert on historico
for each row
begin
	insert into notificacao (cd_cliente, ds_titulo, ds_descricao, ds_tipo, ds_vizu)
    values (new.cd_cliente, 'Novo Pedido Feito', 'Seu pedido foi efetuado, em breve você vai recebelo', 'Pedido', 0);
end $$
delimiter ;

delimiter $$

create trigger checar_emailB
before insert on barraqueiro
for each row
begin
    if exists (select 1 from cliente where cliente.ds_emailC = new.ds_emailB) then
        signal sqlstate '45000' set message_text = 'Uma conta banhista já está utilizando esse email, por favor tente outro';
    end if;
end $$

delimiter ;

delimiter $$

create trigger checar_emailC
before insert on cliente
for each row 
begin
    if exists (select 1 from barraqueiro where barraqueiro.ds_emailB = new.ds_emailC) then
        signal sqlstate '45000' set message_text = 'Uma conta Banhista já está utilizando esse email, por favor tente outro';
    end if;
end $$

delimiter ;


-- //////////////////////////////////////////////////// Relatório ////////////////////////////////////////////////////

-- ///////////// Relatório de categoria /////////////
delimiter $$

create procedure Relatorio_categoria(
	in categoria enum('doce','salgado','bebida'),
    in carrinho int	
)
begin
	select  nm_carrinho, cd_produto, nm_produto, ds_produto,ds_categoria, vl_produto from produto join cardapio on produto.cd_cardapio = cardapio.cd_cardapio join carrinho on carrinho.cd_carrinho = cardapio.cd_carrinho
		where produto.ds_categoria = categoria and carrinho.cd_carrinho = carrinho;
end $$;

delimiter ;