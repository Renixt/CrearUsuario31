const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

const port = process.env.PORT;

// RUTAS
const ContactsRoutes = require('./src/routes/contacts.routes');

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // For legacy browser support
}
app.use(cors(corsOptions));

// RUTAS DE CONTACTOS
app.use('/contactos', ContactsRoutes)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
