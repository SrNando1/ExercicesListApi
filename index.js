const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;

// URI de conexão do MongoDB (substitua com a sua)
const uri = "mongodb+srv://fernandosav135:Fernando%401@cluster0.hukyw.mongodb.net/fitness_app?retryWrites=true&w=majority";
const client = new MongoClient(uri);
let db;

// Configurar middleware
app.use(express.json());
app.use(cors());

// Conectar ao banco de dados apenas uma vez
async function connectDB() {
  try {
    console.log("Tentando conectar ao MongoDB...");
    await client.connect();
    db = client.db("fitness_app"); // Nome da base de dados
    console.log("Conectado ao MongoDB Atlas");
  } catch (err) {
    console.error("Erro ao conectar ao MongoDB:", err);
    throw new Error("Erro ao conectar ao banco de dados");
  }
}

// Rota principal para teste
app.get('/', (req, res) => {
    res.send('API está funcionando corretamente no Azure!');
});

// Rota para obter os exercícios
app.get("/exercises", async (req, res) => {
  // Verificar se a conexão com o banco de dados foi realizada
  if (!db) {
    return res.status(500).json({ error: 'Banco de dados não está conectado' });
  }

  try {
    const collection = db.collection("fitness_app"); // Nome da coleção
    const exercises = await collection.find({}).toArray(); // Busca todos os exercícios
    res.json(exercises);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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

// Iniciar o servidor e conectar ao banco
app.listen(PORT, async () => {
  await connectDB(); // Aguarda a conexão ao banco de dados antes de iniciar o servidor
  console.log(`Servidor rodando na porta ${PORT}`);
});
