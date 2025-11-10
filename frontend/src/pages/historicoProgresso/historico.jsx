import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';
import api from '../../services/api';
import { Home } from 'lucide-react';

import 'react-calendar-heatmap/dist/styles.css';
import './historico.scss';
import "../../styles/global.scss";

function Historico() {
    const [valores, setValores] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const hoje = new Date();
    const seisMesesAtras = new Date();
    seisMesesAtras.setMonth(hoje.getMonth() - 6);

    useEffect(() => {
        async function carregarHistorico() {
            try {
                const response = await api.get('/progresso/historico');
                
                const dataFormatada = response.data.map(dataStr => ({
                    date: dataStr,
                    count: 1
                }));
                
                setValores(dataFormatada);
                setLoading(false);
            } catch (err) {
                console.error("Erro ao buscar histórico", err);
                setLoading(false);
            }
        }
        carregarHistorico();
    }, []);

    if (loading) {
        return <main className="historico-container"><h1>Carregando histórico...</h1></main>;
    }

    return (
        <>
            <main className="historico-container">
                <button onClick={() => navigate('/progresso')} className="btn-voltar">
                    &larr; Voltar ao Progresso
                </button>
                <h1>Histórico Detalhado</h1>
                <p className="subtitulo">Cada quadrado azul representa um dia que você marcou como "limpo".</p>
                
                <div className="heatmap-wrapper">
                    <CalendarHeatmap
                        startDate={seisMesesAtras}
                        endDate={hoje}
                        values={valores}
                        
                        classForValue={(value) => {
                            if (!value) {
                                return 'color-empty';
                            }
                            return `color-filled`;
                        }}
                        
                        tooltipDataAttrs={value => {
                            if (!value || !value.date) {
                                return { 'data-tip': 'Nenhum dado', 'data-for': 'heatmap-tooltip' };
                            }
                            const dataFormatada = new Date(value.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
                            return {
                                'data-tip': `Dia ${dataFormatada}: Sucesso!`,
                                'data-for': 'heatmap-tooltip'
                            };
                        }}
                    />
                </div>


                <div className="heatmap-legend">
                    <span className="legend-text">Menos</span>
                    <div className="legend-square color-empty"></div>
                    <div className="legend-square color-filled"></div>
                    <span className="legend-text">Mais</span>
                </div>

            </main>

            <ReactTooltip id="heatmap-tooltip" className="custom-tooltip" />
        </>
    );
}

export default Historico;