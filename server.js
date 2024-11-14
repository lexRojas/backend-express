import  express from 'express';
import bodyParser from  'body-parser';
import cors from 'cors'



const app = express();

import db from './database/db.js'

const PORT = process.env.PORT || 3000;


const corsOptions = {
    origin: '*', // Reemplaza con la URL de tu dominio
    optionsSuccessStatus: 200 // Algunos navegadores antiguos (IE11, ciertos SmartTVs) necesitan esto
};

// Aplicar el middleware de CORS
app.use(cors(corsOptions));


// Configuración de middlewares
app.use(bodyParser.json());


// Ruta para guardar los datos
app.post('/api/save-data', (req, res) => {


    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    const stmt = db.prepare('INSERT INTO users (name, email, phone) VALUES (?, ?, ?)');
    stmt.run([name, email, phone], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Error al guardar los datos');
        }
        res.status(200).send('Datos guardados correctamente');
    });
    stmt.finalize();
});

app.get('/api/get-data', (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Error al obtener los datos');
        }
        res.status(200).json(rows);
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
