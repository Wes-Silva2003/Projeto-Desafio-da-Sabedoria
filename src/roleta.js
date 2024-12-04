let container = document.querySelector(".container");
let btn = document.getElementById("spin");
let resultDisplay = document.createElement("div");
resultDisplay.style.position = "absolute";
resultDisplay.style.top = "10%";
resultDisplay.style.left = "50%";
resultDisplay.style.transform = "translateX(-50%)";
resultDisplay.style.color = "#fff";
resultDisplay.style.fontSize = "24px";
document.body.appendChild(resultDisplay);

let number = Math.ceil(Math.random() * 1000);

// Definir os segmentos
const segments = ["1", "2", "3", "4", "5", "6", "7", "8"];

// Detectar o segmento vencedor
function getWinner(degrees) {
    let normalizedDegrees = degrees % 360;
    let index = Math.floor(normalizedDegrees / (360 / segments.length));
    return segments[segments.length - 1 - index];
}

btn.onclick = function () {
    let previousRotation = number;
    number += Math.ceil(Math.random() * 1000);

    container.style.transform = "rotate(" + number + "deg)";

    setTimeout(() => {
        let result = getWinner(number);
        resultDisplay.textContent = "Resultado: " + result;

        // Salvar o resultado no localStorage
        localStorage.setItem("resultadoRoleta", result);

        // Redirecionar para a página principal
        setTimeout(() => {
            window.location.href = "jogo_principal.html";
        }, 3000);
    }, 5000); // Aguarda o tempo da rotação
};
