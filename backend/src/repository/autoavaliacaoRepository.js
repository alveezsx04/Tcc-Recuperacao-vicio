import { conection } from "./conection.js";

export async function SalvarAvaliacao(idUsuario, respostas, pontuacaoTotal) {
  const comando = `
    INSERT INTO questionario (
      id_usuario, 
      pergunta1, 
      pergunta2, 
      pergunta3, 
      pergunta4, 
      pergunta5, 
      pontuacao_total, 
      criado_em
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
  `;
  
  const [resposta] = await conection.query(comando, [
    idUsuario,
    respostas[0],
    respostas[1],
    respostas[2],
    respostas[3],
    respostas[4],
    pontuacaoTotal
  ]);

  return { 
    id: resposta.insertId,
    pontuacao_total: pontuacaoTotal,
    criado_em: new Date()
  };
}

export async function ListarHistoricoAvaliacoes(idUsuario) {
  const comando = `
    SELECT 
      id,
      pontuacao_total,
      criado_em
    FROM questionario
    WHERE id_usuario = ?
    ORDER BY criado_em ASC
  `;
  
  const [registros] = await conection.query(comando, [idUsuario]);
  return registros;
}