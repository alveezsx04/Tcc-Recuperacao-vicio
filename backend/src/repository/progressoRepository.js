import { conection } from "./conection.js";

function getHojeFormatado() {
    const hoje = new Date();
    return hoje.toISOString().split('T')[0];
}
function getOntemFormatado() {
    const ontem = new Date();
    ontem.setDate(ontem.getDate() - 1);
    return ontem.toISOString().split('T')[0];
}
function formatarDataMySQL(data) {
    if (!data) return null;
    return new Date(data).toISOString().split('T')[0];
}

function calcularConquistas(dias_consecutivos) {
    const todosMarcos = [
        { dias: 7, titulo: "Uma Semana", descricao: "Parabéns por se manter firme por 7 dias!" },
        { dias: 15, titulo: "15 Dias", descricao: "Duas semanas de progresso contínuo!" },
        { dias: 30, titulo: "1 Mês", descricao: "Você manteve o foco por um mês inteiro!" },
        { dias: 90, titulo: "3 Meses", descricao: "Um marco incrível! Continue assim." },
        { dias: 180, titulo: "6 Meses", descricao: "Meio ano de dedicação à sua recuperação." },
        { dias: 365, titulo: "1 Ano", descricao: "Você completou um ano! Uma conquista monumental." }
    ];

    return todosMarcos.map(marco => {
        const conquistado = dias_consecutivos >= marco.dias;
        const diasRestantes = Math.max(0, marco.dias - dias_consecutivos);
        
        return {
            ...marco,
            conquistado: conquistado,
            dias_restantes: diasRestantes,
        };
    });
}



export async function buscarOuCriarProgresso(id_usuario) {
    const comandoBuscar = `
        select * from progresso 
        where usuario_id = ?
    `;
    const [registros] = await conection.query(comandoBuscar, [id_usuario]);

    let progresso;

    if (registros.length > 0) {
        progresso = registros[0];
    } else {

        const comandoCriar = `
            insert into progresso (usuario_id, data_registro, dias_totais, melhor_sequencia, dias_consecutivos, ultimo_dia_marcado)
            values (?, ?, 0, 0, 0, NULL)
        `;
        const [info] = await conection.query(comandoCriar, [id_usuario, new Date()]);
        
        progresso = {
            id: info.insertId,
            usuario_id: id_usuario,
            dias_totais: 0,
            melhor_sequencia: 0,
            dias_consecutivos: 0,
            ultimo_dia_marcado: null
        };
    }


    const conquistas = calcularConquistas(progresso.dias_consecutivos);


    return {
        ...progresso,
        conquistas: conquistas 
    };
}


export async function marcarDia(id_usuario) {
    const progresso = await buscarOuCriarProgresso(id_usuario);

    const hojeStr = getHojeFormatado();
    const ultimoDiaStr = formatarDataMySQL(progresso.ultimo_dia_marcado);

    if (ultimoDiaStr === hojeStr) {
        throw new Error("O dia de hoje já foi marcado.");
    }

    const ontemStr = getOntemFormatado();

    let novosDiasConsecutivos;
    let novaMelhorSequencia;
    let novosDiasTotais = progresso.dias_totais + 1;

    if (!ultimoDiaStr) {
        novosDiasConsecutivos = 1;
        novaMelhorSequencia = Math.max(progresso.melhor_sequencia, 1);
    }
    else if (ultimoDiaStr === ontemStr) {
        novosDiasConsecutivos = progresso.dias_consecutivos + 1;
        novaMelhorSequencia = Math.max(progresso.melhor_sequencia, novosDiasConsecutivos);
    }
    else {
        novosDiasConsecutivos = 1;
        novaMelhorSequencia = progresso.melhor_sequencia;
    }

    const comandoUpdate = `
        update progresso
        set dias_totais = ?, 
            melhor_sequencia = ?, 
            dias_consecutivos = ?, 
            ultimo_dia_marcado = ?
        where id = ?
    `;
    await conection.query(comandoUpdate, [
        novosDiasTotais,
        novaMelhorSequencia,
        novosDiasConsecutivos,
        hojeStr,
        progresso.id
    ]);

    const comandoInsertDia = `
        insert into dias_progresso (progresso_id, data_dia)
        values (?, ?)
    `;
    await conection.query(comandoInsertDia, [progresso.id, hojeStr]);

    const novasConquistas = calcularConquistas(novosDiasConsecutivos);


    return {
        dias_totais: novosDiasTotais,
        melhor_sequencia: novaMelhorSequencia,
        dias_consecutivos: novosDiasConsecutivos,
        ultimo_dia_marcado: hojeStr,
        conquistas: novasConquistas
    };
}


export async function buscarHistorico(progresso_id) {
    const comando = `
        select data_dia 
        from dias_progresso 
        where progresso_id = ?
    `;
    const [dias] = await conection.query(comando, [progresso_id]);
    
    return dias.map(d => d.data_dia);
}