const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Buscar todos os exercícios
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Exercises");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar exercícios", details: err });
  }
});

// Buscar um exercício por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM Exercises WHERE id = ?", [id]);
    res.json(rows[0] || {});
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar exercício", details: err });
  }
});

// Criar um novo exercício
router.post("/", async (req, res) => {
  const { name, description } = req.body;
  try {
    const [result] = await db.query("INSERT INTO Exercises (name, description) VALUES (?, ?)", [name, description]);
    res.json({ message: "Exercício criado com sucesso!", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar exercício", details: err });
  }
});

// Atualizar um exercício
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    await db.query("UPDATE Exercises SET name = ?, description = ? WHERE id = ?", [name, description, id]);
    res.json({ message: "Exercício atualizado com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar exercício", details: err });
  }
});

// Deletar um exercício
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM Exercises WHERE id = ?", [id]);
    res.json({ message: "Exercício excluído com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao excluir exercício", details: err });
  }
});

module.exports = router;
