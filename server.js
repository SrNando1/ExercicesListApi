require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
const exercisesRoutes = require("./routes/exercises");
app.use("/api/chest-exercises", exercisesRoutes);

// Rota padrão
app.get("/", (req, res) => {
  res.send("API de exercícios está rodando!");
});

// Definir porta e iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
