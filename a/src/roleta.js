let container = document.querySelector(".container");
let btn = document.getElementById("spin");
let resultDisplay = document.createElement("div");

document.body.appendChild(resultDisplay);

// Configuração inicial
const segments = ["1", "2", "3", "4", "5", "6", "7", "8"]; // Os segmentos da roleta
const rotationTime = 3000; // Tempo de rotação (3s)
let currentRotation = 0; // Controla a rotação acumulada

// Função para determinar o vencedor com base no ângulo
function getWinner(degrees) {
    const normalizedDegrees = (degrees % 360 + 360) % 360; // Normaliza para o intervalo de 0 a 360 (evita negativos)
    const segmentAngle = 360 / segments.length; // Ângulo de cada segmento
    const adjustedDegrees = 360 - normalizedDegrees; // Ajusta para alinhar o ângulo visual
    const index = Math.floor(adjustedDegrees / segmentAngle) % segments.length; // Determina o índice do segmento
    return segments[index]; // Retorna o segmento correspondente
}

// Listener para o botão de girar a roleta
btn.addEventListener("click", () => {
    const randomRotation = Math.ceil(Math.random() * 1000); // Geração de rotação aleatória
    currentRotation += randomRotation; // Adiciona a rotação à atual

    // Aplica a rotação com animação
    container.style.transition = `transform ${rotationTime / 1000}s ease-out`;
    container.style.transform = `rotate(${currentRotation}deg)`;

    // Exibe o resultado após a animação
    setTimeout(() => {
        const result = getWinner(currentRotation);
        resultDisplay.textContent = "Resultado: " + result;

        // Salva o resultado no localStorage para uso no jogo principal
        localStorage.setItem("resultadoRoleta", result);

        // Redireciona para a tela principal após 2 segundos
        setTimeout(() => {
            window.location.href = "jogo_principal.html";
        }, 2000);
    }, rotationTime);
});
