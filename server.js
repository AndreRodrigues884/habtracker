require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Habilita CORS para todas as origens (para desenvolvimento)
app.use(cors());

// Conecta ao MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ MongoDB conectado com sucesso');

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Servidor a correr na porta http://0.0.0.0:${PORT}`);
      console.log(`💻 Use o IP da máquina (ex: 192.168.1.6:${PORT}) para dispositivos físicos`);
    });
  })
  .catch((err) => {
    console.error('❌ Erro ao conectar ao MongoDB:', err);
  });
