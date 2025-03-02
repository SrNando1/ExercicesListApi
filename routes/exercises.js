const express = require("express");
const router = express.Router();
const db = require("../db");

// Rota para obter todos os exercícios
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM chest_exercises");
    res.json(rows);
  } catch (error) {
    console.error("Erro ao buscar exercícios:", error);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

module.exports = router;
