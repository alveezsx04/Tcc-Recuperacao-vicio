import React from 'react';
import './prevencao.scss'


function Prevencao () {
  return (
    <main className="page">
      <div className="top-accent"></div>

      <header className="hero">
        <div className="hero-inner">
          <div className="back-home">
            <span className="home-ico">🏠</span>
            <a href="#" className="back-link">Voltar para Home</a>
          </div>

          <div className="shield-ico">🛡️</div>

          <h1 className="site-title">Recursos de Prevenção</h1>
          <p className="subtitle">Informações essenciais para identificar riscos, prevenir vícios comportamentais e promover um estilo de vida saudável</p>
        </div>
      </header>

      <section className="container section">
        <div className="section-header">
          <h2><span className="warn-ico">⚠️</span> Sinais de Alerta Precoce</h2>
          <p className="muted">Reconhecer sinais precoces é fundamental para intervenção preventiva eficaz.</p>
        </div>

        <div className="grid grid-3 cards-row">
          <article className="card accent-red">
            <h3>Comportamentais</h3>
            <ul className="list">
              <li>Mudança súbita de comportamento ou humor</li>
              <li>Isolamento social e perda de interesse em atividades</li>
              <li>Dificuldade em controlar tempo dedicado à atividade</li>
              <li>Irritabilidade quando não pode realizar a atividade</li>
              <li>Negligência de responsabilidades pessoais ou profissionais</li>
            </ul>
          </article>

          <article className="card accent-red">
            <h3>Físicos</h3>
            <ul className="list">
              <li>Alterações no padrão de sono</li>
              <li>Fadiga constante ou falta de energia</li>
              <li>Descuido com higiene pessoal</li>
              <li>Dores de cabeça ou tensão muscular</li>
              <li>Mudanças no apetite</li>
            </ul>
          </article>

          <article className="card accent-red">
            <h3>Sociais</h3>
            <ul className="list">
              <li>Conflitos frequentes com família ou amigos</li>
              <li>Mentiras sobre tempo gasto em atividades</li>
              <li>Perda de interesse em relacionamentos</li>
              <li>Problemas financeiros inexplicados</li>
              <li>Afastamento de círculos sociais saudáveis</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="container section">
        <div className="grid grid-2">
          <article className="card large accent-yellow">
            <h3><span className="icon-small">⚠️</span> Fatores de Risco</h3>
            <p className="muted">Aspectos que aumentam a vulnerabilidade ao desenvolvimento de vícios</p>
            <ul className="list">
              <li>História familiar de dependências</li>
              <li>Transtornos mentais pré-existentes (ansiedade, depressão)</li>
              <li>Baixa autoestima e autocontrole</li>
              <li>Traumas ou experiências adversas na infância</li>
              <li>Acesso facilitado a atividades de risco</li>
              <li>Pressão social ou influência de pares</li>
              <li>Estresse crônico sem mecanismos de enfrentamento</li>
            </ul>
          </article>

          <article className="card large accent-green">
            <h3><span className="icon-small">🛡️</span> Fatores de Proteção</h3>
            <p className="muted">Aspectos que fortalecem a resiliência e reduzem riscos</p>
            <ul className="list">
              <li>Rede de apoio familiar e social forte</li>
              <li>Habilidades de regulação emocional</li>
              <li>Atividades físicas e hobbies saudáveis</li>
              <li>Educação sobre riscos e prevenção</li>
              <li>Ambiente familiar estruturado e acolhedor</li>
              <li>Acesso a recursos de saúde mental</li>
              <li>Desenvolvimento de resiliência e autoconhecimento</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="container section">
        <div className="section-header">
          <h2><span className="strategy-ico">📈</span> Estratégias de Prevenção</h2>
          <p className="muted">Níveis de prevenção aplicáveis conforme risco e necessidade.</p>
        </div>

        <div className="grid grid-3 cards-row">
          <article className="card">
            <div className="pill">Nível 1</div>
            <h3>Prevenção Universal</h3>
            <p className="muted">Direcionada a toda a população, sem distinção de risco</p>
            <ul className="list">
              <li>Campanhas educativas em escolas e comunidades</li>
              <li>Programas de conscientização sobre vícios comportamentais</li>
              <li>Promoção de estilos de vida saudáveis</li>
              <li>Desenvolvimento de habilidades socioemocionais</li>
            </ul>
          </article>

          <article className="card">
            <div className="pill">Nível 2</div>
            <h3>Prevenção Seletiva</h3>
            <p className="muted">Focada em grupos com maior risco de desenvolver vícios</p>
            <ul className="list">
              <li>Programas para jovens em situação de vulnerabilidade</li>
              <li>Apoio a famílias com histórico de dependências</li>
              <li>Intervenções em ambientes de alto risco</li>
              <li>Grupos de apoio preventivos</li>
            </ul>
          </article>

          <article className="card">
            <div className="pill">Nível 3</div>
            <h3>Prevenção Indicada</h3>
            <p className="muted">Para indivíduos que já apresentam sinais iniciais</p>
            <ul className="list">
              <li>Triage e avaliação precoce</li>
              <li>Intervenções breves e aconselhamento</li>
              <li>Encaminhamento para profissionais especializados</li>
              <li>Monitoramento e acompanhamento próximo</li>
            </ul>
          </article>
        </div>
      </section>
    </main>
  );
}

export default Prevencao;
