
create database tcc;
use tcc;


create table usuario (
    id_usuario int primary key auto_increment,
    nome varchar(200),
    sobrenome varchar(200),
    telefone varchar(200),
    dt_nascimento date
);

create table login (	
	id_login int primary key auto_increment,
    id_usuario int not null,
    email varchar(200) unique not null,
    senha varchar(200),
    role varchar(200),
    criacao datetime,
    foreign key (id_usuario) references usuario(id_usuario)
);

create table questionario (
    id int primary key auto_increment,
    id_usuario int not null,
    pergunta1 varchar(200),
    pergunta2 varchar(200),
    pergunta3 varchar(200),
    pergunta4 varchar(200),
    pergunta5 varchar(200),
    criado_em timestamp default current_timestamp,
    foreign key (id_usuario) references usuario(id_usuario) on delete cascade
);


create table impacto (
    id int primary key auto_increment,
    usuario_id int not null,
    gasto_diario decimal(10,2) not null,
    horas_diarias int,
    data_inicio_vicio date,
    calculado_em timestamp default current_timestamp,
    foreign key (usuario_id) references usuario(id_usuario) on delete cascade
);


create table progresso (
    id int primary key auto_increment,
    usuario_id int not null,
    data_registro date default null,
    dias_totais int default 0,
    melhor_sequencia int default 0,
    dias_consecutivos int default 0,
    ultimo_dia_marcado date default null,
    criado_em timestamp default current_timestamp,
    foreign key (usuario_id) references usuario(id_usuario) on delete cascade
);


create table dias_progresso (
    id int primary key auto_increment,
    progresso_id int not null,
    data_dia date,
    foreign key (progresso_id) references progresso(id) on delete cascade
);

INSERT INTO usuario (nome, sobrenome, telefone, dt_nascimento)
VALUES ('Lucas', 'Alves', '11999999999', '2000-05-20');

select * from login;

select * from usuario;



