const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Permitir requisições de qualquer origem (CORS)
app.use(cors());

// Interpretar JSON e formulários
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Servir arquivos estáticos da pasta 'site'
app.use(express.static('site'));

// Rota para receber formulário
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  console.log(`Contato recebido: ${name} | ${email} | ${message}`);

  // Resposta pro navegador
  res.json({ ok: true, message: 'Mensagem recebida. Responderemos em até 48h.' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
