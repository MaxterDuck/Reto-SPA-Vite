const fs = require('fs');

fs.copyFile('reset_db.json', 'db.json', (err) => {
    if (err) {
        console.error('Error al resetear la base de datos:', err);
    } else {
        console.log('Base de datos reseteada correctamente.');
    }
});