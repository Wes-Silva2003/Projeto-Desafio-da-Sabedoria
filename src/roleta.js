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
const segments = ["1", "2", "3", "4", "5", "6", "7", "8"];

function getWinner(degrees) {
    let normalizedDegrees = degrees % 360;
    let index = Math.floor(normalizedDegrees / (360 / segments.length));
    return segments[segments.length - 1 - index];
}

btn.addEventListener("click", () => {
    const rotationTime = 3000; // Tempo de rotação (3s)
    number += Math.ceil(Math.random() * 1000);

    container.style.transition = `transform ${rotationTime / 1000}s ease-out`;
    container.style.transform = "rotate(" + number + "deg)";

    setTimeout(() => {
        const result = getWinner(number);
        resultDisplay.textContent = "Resultado: " + result;

        localStorage.setItem("resultadoRoleta", result);

        setTimeout(() => {
            window.location.href = "jogo_principal.html"; // Redireciona para a tela principal
        }, 2000);
    }, rotationTime);
});

