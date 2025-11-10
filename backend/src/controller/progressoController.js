import { buscarOuCriarProgresso, marcarDia, buscarHistorico } from "../repository/progressoRepository.js";
import { getAuthentication } from '../utils/jwt.js';
import { Router } from 'express';

const endpoints = Router();
const autenticador = getAuthentication();

endpoints.get('/progresso', autenticador, async (req, resp) => {
    try {
        const id_usuario = req.user.id_usuario;

        const progresso = await buscarOuCriarProgresso(id_usuario);

        resp.send(progresso);
    } catch (err) {
        console.error("Erro ao buscar progresso:", err);
        resp.status(500).send({ erro: 'Ocorreu um erro ao buscar seus dados'});
    }
});

endpoints.get('/progresso/historico', autenticador, async (req, resp) => {
    try {
        const id_usuario = req.user.id_usuario;


        const progresso = await buscarOuCriarProgresso(id_usuario);
        

        const historico = await buscarHistorico(progresso.id);

        resp.send(historico);
    } catch (err) {
        console.error("Erro ao buscar histórico:", err);
        resp.status(500).send({ erro: 'Ocorreu um erro ao buscar seu histórico'});
    }
});

endpoints.post('/progresso/marcar', autenticador, async (req, resp) => {
    try {
        const id_usuario = req.user.id_usuario;


        const progressoAtualizado = await marcarDia(id_usuario);

        resp.send(progressoAtualizado);
    } catch (err) {
        if (err.message === "O dia de hoje já foi marcado.") {
            return resp.status(400).send({ erro: err.message});
        }

        console.error("Erro ao marcar dia:", err);
        resp.status(500).send({ erro: 'Ocorreu um erro ao marcar o dia.'});
    }
});

export default endpoints;