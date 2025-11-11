import { conection } from "./conection.js";

export async function ListarMensagensMotivacionais() {
    const comando = `
        select mensagem from mensagem_motivacional
        where ativo = true
        order by rand()
    `;
    const [registros] = await conection.query(comando);
    return registros.map(r => r.mensagem);
}

export async function SalvarImpacto(idUsuario, impacto, gastoTotalCalculado) {
    const comando = `
        insert into impacto (usuario_id, gasto_diario, horas_diarias, data_inicio_vicio, gasto_total_calculado, calculado_em)
        values (?, ?, ?, ?, ?, now())
    `;

    const [resposta] = await conection.query(comando, [
        idUsuario,
        impacto.gasto_diario,
        impacto.horas_diarias,
        impacto.data_inicio_vicio,
        gastoTotalCalculado
    ]);

    impacto.id = resposta.insertId;
    impacto.calculado_em = new Date();
    impacto.gasto_total_calculado = gastoTotalCalculado;
    return impacto;
}

export async function ListarImpactoPorUsuario(idUsuario) {
    const comando = `
        select
            id,
            gasto_diario,
            horas_diarias,
            data_inicio_vicio,
            gasto_total_calculado,
            calculado_em
            -- CORREÇÃO: Tinha uma vírgula sobrando (",") aqui
        from impacto
        where usuario_id = ?
        order by calculado_em asc
        -- CORREÇÃO: Estava "calculado em" (separado)
    `;

    const [registros] = await conection.query(comando, [idUsuario]);
    return registros;
}

export async function ListarMetasPorUsuario(idUsuario) {
    const comando = `
        select 
            id_meta,
            nome_meta,
            valor_meta
            -- CORREÇÃO: Tinha uma vírgula sobrando (",") aqui
        from metas_usuario
        where id_usuario = ? and ativo = true
        order by valor_meta asc
    `;

    const [registros] = await conection.query(comando, [idUsuario]);
    return registros;
}

export async function SalvarMeta(idUsuario, meta) {
    const comando = `
        insert into metas_usuario (id_usuario, nome_meta, valor_meta)
        values (?, ?, ?)
    `;

    const [resposta] = await conection.query(comando, [
        idUsuario,
        meta.nome_meta,
        meta.valor_meta
    ]);

    meta.id_meta = resposta.insertId;
    return meta;
}