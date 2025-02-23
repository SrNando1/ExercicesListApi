const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Conectar ao MongoDB
const uri =
  "mongodb+srv://fernandosantosav135:Fernando%401@cluster0.hukyw.mongodb.net/fitness_app?retryWrites=true&w=majority&appName=Cluster0";

let client;
let db;

async function connectDB() {
  try {
    if (!client || !client.topology || !client.topology.isConnected()) {
      client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await client.connect();
      db = client.db("fitness_app");
      console.log("✅ Conectado ao MongoDB Atlas");
    }
    return db;
  } catch (error) {
    console.error("❌ Erro ao conectar ao MongoDB:", error);
    return null; // Evita quebrar a API
  }
}

// Middleware para garantir que a conexão esteja ativa
app.use(async (req, res, next) => {
  if (!db) {
    db = await connectDB();
  }
  if (!db) {
    return res.status(500).json({ error: "Falha ao conectar ao banco de dados" });
  }
  next();
});

// Rota principal - Retorna os dados da coleção "peito"
app.get("/", async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: "Banco de dados não disponível" });
    }
    const collection = db.collection("peito");
    const peito = await collection.find({}).toArray();
    res.json(peito);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Iniciar o servidor
app.listen(PORT, async () => {
  db = await connectDB();
  if (!db) {
    console.error("❌ Não foi possível conectar ao banco. API não iniciada.");
    process.exit(1); // Encerra o servidor se não houver banco
  }
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
