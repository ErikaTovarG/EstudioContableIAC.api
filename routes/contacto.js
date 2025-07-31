import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Ruta de contacto funcionando');
});


router.post('/', async (req, res) => {
  const { nombre, email, mensaje, telefono } = req.body;

  if (!nombre || !email || !mensaje || !telefono) {
    return res.status(400).json({ error: 'Faltan datos obligatorios.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: email,
      to: process.env.DESTINATARIO,
      subject: `Nuevo mensaje de ${nombre}`,
      text: `Nombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono}\n\nMensaje:\n${mensaje}`
    });

    res.json({ message: 'Correo enviado correctamente.' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ error: 'No se pudo enviar el correo.' });
  }
});

export default router;
