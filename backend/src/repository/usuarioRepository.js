import { conection } from "./conection.js"

export async function InserirUsuario(novoUsuario) {
    const comando = `insert into usuario (nome, sobrenome, telefone, dt_nascimento)
    values(?, ?, ?, ?)`

    let [info] = await conection.query(comando, [
        novoUsuario.nome,
        novoUsuario.sobrenome,
        novoUsuario.telefone,
        novoUsuario.dt_nascimento,
    ]);
        return info.insertId;
}

export async function ListarUsuario () {
    const comando = `select * from usuario`

    const [registros] = await conection.query(comando)

    return registros;
}

export async function ConsultarUsuario (id) {
    const comando = `select * from usuario
    where id = ?`

    let [registros] = await conection.query(comando, [id])
    return registros[0];
}

export async function AlterarUsuario (id, novosDados) {
    const comando  = `update usuario
    set id = ?,
    nome = ?,
    sobrenome  = ?,
    telefone = ?,
    dt_nascimento = ?,
    where id_usuario = ?
    `;

    let [info] = await conection.query(comando [
        novosDados.id,
        novosDados.nome,
        novosDados.sobrenome,
        novosDados.telefone,
        novosDados.dt_nascimento,
        id
    ]);
} 


export async function DeletarUsuario(id) {
    const comando = `delete from usuario
    where id_usuario = ?`

    let info = await conection.query(comando [id]);
}
