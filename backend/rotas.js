import usuarioController from './src/controller/usuarioController.js'
import LoginController from './src/controller/loginController.js'


export function adicionarRotas (api) {
    api.use(usuarioController)
    api.use(LoginController)
}