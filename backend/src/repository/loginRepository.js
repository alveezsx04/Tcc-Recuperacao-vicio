import { conection } from "./conection.js";

export async function CriarConta(novologin) {
    const comando = `insert into login (id_usuario, email, senha, role, criacao)
    values (?, ?, MD5(?), ?, ?)`
    
        let [info] = await conection.query(comando, [
        novologin.id_usuario,
        novologin.email,
        novologin.senha,
        novologin.role,
        new Date()
    ]);
        return info.insertId;
}

export async function VerificarCredenciais(email, senha) {
    const comando = `select l.id_login, l.id_usuario, l.email, l.role, u.nome
    from login as l
    inner join usuario as u on l.id_usuario = u.id_usuario
    where l.email =  ? and l.senha = MD5(?)`;

    let [registros] = await conection.query(comando, [email, senha]);
    return registros[0];
}

export async function VerificarEmailExistente(email) {
    const comando = `select email from login where email = ?`;
    
    const [registros] = await conection.query(comando, [email]);
    
    return registros.length > 0; 
  }