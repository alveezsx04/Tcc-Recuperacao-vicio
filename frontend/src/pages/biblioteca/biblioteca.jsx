import React from "react";
import { Youtube, Instagram, Globe, Home, ArrowLeft } from "lucide-react"; // Adicionado ArrowLeft
import "./biblioteca.scss";
import "../../styles/global.scss"; // Mantido se for necessário para estilos globais
import { useNavigate } from 'react-router-dom';

// Cores para o novo esquema (verde e branco)
const greenColor = "#4CAF50"; // Um tom de verde bonito
const whiteColor = "#FFFFFF";

function Biblioteca() {

  const navigate = useNavigate();

  
  const canais = [
    {
      nome: "Drauzio Varella",
      plataforma: "YouTube",
      descricao: "O maior canal de saúde do Brasil: de resfriado a questões sociais. Falar para todos, com credibilidade e sem ser chato.",
      icone: <Youtube size={36} color="#FF0000" />,
      link: "https://youtube.com/@drauziovarella?si=CknwRq757e4Jd218"
    },
    {
      nome: "Instituto Padre Haroldo",
      plataforma: "Instagram",
      descricao: "O Instituto Padre Haroldo, fundado em 1978, atua nas políticas de Assistência Social e Saúde, promovendo prevenção, cuidados e educação.",
      icone: <Instagram size={36} color="#C13584" />,
      
      link: "https://www.instagram.com/institutopadreharoldo/" 
    },
    {
      nome: "SOS Sobriedade",
      plataforma: "YouTube",
      descricao: "O SOS SOBRIEDADE produz conteúdos para orientar e auxiliar na recuperação de dependentes químicos e familiares.",
      icone: <Youtube size={36} color="#FF0000" />,
      
      link: "https://www.youtube.com/@SOSSOBRIEDADE" 
    },
    {
      nome: "SMART Recovery",
      plataforma: "Site",
      descricao: "Programa de recuperação baseado em evidências, ajudando pessoas a superar comportamentos aditivos (vícios).",
    
      icone: <Globe size={36} color={greenColor} />, 
      link: "https://smartrecovery.org/"
    },
    {
      nome: "Sober Motivation",
      plataforma: "Instagram",
      descricao: "Perfil internacional com frases motivacionais e histórias reais de superação de diversos vícios.",
      icone: <Instagram size={36} color="#C13584" />,
      link: "https://www.instagram.com/sobermotivation/"
    },
    {
      nome: "Russell Brand",
      plataforma: "YouTube",
      descricao: "Fala abertamente sobre sua trajetória de superação de vícios em drogas e fama, com mensagens intensas e reflexivas.",
      icone: <Youtube size={36} color="#FF0000" />,
      link: "https://www.youtube.com/user/russellbrand"
    },
    {
      nome: "Fight the New Drug",
      plataforma: "Instagram",
      descricao: "Organização internacional que ajuda pessoas a superar vícios comportamentais como pornografia e internet.",
      icone: <Instagram size={36} color="#C13584" />,
      link: "https://www.instagram.com/fightthenewdrug/"
    },
    {
      nome: "Amor Exigente",
      plataforma: "YouTube",
      descricao: "Canal com palestras e conteúdos voltados a famílias e pessoas em recuperação de vícios.",
      icone: <Youtube size={36} color="#FF0000" />,
      link: "https://www.youtube.com/@AmorExigenteOficial"
    },
    {
      nome: "Doutor Jairo Bouer",
      plataforma: "Instagram",
      descricao: "Psiquiatra que aborda vícios, saúde mental, dependência digital, drogas e relacionamentos de forma acessível.",
      icone: <Instagram size={36} color="#C13584" />,
      link: "https://www.instagram.com/doutorjairo/"
    },
    {
      nome: "Psicoativo",
      plataforma: "YouTube",
      descricao: "Canal informativo com uma abordagem clara e acessível sobre vícios, comportamento e saúde mental.",
      icone: <Youtube size={36} color="#FF0000" />,
      link: "https://www.youtube.com/@psicoativo"
    }
  ];

  return (
    <div className="biblioteca-container">

      <header className="biblioteca-header">
     
        <button onClick={() => navigate(-1)} className="btn-voltar" aria-label="Voltar para a página anterior">
          <ArrowLeft size={24} />
        </button>

        <div className="titulo-secao">
           
            <div className="icone-central"> 
                <Globe size={36} />
            </div>
            <h1>Fontes de Apoio Confiáveis</h1>
            <p className="descricao">
                Conheça canais e perfis que abordam prevenção, tratamento e conscientização sobre vícios comportamentais e químicos.
            </p>
        </div>
        
        
        <button onClick={() => navigate('/')} className="btn-home" aria-label="Ir para a página inicial">
            <Home size={24} />
        </button>
      </header>

      <div className="cards-container">
        {canais.map((canal, index) => (
          <a href={canal.link} key={index} className="card" target="_blank" rel="noopener noreferrer">
            <div className="icone">{canal.icone}</div>
            <h2>{canal.nome}</h2>
            <span className="plataforma">{canal.plataforma}</span>
            <p>{canal.descricao}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Biblioteca;