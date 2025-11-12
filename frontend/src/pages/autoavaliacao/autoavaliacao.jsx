import React, { useState, useEffect, useMemo } from 'react';
import api from '/src/services/api'; 
import { Line } from 'react-chartjs-2'; 
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useNavigate } from 'react-router-dom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import './autoavaliacao.scss'; 

function HistoricoGrafico({ historico }) {
  const data = useMemo(() => {
    const labels = historico.map(item =>
      new Date(item.criado_em).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
      })
    );
    const dataPoints = historico.map(item => item.pontuacao_total);

    return {
      labels,
      datasets: [
        {
          label: 'Evolução da Pontuação',
          data: dataPoints,
          fill: true,
          backgroundColor: 'rgba(0, 123, 255, 0.1)',
          borderColor: 'rgba(0, 123, 255, 1)',
          tension: 0.1,
        },
      ],
    };
  }, [historico]);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Sua Evolução ao Longo do Tempo' },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 25, 
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart',
    }
  };

  return <Line options={options} data={data} key={historico.length} />;
}


function Autoavaliacao() {
  const [respostas, setRespostas] = useState(['1', '1', '1', '1', '1']);
  const [historico, setHistorico] = useState([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate(); 

  useEffect(() => {
    async function carregarHistorico() {
      try {
        const resp = await api.get('/autoavaliacao/historico');
        setHistorico(resp.data);
      } catch (err) {
        console.error("Erro ao carregar histórico:", err);
        setError("Não foi possível carregar seu histórico de evolução.");
      } finally {
        setIsLoading(false);
      }
    }
    carregarHistorico();
  }, []);

  const handleRespostaChange = (index, valor) => {
    setError(null);
    setSuccess(null);
    
    const novasRespostas = [...respostas];
    novasRespostas[index] = valor;
    setRespostas(novasRespostas);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const pontuacaoTotal = respostas.reduce((acc, valor) => acc + Number(valor), 0);
    
    try {
      const resp = await api.post('/autoavaliacao', {
        respostas,
        pontuacaoTotal
      });

      setHistorico([...historico, resp.data]);
      setSuccess('Avaliação salva com sucesso! Veja sua evolução no gráfico.');
      
    } catch (err) {
      console.error("Erro ao salvar avaliação:", err);
      setError("Não foi possível salvar sua avaliação. Tente novamente.");
    }
  };

  const perguntas = [
    "Como você avalia seu controle sobre seus impulsos hoje?",
    "Como você se sente em relação ao seu bem-estar mental?",
    "Você conseguiu focar em seus hobbies e trabalho hoje?",
    "Quão otimista você está sobre sua recuperação?",
    "Você se sentiu conectado com amigos ou família hoje?"
  ];

  if (isLoading) {
    return <div className="autoavaliacao-container">Carregando...</div>;
  }

  return (
    <div className="autoavaliacao-container">
    
      <div className="avaliacao-form-card">
        <h2>Autoavaliação Diária</h2>
        <p>Seja honesto. Como você se sentiu hoje? (1 = Muito Mal, 5 = Muito Bem)</p>
        
        <form onSubmit={handleSubmit}>
          {perguntas.map((pergunta, index) => (
            <div className="form-group-avaliacao" key={index}>
              <label>{index + 1}. {pergunta}</label>
              <select 
                value={respostas[index]}
                onChange={(e) => handleRespostaChange(index, e.target.value)}
              >
                <option value="1">1 (Muito Mal)</option>
                <option value="2">2</option>
                <option value="3">3 (Normal)</option>
                <option value="4">4</option>
                <option value="5">5 (Muito Bem)</option>
              </select>
            </div>
          ))}

          {error && <p className="msg-erro">{error}</p>}
          {success && <p className="msg-sucesso">{success}</p>}

          <button type="submit" className="btn-salvar-avaliacao">
            Salvar Avaliação de Hoje
          </button>
        </form>
      </div>

      <div className="avaliacao-historico-card">
        <h3>Sua Evolução</h3>
        {historico.length > 0 ? (
          <HistoricoGrafico historico={historico} />
        ) : (
          <p>Você ainda não tem avaliações. Seu gráfico de evolução aparecerá aqui.</p>
        )}
      </div>
    </div>
  );
}

export default Autoavaliacao;