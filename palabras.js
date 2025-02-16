function extraerPalabrasPorLongitud(cadena, longitud) {
    if (longitud <= 0 || typeof longitud !== 'number') {
        return "La longitud debe ser un número mayor a 0.";
    }
   
    let palabras = cadena.split(/\s+/);
    let palabrasFiltradas = palabras.filter(palabra => palabra.length === longitud);
    return palabrasFiltradas;
}

let texto = "JavaScript esta bastante divertido";
let longitud = 1;

console.log(extraerPalabrasPorLongitud(texto, longitud));

