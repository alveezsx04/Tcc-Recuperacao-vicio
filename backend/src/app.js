import express from 'express';
import cors from 'cors';
import { adicionarRotas } from '../rotas.js';
import loginController from './controller/loginController.js';
import usuarioController from './controller/usuarioController.js';
import progressoController from './controller/progressoController.js'


const api = express();
api.use(express.json());
api.use(cors());
api.use(loginController); 
api.use(usuarioController);
api.use(progressoController)


adicionarRotas(api);

api.listen(5000, () => console.log(' API subiu com sucesso na porta 5000!'));
