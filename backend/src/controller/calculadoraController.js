import { Router } from 'express';
import { 
  SalvarImpacto, 
  ListarImpactoPorUsuario, 
  ListarMensagensMotivacionais, 
  ListarMetasPorUsuario, 
  SalvarMeta 
} from '../repository/calculadoraRepository.js';

import { getAuthentication } from '../utils/jwt.js';

const endpoints = Router();
const autenticador = getAuthentication();

endpoints.get('/calculadora/mensagens', autenticador, async (req, resp) => {
    try {
        const mensagens = await ListarMensagensMotivacionais();
        resp.send(mensagens);
    } catch (err) {
        console.error(err);
        resp.status(500).send({ erro: "Ocorreu um erro ao listar as mensagens. "});
    }
});

endpoints.get('/calculadora/impacto', autenticador, async (req, resp) => {
  try {
    const idUsuario = req.user.id_usuario;

    const historico = await ListarImpactoPorUsuario(idUsuario);
    resp.send(historico);
  } catch (err) {
    console.error(err);
    resp.status(500).send({ erro: "Ocorreu um erro ao buscar o histórico." });
  }
});

endpoints.get('/calculadora/metas', autenticador, async (req, resp) => {
  try {
    const idUsuario = req.user.id_usuario;

    const metas = await ListarMetasPorUsuario(idUsuario);
    resp.send(metas);
  } catch (err) {
    console.error(err);
    resp.status(500).send({ erro: "Ocorreu um erro ao buscar as metas." });
  }
});

endpoints.post('/calculadora/impacto', autenticador, async (req, resp) => {
    try {
        const idUsuario = req.user.id_usuario;
        const impacto = req.body;

        const inicio = new Date(impacto.data_inicio_vicio);
        const hoje = new Date();
        const dias = Math.max(1, Math.floor((hoje - inicio) / (1000 * 60 * 60 * 24)));
        const gastoTotalCalculado = Number(impacto.gasto_diario) * dias;

        const novoImpacto = await SalvarImpacto(idUsuario, impacto, gastoTotalCalculado);
        resp.status(201).send(novoImpacto);
    } catch (err) {
        console.error(err);
        resp.status(500).send({ erro: "Ocorreu um erro ao salvar o impacto. "})
    }
});

endpoints.post('/calculadora/metas', autenticador, async (req, resp) => {
  try {
    const idUsuario = req.user.id_usuario;
    
    const meta = req.body;

    const novaMeta = await SalvarMeta(idUsuario, meta);
    resp.status(201).send(novaMeta);

  } catch (err) {
    console.error(err);
    resp.status(500).send({ erro: "Ocorreu um erro ao salvar a meta." });
  }
});

export default endpoints;