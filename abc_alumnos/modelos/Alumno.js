class Alumno {
    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre;
        this.carrera = null; // Inicialmente sin carrera, Se agrega despues.
    }
}

module.exports = Alumno;
