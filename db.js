require("dotenv").config();
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "myfitnessapp.mysql.database.azure.com",
  user: process.env.DB_USER || "SrNando",
  password: process.env.DB_PASS || "Fernando@1",
  database: process.env.DB_NAME || "fitness_app",
  ssl: { rejectUnauthorized: false }, // 🔹 Importante para conexões seguras!
});

module.exports = pool;

// Testar conexão
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Conectado ao banco de dados com sucesso!");
    connection.release();
  } catch (error) {
    console.error("❌ Erro ao conectar no banco de dados:", error);
  }
})();

module.exports = pool;
