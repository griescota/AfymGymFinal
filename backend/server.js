
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://griescotainf:A20011996@cluster0.vvab2td.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database');
  })
  .catch((error) => {
    console.error('Connection failed', error);
  });

// Se define el esquema de la colección de usuarios
const usuarioSchema = new mongoose.Schema({
  usuario: {
    type: String,
    required: true
  },
  contrasena: {
    type: String,
    required: true
  },
  nivel_ejercicio: {
    type: String,
    required: true
  }
});

// Se define el modelo de la colección de usuarios
const Usuario = mongoose.model('Usuario', usuarioSchema);



const registroProgresoSchema = new mongoose.Schema({
  usuario: {
    type: String,
    required: true
  },
  progreso: {
    type: Number,
    required: true
  },
  fecha: {
    type: String,
    required: true
  }
});

const RegistroProgreso = mongoose.model('RegistroProgreso', registroProgresoSchema);



// Recepcion de datos ejemplo y llega hasta MongoDB
app.post('/registro', async (req, res) => {
  console.log(req.body);
  const { usuario, nivel_ej, contrasena } = req.body;
  const nuevoUsuario = new Usuario({
    usuario: usuario,
    nivel_ejercicio: nivel_ej,
    contrasena: contrasena
  });
  console.log(nuevoUsuario);
  try {
    await nuevoUsuario.save();
    res.status(200).send('{ "message": "Usuario creado" }');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear el usuario');
  }
});

// Recuperacion de datos y llega hasta el front
app.post('/usuario', async (req, res) => {
  console.log(req.body);
  try{
    const usuario = req.body.usuario;
    const encontrar_usuario = await Usuario.findOne({ usuario: usuario }).exec();
    console.log(encontrar_usuario);
    if(encontrar_usuario){
      res.status(200).send(encontrar_usuario);
    } else {
      res.status(404).send('{ "message": "Usuario no encontrado" }');
    }
  }
  catch(error){
    console.error(error);
    res.status(500).send('{ "message": "Error al buscar el usuario" }');
  }
});
app.post('/registro-progreso', async (req, res) => {
  console.log(req.body);
  const { usuario, progreso, fecha } = req.body;
  const nuevoRegistro = new RegistroProgreso({
    usuario,
    progreso,
    fecha
  });
  console.log(nuevoRegistro);
  try {
    await nuevoRegistro.save();
    res.status(200).send({ message: "Registro guardado" });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al guardar el registro');
  }
});

// Verificación de la ruta GET
app.get('/registros-progreso', async (req, res) => {
  try {
    const registros = await RegistroProgreso.find().exec();
    if (registros.length === 0) {
      return res.status(404).send({ message: 'No se encontraron registros de progreso' });
    }
    res.status(200).send(registros);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los registros');
  }
});

app.use((req, res, next) => {
  res.status(404).send({ message: 'Route not found' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));