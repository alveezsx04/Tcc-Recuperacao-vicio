import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './progresso.scss';
import api from '../../services/api';
import "../../styles/global.scss";

function Progresso() {
  
  const navigate = useNavigate();

  const [progresso, setProgresso] = useState(null);
  const [conquistas, setConquistas] = useState([]);
  
  const [barWidth, setBarWidth] = useState(0); 

  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  async function carregarProgresso() {
    try {
      setErro('');
      setLoading(true);
      const response = await api.get('/progresso');
      
      setProgresso(response.data); 
      setConquistas(response.data.conquistas || []);

      const proximaMeta = response.data.conquistas.find(c => !c.conquistado);
      const metaDias = proximaMeta ? proximaMeta.dias : 30;
      const progressoFinal = Math.min((response.data.dias_consecutivos / metaDias) * 100, 100);

      setTimeout(() => {
        setBarWidth(progressoFinal);
      }, 100);

    } catch (err) {
      console.error("Erro ao carregar progresso:", err);
      setErro('Não foi possível carregar seus dados de progresso.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarProgresso();
  }, []); 

  async function handleMarcarDia() {
    try {
      setErro('');
      setSucesso('');

      const response = await api.post('/progresso/marcar');
      
      setProgresso(response.data);
      setConquistas(response.data.conquistas || []);
      setSucesso('Parabéns! Dia marcado com sucesso.');
      
      const proximaMeta = response.data.conquistas.find(c => !c.conquistado);
      const metaDias = proximaMeta ? proximaMeta.dias : 30;
      const progressoFinal = Math.min((response.data.dias_consecutivos / metaDias) * 100, 100);
      
      setBarWidth(progressoFinal);

    } catch (err) {
      if (err.response && err.response.data && err.response.data.erro) {
        setErro(err.response.data.erro);
      } else {
        setErro('Ocorreu um erro ao tentar marcar o dia.');
      }
    }
  }

  
  if (loading) {
    return (
      <main className="progresso-container">
        <h1>Carregando seu progresso...</h1>
      </main>
    );
  }

  if (erro && !progresso) {
     return (
      <main className="progresso-container">
        <h1 style={{ color: 'red' }}>{erro}</h1>
      </main>
    );
  }
  
  const proximaMeta = conquistas.find(c => !c.conquistado);
  const metaDias = proximaMeta ? proximaMeta.dias : 30;
  const diasRestantes = proximaMeta ? proximaMeta.dias_restantes : 0;


  return (
    <>
      <main className="progresso-container" style={{ position: 'relative' }}>
        
        <h1>Seu Progresso na Recuperação</h1>
        <p className="sub">
          Acompanhe sua jornada, celebre suas conquistas e mantenha-se motivado no caminho da recuperação.
        </p>
        
        {erro && <p style={{ color: 'red', fontWeight: 'bold' }}>{erro}</p>}
        {sucesso && <p style={{ color: 'green', fontWeight: 'bold' }}>{sucesso}</p>}

        <section className="dias-limpo">
          <h2>{progresso.dias_consecutivos}</h2>
          <p>Dias limpo</p>
          <small>
            * Maior sequência: {progresso.melhor_sequencia} dias | Total de dias: {progresso.dias_totais}
          </small>
        </section>
        
        <section className="painel">
          <div className="proximo-marco card">
            <h3>Próximo Marco</h3>
            <p><strong>{proximaMeta ? proximaMeta.titulo : "Todas as metas batidas!"}</strong></p>
            <div className="progress">

              <div className="progress-bar" style={{ width: `${barWidth}%` }}></div>
            </div>
            <p className="progress-text">Faltam {diasRestantes} dias para o próximo marco!</p>
          </div>

          <div className="estatisticas card">
            <h3>Suas Estatísticas</h3>
            <div className="stats">
              <div><strong>{progresso.dias_consecutivos}</strong><span>Dias Limpo</span></div>
              <div><strong>{progresso.melhor_sequencia}</strong><span>Maior Sequência</span></div>
              <div><strong>{progresso.dias_totais}</strong><span>Total de Dias</span></div>
              <div>
                <strong>{conquistas.filter(c => c.conquistado).length}</strong>
                <span>Conquistas</span>
              </div>
            </div>
          </div>
        </section>

        <section className="conquistas">
          <h3>Conquistas & Marcos</h3>
          <div className="cards">
            {conquistas.map(conquista => (
              <div 
                key={conquista.titulo} 
                className={`card conquista ${!conquista.conquistado ? 'bloqueado' : ''}`}
              >
                <h4>{conquista.titulo}</h4>
                <p>
                  {conquista.conquistado 
                    ? conquista.descricao 
                    : `Faltam ${conquista.dias_restantes} dias para desbloquear.`}
                </p>
                <span className={`badge ${conquista.conquistado ? 'verde' : 'cinza'}`}>
                  {conquista.conquistado ? 'Conquistado' : 'Bloqueado'}
                </span>
              </div>
            ))}
          </div>
        </section>


        <div className="botoes">
          <button className="btn azul" onClick={handleMarcarDia}>Marcar Dia de Hoje</button>
          <button className="btn branco" onClick={() => navigate('/historico')}>
            Histórico Detalhado
          </button>
        </div>

        <section className="motivacao">
          <p>
            <strong>Continue Firme!</strong><br />
            Cada dia limpo é uma vitória. Você está mais forte a cada passo e mais perto de uma vida livre do vício e saudável!
          </p>
        </section>
      </main>
    </>
  )
}

export default Progresso;