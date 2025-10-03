const express = require('express');
const path = require('path');
const multer = require('multer');

const app = express();

// Use a variável de ambiente 'PORT' ou 3000 como fallback
const port = process.env.PORT || 3000;

// Configurar o multer para o upload de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal para servir o index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para lidar com o upload de fotos
app.post('/upload', upload.single('photo'), (req, res) => {
  console.log('Foto recebida:', req.file);
  res.status(200).send('Foto enviada com sucesso!');
});

// Iniciar o servidor na porta fornecida pelo Discloud
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
