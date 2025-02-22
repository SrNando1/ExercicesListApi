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

let db;

// Conectar ao banco de dados apenas uma vez
async function connectDB() {
  try {
    await client.connect();
    db = client.db("fitness_app"); // Certifique-se de que este é o nome correto do banco
    console.log("Conectado ao MongoDB Atlas");
  } catch (err) {
    console.error("Erro ao conectar ao MongoDB:", err);
  }
}

// Rota para obter os exercícios
app.get("/exercises", async (req, res) => {
  try {
    const collection = db.collection("fitness_app"); // Verifique o nome correto da coleção
    const exercises = await collection.find({}).toArray();
    res.json(exercises);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Iniciar o servidor e conectar ao banco
app.listen(PORT, async () => {
  await connectDB();
  console.log(`API rodando na porta ${PORT}`);
});
