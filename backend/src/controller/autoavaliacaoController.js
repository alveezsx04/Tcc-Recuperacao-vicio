import { Router } from 'express';
import { SalvarAvaliacao, ListarHistoricoAvaliacoes } from '../repository/autoavaliacaoRepository.js';
import { getAuthentication } from '../utils/jwt.js';

const endpoints = Router();
const autenticador = getAuthentication();

endpoints.post('/autoavaliacao', autenticador, async (req, resp) => {
  try {
    const idUsuario = req.user.id_usuario;
    const { respostas, pontuacaoTotal } = req.body;

    if (!respostas || respostas.length !== 5 || !pontuacaoTotal) {
      return resp.status(400).send({ erro: "Dados da avaliação incompletos." });
    }

    const novoRegistro = await SalvarAvaliacao(idUsuario, respostas, pontuacaoTotal);
    
    resp.status(201).send(novoRegistro);

  } catch (err) {
    console.error(err);
    resp.status(500).send({ erro: "Ocorreu um erro ao salvar a avaliação." });
  }
});

endpoints.get('/autoavaliacao/historico', autenticador, async (req, resp) => {
  try {
    const idUsuario = req.user.id_usuario;
    const historico = await ListarHistoricoAvaliacoes(idUsuario);
    resp.send(historico);

  } catch (err) {
    console.error(err);
    resp.status(500).send({ erro: "Ocorreu um erro ao buscar o histórico." });
  }
});

export default endpoints;