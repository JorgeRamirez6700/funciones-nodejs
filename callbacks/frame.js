function crearMarco(palabras) {
    const longitudMaxima = Math.max(...palabras.map(palabra => palabra.length));
    const borde = "*".repeat(longitudMaxima + 4);
    
    let palabrasEnmarcadas = palabras.map(palabra => `* ${palabra} ${" ".repeat(longitudMaxima - palabra.length)}*`);
    
    return [borde, ...palabrasEnmarcadas, borde].join("\n");
}

// Ejemplo de uso
console.log(crearMarco(['a', 'bb', 'ccc']));
console.log(crearMarco(['a', 'bb', 'ccc', 'dddd']));