const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 3000;

const uri =
  "mongodb+srv://fernandosav135:Fernando%401@cluster0.hukyw.mongodb.net/fitness_app?retryWrites=true&w=majority";
const client = new MongoClient(uri);

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
