const express = require('express');
const cors = require('cors');
const app = express();

// Configurar middleware
app.use(express.json());
app.use(cors());

// Definir a porta correta para o Azure
const PORT = process.env.PORT || 3000;

// Rota principal para teste
app.get('/', (req, res) => {
    res.send('API está funcionando corretamente no Azure!');
});

// Tratamento de erro para rotas inexistentes
app.use((req, res, next) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

// Tratamento de erro genérico
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Erro interno do servidor' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
