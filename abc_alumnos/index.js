const readline = require('readline');
const Alumno = require('./modelos/Alumno');
const Carrera = require('./modelos/Carrera');
const dataService = require('./servicios/servicioDatos');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let alumnos = dataService.cargarAlumnos();
let carreras = dataService.cargarCarreras();

function mostrarMenuPrincipal() {
    console.log('\n** Menú Principal **');
    console.log('1. Alumnos');
    console.log('2. Carreras');
    console.log('3. Salir');
}

function mostrarSubMenu(entidad) {
    console.log(`\n** ${entidad} **`);
    console.log('1. Ver listado');
    console.log('2. Agregar');
    console.log('3. Borrar');
    console.log('4. Modificar');
    if (entidad === 'alumnos') console.log('5. Asignar a carrera');
    console.log('6. Volver al menú principal');
}

function verListado(entidad) {
    const lista = entidad === 'alumnos' ? alumnos : carreras;
    if (lista.length === 0) {
        console.log(`No hay ${entidad} registrados.`);
    } else {
        console.log(`\nLista de ${entidad}:`);
        lista.forEach(item => console.log(`${item.id} - ${item.nombre}`));
    }
}

function agregar(entidad) {
    rl.question(`Ingrese el nombre del nuevo ${entidad}: `, nombre => {
        const lista = entidad === 'alumnos' ? alumnos : carreras;
        const id = lista.length + 1;
        const nuevo = entidad === 'alumnos' ? new Alumno(id, nombre) : new Carrera(id, nombre);
        lista.push(nuevo);
        entidad === 'alumnos' ? dataService.guardarAlumnos(alumnos) : dataService.guardarCarreras(carreras);
        console.log(`${entidad.slice(0, -1)} agregado con éxito.`);
        seleccionarAccion(entidad);
    });
}

function borrar(entidad) {
    verListado(entidad);
    rl.question(`Ingrese el ID del ${entidad.slice(0, -1)} a eliminar: `, id => {
        let lista = entidad === 'alumnos' ? alumnos : carreras;
        lista = lista.filter(item => item.id != id);
        entidad === 'alumnos' ? dataService.guardarAlumnos(lista) : dataService.guardarCarreras(lista);
        console.log(`${entidad.slice(0, -1)} eliminado con éxito.`);
        seleccionarAccion(entidad);
    });
}

function modificar(entidad) {
    verListado(entidad);
    rl.question(`Ingrese el ID del ${entidad.slice(0, -1)} a modificar: `, id => {
        let lista = entidad === 'alumnos' ? alumnos : carreras;
        const item = lista.find(i => i.id == id);
        if (!item) {
            console.log('ID no encontrado.');
            seleccionarAccion(entidad);
            return;
        }
        rl.question('Ingrese el nuevo nombre: ', nuevoNombre => {
            item.nombre = nuevoNombre;
            entidad === 'alumnos' ? dataService.guardarAlumnos(alumnos) : dataService.guardarCarreras(carreras);
            console.log('Modificación realizada.');
            seleccionarAccion(entidad);
        });
    });
}

function asignarAlumnoACarrera() {
    verListado('alumnos');
    rl.question('Ingrese el ID del alumno: ', idAlumno => {
        const alumno = alumnos.find(a => a.id == idAlumno);
        if (!alumno) {
            console.log('Alumno no encontrado.');
            seleccionarAccion('alumnos');
            return;
        }
        verListado('carreras');
        rl.question('Ingrese el ID de la carrera: ', idCarrera => {
            const carrera = carreras.find(c => c.id == idCarrera);
            if (!carrera) {
                console.log('Carrera no encontrada.');
                seleccionarAccion('alumnos');
                return;
            }
            alumno.carrera = carrera.nombre;
            carrera.alumnos.push(alumno);
            dataService.guardarAlumnos(alumnos);
            dataService.guardarCarreras(carreras);
            console.log(`Alumno asignado a ${carrera.nombre}.`);
            seleccionarAccion('alumnos');
        });
    });
}

function seleccionarAccion(entidad) {
    mostrarSubMenu(entidad);
    rl.question('Seleccione una opción: ', opcion => {
        switch (opcion) {
            case '1':
                verListado(entidad);
                seleccionarAccion(entidad);
                break;
            case '2':
                agregar(entidad);
                break;
            case '3':
                borrar(entidad);
                break;
            case '4':
                modificar(entidad);
                break;
            case '5':
                if (entidad === 'alumnos') {
                    asignarAlumnoACarrera();
                } else {
                    console.log('Opción no válida.');
                    seleccionarAccion(entidad);
                }
                break;
            case '6':
                seleccionarAccionPrincipal();
                break;
            default:
                console.log('Opción no válida.');
                seleccionarAccion(entidad);
        }
    });
}

function seleccionarAccionPrincipal() {
    mostrarMenuPrincipal();
    rl.question('Seleccione una opción: ', opcion => {
        switch (opcion) {
            case '1':
                seleccionarAccion('alumnos');
                break;
            case '2':
                seleccionarAccion('carreras');
                break;
            case '3':
                console.log('¡Hasta luego!');
                rl.close();
                break;
            default:
                console.log('Opción no válida.');
                seleccionarAccionPrincipal();
        }
    });
}

// Iniciar el programa
seleccionarAccionPrincipal();
