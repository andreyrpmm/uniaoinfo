
Backend de exemplo (Node.js + Express)
------------------------------------
Como usar (local):
1. Instale Node.js (v14+).
2. No diretório, rode: npm install
3. Inicie o servidor: npm start
4. O servidor vai rodar em http://localhost:3000 e aceitará POST /contact com JSON: {name,email,message}

Para produção, configure um provedor (Heroku, Render, Vercel - functions, ou um VPS) e um serviço de email.
