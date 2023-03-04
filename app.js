const context = document.getElementById("data-set").getContext("2d");
let line = new Chart(context, {});
//variables de los valores
const intialAmount = document.getElementById("initialamount");
const years = document.getElementById("years");
const rates = document.getElementById("rates");
const compound = document.getElementById("compound");

//MENSAJE
const message = document.getElementById("message");

//BOTON CALCULADOR
const button = document.querySelector(".input-group button");
//LISTENER: Ingreso de datos y conexion a variables asignadas
button.addEventListener("click", calculateGrowth);

const data = [];
const labels = [];

function calculateGrowth(e) {
    e.preventDefault();
    data.length = 0;
    labels.length = 0;
    let growth = 0;
    try {
        const initial = parseInt(intialAmount.value);
        const period = parseInt(years.value);
        const interest = parseInt(rates.value);
        const comp = parseInt(compound.value);

        for(let i = 1; i <= period; i++) {
            const final = initial * Math.pow(1 + ((interest / 100) / comp), comp * i);
            data.push(toDecimal(final, 2));
            labels.push("Año " + i);
            growth = toDecimal(final, 2);
        }
        //
        message.innerText = `Tendras $ ${growth} despues de ${period} años al ${interest}% de interes`  ;
        drawGraph();
    } catch (error) {
        console.error(error);
    }
}

function drawGraph() {
    line.destroy();
    line = new Chart(context, {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label: "Compuesto",
                data,
                fill: true,
                backgroundColor: "#0b99c1",
                borderWidth: 3
            }]
        }
    });
}

function toDecimal(value, decimals) {
    return +value.toFixed(decimals);
}