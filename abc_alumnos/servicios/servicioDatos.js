const fs = require('fs');
const path = require('path');

const dataFolder = path.join(__dirname, '../data');
const alumnosFile = path.join(dataFolder, 'alumnos.json');
const carrerasFile = path.join(dataFolder, 'carreras.json');

function leerArchivo(ruta) {
    try {
        return JSON.parse(fs.readFileSync(ruta, 'utf8'));
    } catch (error) {
        return [];
    }
}

function escribirArchivo(ruta, data) {
    fs.writeFileSync(ruta, JSON.stringify(data, null, 2), 'utf8');
}

module.exports = {
    cargarAlumnos: () => leerArchivo(alumnosFile),
    guardarAlumnos: (data) => escribirArchivo(alumnosFile, data),
    cargarCarreras: () => leerArchivo(carrerasFile),
    guardarCarreras: (data) => escribirArchivo(carrerasFile, data)
};
