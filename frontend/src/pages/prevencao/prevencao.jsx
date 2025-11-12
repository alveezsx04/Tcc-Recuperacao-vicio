import React from 'react';
import './prevencao.scss';
import {
  FiAlertTriangle,
  FiCheckCircle,
  FiShield,
  FiAlertCircle
} from 'react-icons/fi';
import { BsGraphUp } from 'react-icons/bs';

const Prevencao = () => {
  return (
    <main className="prevencao-container">
      <section className="prevencao-header">
        <h2>Recursos de Prevenção</h2>
        <p>
          Informações essenciais para identificar riscos, prevenir inícios
          comportamentais e promover um estilo de vida saudável
        </p>
      </section>

      <section className="sinais-alerta">
        <h3>
          <FiAlertTriangle /> Sinais de Alerta Precoce
        </h3>
        <p>
          Reconhecer sinais precoces é fundamental para intervenção preventiva
          eficaz.
        </p>
        <div className="cards-container-3-col">
          <div className="card">
            <h4>Comportamentais</h4>
            <ul>
              <li>Mudanças súbitas de comportamento ou humor</li>
              <li>Isolamento social e perda de interesse em atividades</li>
              <li>Dificuldade em cumprir obrigações diárias e laborais</li>
              <li>Irritabilidade quando não pode realizar a atividade</li>
              <li>Negligência de responsabilidades pessoais ou profissionais</li>
            </ul>
          </div>
          <div className="card">
            <h4>Físicos</h4>
            <ul>
              <li>Alterações no padrão de sono</li>
              <li>Queixas constantes de falta de energia</li>
              <li>Dores de cabeça ou tensão muscular</li>
              <li>Mudanças no apetite</li>
            </ul>
          </div>
          <div className="card">
            <h4>Sociais</h4>
            <ul>
              <li>Conflitos frequentes com família ou amigos</li>
              <li>Mentir sobre tempo gasto em atividades</li>
              <li>Perda de interesse em relacionamentos</li>
              <li>Problemas financeiros inexplicados</li>
              <li>Afastamento de círculos sociais saudáveis</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="fatores-risco-protecao">
        <h3>
          <BsGraphUp /> Fatores de Risco e Proteção
        </h3>
        <div className="cards-container-2-col">
          <div className="card risco">
            <h4>
              <FiAlertCircle /> Fatores de Risco
            </h4>
            <p>Aspectos que aumentam a vulnerabilidade ao desenvolvimento de vícios.</p>
            <ul>
              <li>
                <FiAlertTriangle />
                <span>Histórico familiar de dependência</span>
              </li>
              <li>
                <FiAlertTriangle />
                <span>Transtornos mentais pré-existentes (ansiedade, depressão)</span>
              </li>
              <li>
                <FiAlertTriangle />
                <span>Baixa autoestima e autocontrole</span>
              </li>
              <li>
                <FiAlertTriangle />
                <span>Eventos de vida estressantes ou traumáticos</span>
              </li>
              <li>
                <FiAlertTriangle />
                <span>Acesso facilitado a atividades de risco</span>
              </li>
              <li>
                <FiAlertTriangle />
                <span>Pressão social ou influência de pares</span>
              </li>
              <li>
                <FiAlertTriangle />
                <span>Ambientes caóticos sem mecanismos de enfrentamento</span>
              </li>
            </ul>
          </div>
          <div className="card protecao">
            <h4>
              <FiCheckCircle /> Fatores de Proteção
            </h4>
            <p>Aspectos que fortalecem a resiliência e reduzem riscos.</p>
            <ul>
              <li>
                <FiCheckCircle />
                <span>Rede de apoio familiar e social forte</span>
              </li>
              <li>
                <FiCheckCircle />
                <span>Habilidades de regulação emocional</span>
              </li>
              <li>
                <FiCheckCircle />
                <span>Atividades físicas e hobbies saudáveis</span>
              </li>
              <li>
                <FiCheckCircle />
                <span>Educação sobre riscos e prevenção</span>
              </li>
              <li>
                <FiCheckCircle />
                <span>Ambiente familiar estruturado e acolhedor</span>
              </li>
              <li>
                <FiCheckCircle />
                <span>Acesso a recursos de saúde mental</span>
              </li>
              <li>
                <FiCheckCircle />
                <span>Desenvolvimento da resiliência e autoconhecimento</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="estrategias">
        <h3>
          <FiShield /> Estratégias de Prevenção
        </h3>
      </section>
    </main>
  );
};

export default Prevencao;