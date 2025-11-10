import React from "react";
import { useNavigate } from "react-router-dom";

import {
  User,
  LineChart,
  Smartphone,
  Target,
  Calculator,
  ClipboardList,
  BookOpen
} from "lucide-react";

import "../../styles/global.scss";
import "./inicio.scss";

function Inicio () {
  const navigate = useNavigate();

  return (
    <>
      <div className="hero-section">
        <div className="hero-content">
          <h1>Recupere o controle da sua vida</h1>
          <p className="subtitle">
            Se o jogo de aposta se tornou um peso, estamos aqui. Oferecemos
            ferramentas para você dar o primeiro passo em direção à liberdade.
          </p>

          <div className="button-group">
            <a
              href="https://www.cvv.org.br"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-professional-help"
            >
              Buscar Ajuda Profissional
            </a>
          </div>
        </div>
      </div>

      <section className="como-funciona">
        <h2>Como funciona?</h2>

        <div className="steps">
          <div className="step">
            <span>1</span>
            <p>Faça uma autoavaliação inicial</p>
          </div>

          <div className="step">
            <span>2</span>
            <p>Explore nossas ferramentas gratuitas</p>
          </div>

          <div className="step">
            <span>3</span>
            <p>Acompanhe sua evolução ao longo do tempo</p>
          </div>
        </div>
      </section>

      <section className="section2">
        <div className="content">
          <h1>Dados Estatísticos Relevantes</h1>
          <p className="subtitle">
            Números que demonstram a magnitude do problema dos vícios comportamentais no Brasil e no mundo
          </p>
        </div>

        <div className="cards">
          <div className="card">
            <div className="icon-wrapper">
              <User size={36} strokeWidth={2} />
            </div>
            <div className="stat-info">
              <div className="valor">15%</div>
              <p className="stat-title">População Brasileira</p>
            </div>
            <p className="stat-description-long">
              Percentual estimado de pessoas com algum tipo de vício comportamental
            </p>
          </div>

          <div className="card">
            <div className="icon-wrapper">
              <LineChart size={36} strokeWidth={2} />
            </div>
            <div className="stat-info">
              <div className="valor">R$ 2,8 bi</div>
              <p className="stat-title">Perdas Anuais</p>
            </div>
            <p className="stat-description-long">
              Valor perdido anualmente em apostas online no Brasil
            </p>
          </div>

          <div className="card">
            <div className="icon-wrapper">
              <Smartphone size={36} strokeWidth={2} />
            </div>
            <div className="stat-info">
              <div className="valor">67%</div>
              <p className="stat-title">Jovens Afetados</p>
            </div>
            <p className="stat-description-long">
              Porcentagem de dependentes digitais entre 18-25 anos
            </p>
          </div>

          <div className="card">
            <div className="icon-wrapper">
              <Target size={36} strokeWidth={2} />
            </div>
            <div className="stat-info">
              <div className="valor">3,2 mi</div>
              <p className="stat-title">Pessoas em Risco</p>
            </div>
            <p className="stat-description-long">
              Brasileiros com sinais de vício em jogos de azar
            </p>
          </div>
        </div>
      </section>

      <section className="section4-acoes">
        <div className="content">
          <h1>Suas Ferramentas</h1>
          {/* <p className="subtitle"> <-- Remova esta, se estiver usando a nova classe */}
          <p className="subtitle-section4"> {/* <-- Use esta classe que criamos no CSS */}
            Recursos práticos e gratuitos para auxiliar na sua jornada de recuperação.
          </p>
        </div>

        <div className="cards-acoes">
          <div className="card-acao">
            <ClipboardList size={34} strokeWidth={2} />
            <h3>Teste de Autoavaliação</h3>
            <p>Avalie seu nível de dependência</p>
            <button onClick={() => navigate("/autoavaliacao")}>Acessar →</button>
          </div>

          <div className="card-acao">
            <Calculator size={34} strokeWidth={2} />
            <h3>Calculadora de Impacto</h3>
            <p>Descubra o custo real do seu vício</p>
            <button onClick={() => navigate("/calculadora")}>Acessar →</button>
          </div>

          <div className="card-acao">
            <LineChart size={34} strokeWidth={2} />
            <h3>Meu Progresso</h3>
            <p>Acompanhe sua evolução</p>
            <button onClick={() => navigate("/progresso")}>Acessar →</button>
          </div>

          <div className="card-acao">
            <BookOpen size={34} strokeWidth={2} />
            <h3>Biblioteca</h3>
            <p>Conteúdos e estudos sobre vícios</p>
            <button onClick={() => navigate("/biblioteca")}>Acessar →</button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Inicio;