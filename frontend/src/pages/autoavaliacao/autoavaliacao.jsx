import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./autoavaliacao.scss";
import "../../styles/global.scss";

const questions = [
  {
    id: 1,
    question: "Com que frequência você sente que perdeu o controle sobre seu comportamento viciante?",
    options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"],
  },
  {
    id: 2,
    question: "Você já tentou parar ou reduzir esse comportamento sem sucesso?",
    options: [
      "Nunca tentei parar",
      "Tentei uma vez",
      "Tentei algumas vezes",
      "Tentei muitas vezes",
      "Tento constantemente",
    ],
  },
  {
    id: 3,
    question: "Esse comportamento interfere nas suas relações pessoais ou profissionais?",
    options: [
      "Não interfere",
      "Interfere pouco",
      "Interfere moderadamente",
      "Interfere bastante",
      "Interfere severamente",
    ],
  },
  {
    id: 4,
    question: "Você sente ansiedade ou irritabilidade quando não pode praticar esse comportamento?",
    options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"],
  },
  {
    id: 5,
    question: "Você gasta mais tempo ou dinheiro com esse comportamento do que gostaria?",
    options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"],
  },
];

function Autoavaliacao() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);

  const handleAnswer = (value) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setFinished(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const restart = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setFinished(false);
  };


  const calcScore = () => {
    return Object.values(answers).reduce((acc, index) => {

        return acc + (index + 1); 
    }, 0);
  }

  const getResultMessage = () => {
    const score = calcScore();
    if (score <= 7) return "Você demonstra baixo nível de comportamento viciante.";
    if (score <= 13) return "Atenção: há sinais leves de dependência.";
    if (score <= 19) return "Cuidado: há indícios moderados de vício.";
    return "Alerta! Alto risco de dependência. Procure ajuda profissional.";
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (finished) {
    return (
      <div className="autoavaliacao-container">
        <div className="card-pergunta resultado">
            <h1>Resultado da Autoavaliação</h1>
            <p className="resultado-texto">{getResultMessage()}</p>
            <p className="resultado-pontuacao">Sua pontuação: {calcScore()} de 25</p>
            
            <div className="botoes">
                <button className="btn branco" onClick={restart}>
                    Refazer Teste
                </button>
                <button className="btn azul" onClick={() => navigate("/")}>
                    Voltar ao Início
                </button>
            </div>
        </div>
      </div>
    );
  }

  const current = questions[currentQuestion];

  return (
    <div className="autoavaliacao-container">
      <div className="voltar" onClick={() => navigate("/")}>
        ← Voltar ao início
      </div>

      <h1>Teste de Autoavaliação</h1>
      <p className="descricao">
        Responda honestamente às perguntas para uma avaliação inicial do seu comportamento
      </p>
      <div className="progresso">
        <div className="texto">
          <span>Pergunta {currentQuestion + 1} de {questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="barra">
          <div
            className="preenchido"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="card-pergunta">
        <h3>{current.question}</h3>
        <div className="opcoes">
          {current.options.map((opt, index) => (
            <label key={index} className="opcao">
              <input
                type="radio"
                name={`q${currentQuestion}`}
                checked={answers[currentQuestion] === index}
                onChange={() => handleAnswer(index)}
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      </div>


      <div className="botoes">
        <button
          className="btn branco"
          onClick={prevQuestion}
          disabled={currentQuestion === 0}
        >
          Anterior
        </button>
        <button
          className="btn azul"
          onClick={nextQuestion}
          disabled={answers[currentQuestion] === undefined}
        >
          {currentQuestion === questions.length - 1 ? "Finalizar" : "Próxima"}
        </button>
      </div>
    </div>
  );
}

export default Autoavaliacao;