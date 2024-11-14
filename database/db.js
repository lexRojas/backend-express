
import sqlite3  from 'sqlite3'


// Conexión a la base de datos SQLite
const  db = new sqlite3.Database('./database/data.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Conectado a la base de datos SQLite.');
});

// Crear la tabla si no existe
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL
)`);

export default  db;