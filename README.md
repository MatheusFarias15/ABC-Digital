\# ABC-Digital

Este é um projeto full-stack que combina um backend em Flask (Python) com um frontend em React \+ TypeScript (Vite), utilizando componentes da biblioteca shadcn/ui.

\--------------------------------------------------

🚀 COMO EXECUTAR O PROJETO PASSO A PASSO

Siga as instruções abaixo para configurar e rodar o ambiente de desenvolvimento na sua máquina local.

📋 PRÉ-REQUISITOS

Antes de começar, certifique-se de ter instalado no seu computador:

\- Python 3.8+  
\- Node.js (versão 18 ou superior recomendada)  
\- Um gestor de pacotes como npm ou bun

\--------------------------------------------------

1\. ⚙️ CONFIGURAÇÃO DO BACKEND (FLASK)

O backend utiliza o Flask com uma base de dados SQLite (abc\_digital.db).

PASSOS:

1\. Abra o terminal na raiz do projeto.

2\. Crie um ambiente virtual para isolar as dependências do Python:

python \-m venv venv

3\. Ative o ambiente virtual:

Windows (Prompt de Comando):

venv\\Scripts\\activate

Windows (PowerShell):

.\\venv\\Scripts\\activate

Linux / macOS:

source venv/bin/activate

4\. Instale as dependências do Python requeridas:

pip install \-r requirements.txt

5\. Execute o servidor backend:

python app.py

O backend ficará ativo em:

http://127.0.0.1:5000

Nota:  
Ao iniciar, o script irá criar e popular automaticamente a base de dados SQLite localmente.

\--------------------------------------------------

2\. 💻 CONFIGURAÇÃO DO FRONTEND (VITE \+ REACT)

O frontend foi desenvolvido com React, TypeScript e Tailwind CSS.

PASSOS:

1\. Abra uma nova janela ou aba no terminal  
(mantenha o terminal do backend em execução).

2\. Garanta que está na raiz do projeto  
(onde se encontra o ficheiro package.json).

3\. Instale as dependências do Node.js:

npm install

Caso utilize o Bun, pode executar:

bun install

4\. Inicie o servidor de desenvolvimento do frontend:

npm run dev

5\. Aceda à aplicação:

Abra o navegador e aceda ao endereço indicado no terminal, normalmente:

http://localhost:5173

ou

http://localhost:8080

\--------------------------------------------------

🛠️ SCRIPTS DISPONÍVEIS (FRONTEND)

No diretório do frontend, pode executar os seguintes comandos principais:

npm run dev  
\- Roda o servidor de desenvolvimento do Vite

npm run build  
\- Cria a versão de produção otimizada na pasta dist

npm run lint  
\- Executa a verificação estática do código com o ESLint

npm run test  
\- Executa os testes unitários uma única vez utilizando o Vitest

npm run test:watch  
\- Executa os testes em modo contínuo (watch mode)

\--------------------------------------------------

📦 TECNOLOGIAS UTILIZADAS

BACKEND  
\- Flask  
\- SQLite  
\- Python

FRONTEND  
\- React  
\- TypeScript  
\- Vite  
\- Tailwind CSS  
\- shadcn/ui

\--------------------------------------------------