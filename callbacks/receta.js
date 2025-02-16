function cortarIngredientes(ingredientes, callback) {
    console.log(`Cortando ingredientes: ${ingredientes.join(", ")}...`);
    setTimeout(() => {
        console.log("Ingredientes cortados.");
        callback();
    }, 2000);
}

function cocinar(plato, callback) {
    console.log(`Cocinando ${plato}...`);
    setTimeout(() => {
        console.log(`${plato} está listo.`);
        callback(plato);
    }, 3000);
}

function servirPlato(plato) {
    console.log(`Sirviendo ${plato}. ¡Buen provecho!`);
}


const ingredientes = ["pollo", "zanahoria", "cebolla", "ajo"];
const plato = "guiso de pollo";


cortarIngredientes(ingredientes, () => {
    cocinar(plato, (platoListo) => {
        servirPlato(platoListo);
    });
});
