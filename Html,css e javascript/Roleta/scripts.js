const container = document.querySelector(".container");
const btn = document.getElementById("spin");
let angle = 0;

btn.onclick = function () {
    const spin = Math.ceil(Math.random() * 360) + 360 * 3; // Gira pelo menos 3 vezes
    angle += spin; // Adiciona o novo giro ao ângulo acumulado
    container.style.transform = `rotate(${angle}deg)`; // Aplica a rotação
};
