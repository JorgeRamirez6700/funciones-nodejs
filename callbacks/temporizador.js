function temporizador(callback) {
    setTimeout(() => {
        callback("Mensaje mostrado despues de 3 segundos!");
    }, 3000);
}

temporizador((mensaje) => {
    console.log(mensaje);
});
