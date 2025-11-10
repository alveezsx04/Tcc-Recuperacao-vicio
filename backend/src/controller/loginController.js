import { VerificarCredenciais, CriarConta, VerificarEmailExistente } from '../repository/loginRepository.js';
import { InserirUsuario } from '../repository/usuarioRepository.js';
import { generateToken } from '../utils/jwt.js';

import { Router } from "express";
const endpoints = Router();

endpoints.post('/cadastro', async (req, resp) => {

  console.log("===================================");
    console.log("✅ REQUISIÇÃO /CADASTRO RECEBIDA!");
    console.log("DADOS VINDOS DO FRONTEND:", req.body);
    console.log("===================================");
  try {
    let dados = req.body;

    if (!dados.nome || !dados.email || !dados.senha) {
      return resp.status(400).send({ erro: "Nome, email e senha são obrigatórios." });
    }

    const emailJaExiste = await VerificarEmailExistente(dados.email);
    if (emailJaExiste) {
      return resp.status(400).send({ erro: "Este email já está cadastrado." });
    }

    const idUsuarioCriado = await InserirUsuario({
      nome: dados.nome,
      sobrenome: dados.sobrenome,
      telefone: dados.telefone,
      dt_nascimento: dados.dt_nascimento
    });

    const idLoginCriado = await CriarConta({
      id_usuario: idUsuarioCriado,
      email: dados.email,
      senha: dados.senha,
      role: 'user'
    });

    resp.status(201).send({
      idUsuario: idUsuarioCriado,
      idLogin: idLoginCriado
    });
    
  } catch (error) {
    console.error(error);
    resp.status(500).send({ erro: "Erro ao cadastrar usuário." });
  }
});

endpoints.post('/login', async (req, resp) => {
    try {
        let email = req.body.email;
        let senha = req.body.senha;

        let credenciais = await VerificarCredenciais(email, senha);

        if (!credenciais) {
            resp.status(401).send({
                erro: 'Credenciais inválidas.'
            });
        }
        else {
            resp.send({
                token: generateToken(credenciais)
            });
        }
    } catch (err) {
        console.error("Erro no login:", err);
        resp.status(500).send({ erro: "Ocorreu um erro interno." });
    }
});

export default endpoints;