const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Rota principal
app.get('/', async (req, res) => {
  try {
    const db = client.db("fitness_app");
    const collection = db.collection("peito");
    const peito = await collection.find({}).toArray();
    res.json(peito);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Conectar ao MongoDB
const uri = "mongodb+srv://fernandosantosav135:Fernando%401@cluster0.hukyw.mongodb.net/fitness_app?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectDB() {
  try {
    await client.connect();
    console.log("Conectado ao MongoDB Atlas");
  } catch (err) {
    console.error("Erro ao conectar ao MongoDB:", err);
  }
}

// Rota para obter os exercícios de peito
app.get("/peito", async (req, res) => {
  try {
    const db = client.db("fitness_app");
    const collection = db.collection("peito");
    const peito = await collection.find({}).toArray();
    res.json(peito);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Iniciar o servidor
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});
