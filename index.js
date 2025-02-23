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
  if (!client) {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    db = client.db("fitness_app");
    console.log("✅ Conectado ao MongoDB Atlas");
  }
}

// Rota principal - Retorna os dados da coleção "peito"
app.get("/", async (req, res) => {
  try {
    await connectDB();
    const collection = db.collection("peito");
    const peito = await collection.find({}).toArray();
    res.json(peito);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Iniciar o servidor
app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
