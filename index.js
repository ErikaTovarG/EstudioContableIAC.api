import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import contactoRouter from './routes/contacto.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.use('/api/contacto', contactoRouter);

app.get('/', (req, res) => {
  res.send('API Estudio Contable IAC funcionando');
});


app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
