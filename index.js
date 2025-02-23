const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;

// URI de conexão do MongoDB (substitua com a sua)
const uri = "mongodb+srv://fernandosantosav135:Fernando%401@cluster0.hukyw.mongodb.net/fitness_app?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Configurar middleware
app.use(express.json());
app.use(cors());

// Conectar ao banco de dados
async function connectDB() {
  try {
    console.log("Tentando conectar ao MongoDB...");
    await client.connect();
    console.log("Conectado ao MongoDB Atlas");
  } catch (err) {
    console.error("Erro ao conectar ao MongoDB:", err);
    throw new Error("Erro ao conectar ao banco de dados");
  }
}

// Rota principal para teste
app.get('/', (req, res) => {
  res.send('API está funcionando corretamente!');
});

// Rota para obter os exercícios de peito
app.get("/peito", async (req, res) => {
  try {
    const db = client.db("fitness_app"); // Nome do banco de dados
    const collection = db.collection("peito"); // Nome da coleção
    const peito = await collection.find({}).toArray(); // Busca todos os documentos
    res.json(peito); // Retorna os dados em formato JSON
  } catch (err) {
    console.error("Erro ao buscar dados:", err);
    res.status(500).json({ error: "Erro ao buscar dados" });
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

// Iniciar o servidor e conectar ao banco de dados
connectDB() // Conecta ao banco de dados antes de iniciar o servidor
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Falha ao conectar ao banco de dados:", err);
    process.exit(1); // Encerra o processo se não conseguir conectar ao banco de dados
  });
