function operacionMatematica(num1, num2, callback) {
    return callback(num1, num2);
}

function suma(a, b) {
    return a + b;
}

function resta(a, b) {
    return a - b;
}

function multiplicacion(a, b) {
    return a * b;
}

function division(a, b) {
    if (b === 0) return "No se puede dividir por cero";
    return a / b;
}

// logs de ejemplo
console.log("Suma:", operacionMatematica(5, 3, suma));
console.log("Resta:", operacionMatematica(10, 2, resta));
console.log("Multiplicación:", operacionMatematica(4, 6, multiplicacion));
console.log("División:", operacionMatematica(8, 2, division));
