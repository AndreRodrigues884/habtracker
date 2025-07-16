const express = require('express');
const cors = require('cors');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/habits', require('./routes/habit.routes'));
app.use('/users', require('./routes/users.routes'));

// Middleware para erros
app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ message: "Invalid JSON payload! Check if your body data is a valid JSON." });
  }
  res.status(err.statusCode || 500).json({ message: err.message || "Internal Server Error" });
});

module.exports = app;
