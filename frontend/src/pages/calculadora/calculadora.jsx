import React, { useState } from "react";
import "./calculadora.scss";
import "../../styles/global.scss";

function Calculadora() {
  const TIPO_VICIO = "Jogos de Aposta";

  const PRECO_VIAGEM = 900;
  const PRECO_CURSO = 500;

  const destinoViagem = "Campos do Jordão";
  const tipoCurso = "curso de lógica de programação";

  const mensagensInspiradoras = [
    "Não deixe esse vício matar seus sonhos.",
    "Você é mais forte que o vício!",
    "Você merece uma vida livre de dependências.",
    "A vida é mais leve sem vícios.",
    "Seja o protagonista da sua vida, sem vícios!"
  ];

  const [gastoDiario, setGastoDiario] = useState("");
  const [horasDiarias, setHorasDiarias] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [resultado, setResultado] = useState(null);

  function calcularImpacto() {
    if (!gastoDiario || !horasDiarias || !dataInicio) {
      alert("Preencha todos os campos!");
      return;
    }

    const gasto = Number(gastoDiario);
    const horas = Number(horasDiarias);
    const inicio = new Date(dataInicio);
    const hoje = new Date();

    if (inicio > hoje) {
      alert("A data não pode ser no futuro!");
      return;
    }

    const dias = Math.max(1, Math.floor((hoje - inicio) / (1000 * 60 * 60 * 24)));

    const gastoTotal = gasto * dias;
    const rendaPerdida = gastoTotal * 0.3;
    const horasTotais = horas * dias;

    const viagensPossiveis = Math.floor(gastoTotal / PRECO_VIAGEM);
    const cursosPossiveis = Math.floor(gastoTotal / PRECO_CURSO);

    const mensagem =
      mensagensInspiradoras[Math.floor(Math.random() * mensagensInspiradoras.length)];

    setResultado({
      dias,
      gastoTotal,
      rendaPerdida,
      horasTotais: horasTotais.toFixed(1),
      viagensPossiveis,
      cursosPossiveis,
      mensagem,
      destinoViagem,
      tipoCurso,
    });
  }

  function fecharModal() {
    setResultado(null);
  }

  return (
    <div className="calculadora-container">
      <h2>Calculadora de Impacto em {TIPO_VICIO}</h2>

      <div className="form-group">
        <label>Gasto diário (R$)</label>
        <input
          type="number"
          value={gastoDiario}
          onChange={(e) => setGastoDiario(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Horas por dia no vício</label>
        <input
          type="number"
          value={horasDiarias}
          onChange={(e) => setHorasDiarias(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Quando começou?</label>
        <input
          type="date"
          value={dataInicio}
          onChange={(e) => setDataInicio(e.target.value)}
        />
      </div>

      <button className="btn-calcular" onClick={calcularImpacto}>
        Calcular Impacto
      </button>

      {resultado && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={fecharModal}>✖</button>

            <h3>Resultado do Impacto</h3>

            <p>Você está nesse vício há {resultado.dias} dias.</p>
            <hr />

            <h4>💸 Financeiro</h4>
            <p>Total gasto: <strong>R$ {resultado.gastoTotal.toFixed(2)}</strong></p>
            <p>Renda perdida (estimativa): R$ {resultado.rendaPerdida.toFixed(2)}</p>

            <h4>⏳ Tempo</h4>
            <p>Tempo dedicado ao vício: {resultado.horasTotais} horas</p>

            <h4>🌎 O que você poderia ter feito?</h4>
            <p>{resultado.viagensPossiveis} viagens para <strong>{resultado.destinoViagem}</strong></p>
            <p>{resultado.cursosPossiveis} {resultado.tipoCurso}(s)</p>

            <hr />

            <h4>✨ Mensagem para você:</h4>
            <p><em>{resultado.mensagem}</em></p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calculadora;
