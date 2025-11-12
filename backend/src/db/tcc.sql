
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
    pontuacao_total int,
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
	gasto_total_calculado decimal(10,2),
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

create table definicoes_conquistas (
    id int primary key auto_increment,
    titulo varchar(100) not null unique,
    dias int not null,
    descricao varchar(255) not null
);


create table conquistas_usuario (
    id int primary key auto_increment,
    progresso_id int not null,
    conquista_titulo varchar(100) not null,
    data_conquista date not null,
    foreign key (progresso_id) references progresso(id),
    unique (progresso_id, conquista_titulo)
);


create table mensagem_motivacional (
  id_mensagem int primary key auto_increment,
  mensagem text not null,
  ativo boolean default true
);




create table metas_usuario (
  id_meta int primary key auto_increment,
  id_usuario int not null,
  nome_meta varchar(255) not null,
  valor_meta decimal(10, 2) not null,
  ativo boolean default true,
  criado_em timestamp default current_timestamp,
  foreign key (id_usuario) references usuario(id_usuario) on delete cascade
);

insert into mensagem_motivacional (mensagem) values
('Não deixe esse vício matar seus sonhos.'),
('Você é mais forte que o vício!'),
('Você merece uma vida livre de dependências.'),
('A vida é mais leve sem vícios.'),
('Seja o protagonista da sua vida, sem vícios!'),
('Cada dia longe do vício é uma vitória que o dinheiro não pode comprar.'),
('Imagine a pessoa que você se tornará sem esse peso.');


insert ignore into definicoes_conquistas (titulo, dias, descricao) values
('Uma Semana', 7, 'Parabéns por se manter firme por 7 dias!'),
('15 Dias', 15, 'Duas semanas de progresso contínuo!'),
('1 Mês', 30, 'Você manteve o foco por um mês inteiro!'),
('3 Meses', 90, 'Um marco incrível! Continue assim.'),
('6 Meses', 180, 'Meio ano de dedicação à sua recuperação.'),
('1 Ano', 365, 'Você completou um ano! Uma conquista monumental.');