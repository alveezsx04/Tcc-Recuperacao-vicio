
🎰 Breakloop: Recupere o Controle
Um Trabalho de Conclusão de Curso (TCC) focado em fornecer ferramentas digitais e apoio para pessoas que buscam superar o vício em apostas.

Este projeto oferece um ambiente seguro e anônimo onde o usuário pode visualizar o impacto real do vício, acompanhar seu progresso de sobriedade e encontrar recursos confiáveis para sua jornada de recuperação.


✨ Funcionalidades Principais
A plataforma é composta por um ecossistema de ferramentas interconectadas:

🔐 Sistema de Autenticação: Contas de usuário seguras com login e cadastro (utilizando JWT para autenticação).

📈 Acompanhamento de Progresso: Um painel central onde o usuário "marca o dia" como limpo, rastreando visualmente sua sequência atual, a maior sequência de dias e o total de dias em recuperação.

🏆 Metas e Conquistas: Desbloqueio de "conquistas" (badges) por marcos de sobriedade (ex: 7 dias, 30 dias, 1 ano) para gamificar e motivar a jornada.

📊 Calculadora de Impacto: Uma ferramenta poderosa onde o usuário insere seu gasto diário e a data de início do vício. A calculadora mostra:

O total de dinheiro gasto.

Um gráfico de histórico de gastos.

O que o usuário poderia ter conquistado com esse valor.

🎯 Metas Financeiras (Sonhos): O usuário pode cadastrar seus próprios sonhos (ex: "Viagem", "PC Gamer") e a calculadora mostra quantas dessas metas poderiam ter sido alcançadas, tornando o impacto mais pessoal.

🧠 Autoavaliação Diária: Um questionário diário (com notas de 1 a 5) para o usuário registrar seu bem-estar mental e controle de impulsos. Os resultados são exibidos em um gráfico de evolução ao longo do tempo.

📚 Biblioteca de Apoio: Uma página de recursos verificados com links diretos para canais de YouTube, perfis de Instagram e sites de organizações (como Drauzio Varella, Amor Exigente, etc.) que oferecem ajuda profissional e motivação.

🛠️ Tecnologias Utilizadas
Este projeto é uma aplicação web completa (full-stack) dividida em duas partes:

Frontend
React.js 

Vite

SASS/SCSS

React Router DOM (Gerenciamento de rotas)

Axios (Requisições à API)

Chart.js (react-chartjs-2) (Gráficos)

Backend (Servidor)
Node.js

Express.js (Gerenciamento da API e rotas)

MySQL (Banco de dados)

JWT (JSON Web Token) (Autenticação e segurança de rotas)

CORS

🚀 Como Executar o Projeto
Para rodar este projeto localmente, você precisará ter o Node.js e um servidor MySQL (como o XAMPP ou WAMP) instalados.

1. Configurar o Backend (Servidor)
Bash

# 1. Navegue até a pasta 'backend' do projeto
cd backend

# 2. Instale as dependências
npm install

# 3. Configure o Banco de Dados
#    - Inicie seu servidor MySQL.
#    - Crie um banco de dados com o nome 'tcc'.
#    - Execute o script SQL (localizado no repositório) para criar todas as tabelas.

# 4. Inicie o servidor
npm run dev

# O servidor estará rodando em http://localhost:5000
2. Configurar o Frontend (Cliente)
Bash

# 1. Abra um NOVO terminal
# 2. Navegue até a pasta 'frontend' do projeto
cd frontend

# 3. Instale as dependências
npm install

# 4. Inicie a aplicação React
npm run dev

# A aplicação estará disponível em http://localhost:5173
👥 Equipe de Desenvolvimento
Este projeto foi desenvolvido com dedicação por:

Lucas Gabriel dos Santos Alves

Luan Riquelme

Kauã Miguel

Kauã Alcides

Pedro Lima

João Vitor Vicente