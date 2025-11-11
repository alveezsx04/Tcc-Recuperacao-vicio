import express from 'express';
import cors from 'cors';
import { adicionarRotas } from '../rotas.js';

const api = express();
api.use(express.json());

api.use(cors({
    origin: 'http://localhost:5173',
    allowedHeaders: [                
        'Content-Type', 
        'Authorization', 
        'x-access-token'
    ]
}));

adicionarRotas(api);

api.listen(5000, () => console.log(' API subiu com sucesso na porta 5000!'));