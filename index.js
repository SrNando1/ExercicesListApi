const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Importando as rotas de exercícios
const exerciseRoutes = require("./routes/exercises");
app.use("/exercises", exerciseRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
