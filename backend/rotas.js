import usuarioController from './src/controller/usuarioController.js';
import loginController from './src/controller/loginController.js';
import progressoController from './src/controller/progressoController.js';
import calculadoraController from './src/controller/calculadoraController.js';
import autoavaliacaoController from './src/controller/autoavaliacaoController.js';

export function adicionarRotas(api) {
    api.use(loginController);
    api.use(usuarioController);
    api.use(progressoController);
    api.use(calculadoraController);
    api.use(autoavaliacaoController);
}