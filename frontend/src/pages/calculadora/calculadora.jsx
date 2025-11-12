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
  Filler,
} from 'chart.js';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

import './calculadora.scss';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function GraficoHistorico({ historico }) {
  const data = useMemo(() => {
    const labels = historico.map(item =>
      new Date(item.calculado_em).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
      })
    );
    const dataPoints = historico.map(item => item.gasto_total_calculado);

    return {
      labels,
      datasets: [
        {
          label: 'Gasto Total Acumulado (R$)',
          data: dataPoints,
          fill: true,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
          pointRadius: 4,
          pointBackgroundColor: 'rgb(75, 192, 192)',
        },
      ],
    };
  }, [historico]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Evolução do Gasto Total Calculado',
        font: { size: 16 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart',
    },
  };

  return <Line options={options} data={data} key={historico.length} />;
}

function GerenciadorMetas({ metas, onNovaMeta }) {
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome || !valor || Number(valor) <= 0) {
      alert('Por favor, preencha um nome e um valor válido para a meta.');
      return;
    }
    onNovaMeta({ nome_meta: nome, valor_meta: Number(valor) });
    setNome('');
    setValor('');
  };

  return (
    <div className="metas-manager">
      
      <h4>Suas Metas e Sonhos</h4>
      <p>Cadastre aqui o que você gostaria de fazer com o dinheiro.</p>
      <ul className="metas-list">
        {metas.length === 0 && <li>Nenhuma meta cadastrada.</li>}
        {metas.map(meta => (
          <li key={meta.id_meta}>
            <span>{meta.nome_meta}</span>
            <strong>R$ {Number(meta.valor_meta).toFixed(2)}</strong>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="meta-form">
        <input
          type="text"
          placeholder="Nome da Meta (ex: Viagem)"
          value={nome}
          onChange={e => setNome(e.target.value)}
        />
        <input
          type="number"
          placeholder="Valor (R$)"
          value={valor}
          onChange={e => setValor(e.target.value)}
        />
        <button type="submit">+ Adicionar</button>
      </form>
    </div>
  );
}

function Calculadora() {
  const [gastoDiario, setGastoDiario] = useState('');
  const [horasDiarias, setHorasDiarias] = useState('');
  const [dataInicio, setDataInicio] = useState('');

  const [mensagens, setMensagens] = useState([]);
  const [historico, setHistorico] = useState([]);
  const [metas, setMetas] = useState([]);

  const [resultado, setResultado] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showChart, setShowChart] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function carregarDados() {
      setIsLoading(true);
      setError(null);
      try {
        const [respMsg, respHist, respMetas] = await Promise.all([
          api.get('/calculadora/mensagens'),
          api.get('/calculadora/impacto'),
          api.get('/calculadora/metas'),
        ]);
        
        setMensagens(respMsg.data);
        setHistorico(respHist.data);
        setMetas(respMetas.data);

      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        setError("Não foi possível carregar os dados. Tente novamente mais tarde.");
      } finally {
        setIsLoading(false);
        setTimeout(() => {
          setShowChart(true);
        }, 800); 
      }
    }
    carregarDados();
  }, []);

  const handleCalcularImpacto = async () => {
    if (!gastoDiario || !horasDiarias || !dataInicio) {
      alert("Preencha todos os campos!");
      return;
    }

    const gasto = Number(gastoDiario);
    const horas = Number(horasDiarias);
    const inicio = new Date(dataInicio);
    const hoje = new Date();

    if (inicio > hoje) {
      alert("A data de início não pode ser no futuro!");
      return;
    }

    try {
      const resp = await api.post('/calculadora/impacto', {
        gasto_diario: gasto,
        horas_diarias: horas,
        data_inicio_vicio: dataInicio,
      });
      setHistorico([...historico, resp.data]);
    } catch (err) {
      console.error("Erro ao salvar impacto:", err);
      alert("Erro ao salvar seu cálculo. Tente novamente.");
      return;
    }

    const dias = Math.max(1, Math.floor((hoje - inicio) / (1000 * 60 * 60 * 24)));
    const gastoTotal = gasto * dias;
    const horasTotais = horas * dias;

    const metasAlcancadas = metas.map(meta => ({
      nome: meta.nome_meta,
      quantidade: Math.floor(gastoTotal / Number(meta.valor_meta)),
    })).filter(meta => meta.quantidade > 0);

    const mensagem = mensagens[Math.floor(Math.random() * mensagens.length)];

    setResultado({
      dias,
      gastoTotal,
      horasTotais: horasTotais.toFixed(1),
      metasAlcancadas,
      mensagem,
    });
  };

  const handleNovaMeta = async (novaMeta) => {
    try {
      const resp = await api.post('/calculadora/metas', novaMeta);
      setMetas([...metas, resp.data]);
    } catch (err) {
      console.error("Erro ao salvar meta:", err);
      alert("Não foi possível salvar a nova meta.");
    }
  };

  const fecharModal = () => {
    setResultado(null);
    setGastoDiario('');
    setHorasDiarias('');
    setDataInicio('');
  };

  if (isLoading) {
    return <div className="calculadora-wrapper loading">Carregando...</div>;
  }

  if (error) {
    return <div className="calculadora-wrapper error">{error}</div>;
  }

  return (
    <div className="calculadora-wrapper">
      <button onClick={() => navigate('/')} className="btn-home-global" aria-label="Início">
        <Home size={24} color="#ffffff" />
      </button>

      <div className="calculadora-main">
        <div className="calculadora-form">
          <h2>Calculadora de Impacto</h2>
          <p>Veja o impacto real do vício em sua vida financeira e pessoal.</p>
          
          <div className="form-group">
            <label>Quanto você gasta por dia? (R$)</label>
            <input
              type="number"
              value={gastoDiario}
              onChange={(e) => setGastoDiario(e.target.value)}
              placeholder="Ex: 50"
            />
          </div>

          <div className="form-group">
            <label>Quantas horas por dia?</label>
            <input
              type="number"
              value={horasDiarias}
              onChange={(e) => setHorasDiarias(e.target.value)}
              placeholder="Ex: 3"
            />
          </div>

          <div className="form-group">
            <label>Quando você começou?</label>
            <input
              type="date"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
            />
          </div>

          <button className="btn-calcular" onClick={handleCalcularImpacto}>
            Calcular e Salvar Histórico
          </button>
        </div>

        <div className="calculadora-aside">
          <GerenciadorMetas metas={metas} onNovaMeta={handleNovaMeta} />
        </div>
      </div>

      <div className="calculadora-historico">
        <h3>Seu Histórico de Gastos</h3>
        
        {showChart && (
          <>
            {historico.length > 0 ? (
              <GraficoHistorico historico={historico} />
            ) : (
              <p>Nenhum cálculo salvo ainda. Seu gráfico aparecerá aqui.</p>
            )}
          </>
        )}
      </div>

      {resultado && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={fecharModal}>✖</button>
            <h3>Impacto em {resultado.dias} dias</h3>
            
            <p className="modal-mensagem"><em>"{resultado.mensagem}"</em></p>
            <hr />

            <div className="modal-section">
              <h4> Financeiro</h4>
              <p>Total gasto: <strong>R$ {resultado.gastoTotal.toFixed(2)}</strong></p>
            </div>

            <div className="modal-section">
              <h4> Tempo</h4>
              <p>Tempo dedicado ao vício: <strong>{resultado.horasTotais} horas</strong></p>
            </div>
            
            <div className="modal-section">
              <h4> O que você poderia ter conquistado:</h4>
              {resultado.metasAlcancadas.length > 0 ? (
                <ul className="metas-resultado">
                  {resultado.metasAlcancadas.map(meta => (
                    <li key={meta.nome}>
                      {meta.quantidade}x <strong>{meta.nome}</strong>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Você ainda não teria completado nenhuma meta cadastrada. <br/> Mas está mais perto do que imagina!</p>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default Calculadora;