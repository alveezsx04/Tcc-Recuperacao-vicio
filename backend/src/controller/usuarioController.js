import { ListarUsuario, ConsultarUsuario, AlterarUsuario, DeletarUsuario } from '../repository/usuarioRepository.js';
import { getAuthentication } from '../utils/jwt.js';

const autenticador = getAuthentication(); 

import { Router } from 'express';
const endpoints = Router();

endpoints.get('/usuario', autenticador, async (req, resp) => {
    let registros = await ListarUsuario();
    resp.send(registros);
});


endpoints.get('/usuario/:id', autenticador, async (req, resp) => {
    let id = Number(req.params.id);
    let registros = await ConsultarUsuario(id);
    resp.send(registros);
});


endpoints.put('/usuario/perfil', autenticador, async (req, resp) => {
    try {

        const idUsuarioLogado = req.user.id_usuario;
        const novosDados = req.body;
        
        const linhasAfetadas = await AlterarUsuario(idUsuarioLogado, novosDados);

        if (linhasAfetadas === 0) {
            return resp.status(404).send({ erro: "Usuário não encontrado." });
        }
        
        resp.send({ mensagem: "Perfil atualizado com sucesso!" });

    } catch (err) {
        console.error("Erro ao alterar perfil:", err);
        resp.status(500).send({ erro: "Ocorreu um erro interno." });
    }
});


endpoints.delete('/usuario', autenticador, async (req, resp) => {
    try {
        const idUsuarioLogado = req.user.id_usuario;
        await DeletarUsuario(idUsuarioLogado);
        resp.send({ mensagem: "Conta deletada com sucesso." });
    } catch (err) {
        resp.status(500).send({ erro: "Erro ao deletar conta." });
    }
});


export default endpoints;