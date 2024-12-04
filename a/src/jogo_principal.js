const tabuleiro = document.querySelector(".tabuleiro");
const botaoJogar = document.getElementById("jogar");
const jogadorAtualSpan = document.getElementById("jogador-atual");
const perguntaSection = document.getElementById("pergunta-section");
const numeroCasas = 50;

let jogadores = JSON.parse(localStorage.getItem("jogadores")) || [];
let posicoes = JSON.parse(localStorage.getItem("posicoes")) || Array(jogadores.length).fill(0);
let jogadorAtual = parseInt(localStorage.getItem("jogadorAtual")) || 0; // Recupera o jogador atual corretamente
let rodadaPronta = false;

// Definindo as cores para os jogadores
const coresJogadores = ['#ff6347', '#32cd32', '#1e90ff', '#ff1493']; // Cores: vermelho, verde, azul, rosa

// Perguntas por nível
const perguntas = {
    verde: [
        { pergunta: "Quanto é 2 + 2?", respostaCorreta: "4", alternativas: ["3", "4", "5", "6"] },
        { pergunta: "Qual é a capital da França?", respostaCorreta: "Paris", alternativas: ["Paris", "Londres", "Roma", "Berlim"] },
    ],
    amarelo: [
        { pergunta: "Qual é o maior rio do mundo?", respostaCorreta: "Amazonas", alternativas: ["Amazonas", "Nilo", "Yangtzé", "Mississippi"] },
        { pergunta: "Em que ano a independência do Brasil foi proclamada?", respostaCorreta: "1822", alternativas: ["1820", "1822", "1824", "1830"] },
    ],
    vermelho: [
        { pergunta: "Quem inventou a lâmpada elétrica?", respostaCorreta: "Thomas Edison", alternativas: ["Nikola Tesla", "Thomas Edison", "Albert Einstein", "Michael Faraday"] },
        { pergunta: "Quem foi o autor de 'Cem Anos de Solidão'?", respostaCorreta: "Gabriel García Márquez", alternativas: ["Gabriel García Márquez", "Mario Vargas Llosa", "Carlos Fuentes", "Jorge Luis Borges"] },
    ],
    roxo: [
        { pergunta: "Quem foi o primeiro homem a caminhar na Lua?", respostaCorreta: "Neil Armstrong", alternativas: ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "John Glenn"] },
        { pergunta: "Qual é o elemento químico com o maior número atômico?", respostaCorreta: "Oganesson", alternativas: ["Uranium", "Oganesson", "Plutonium", "Radon"] },
    ]
};

// Atualiza o tabuleiro com as posições dos jogadores
function atualizarTabuleiro() {
    tabuleiro.innerHTML = ""; // Limpa o tabuleiro antes de atualizar
    for (let i = 0; i < numeroCasas; i++) {
        const casa = document.createElement("div");
        casa.className = "casa";
        casa.textContent = i + 1;

        jogadores.forEach((jogador, index) => {
            if (posicoes[index] === i) {
                const marcador = document.createElement("span");
                marcador.className = `jogador jogador-${index}`;
                marcador.textContent = jogador[0]; // Exibe a inicial do jogador
                marcador.style.backgroundColor = coresJogadores[index]; // Cor do jogador
                marcador.style.color = "#fff"; // Cor do texto para contraste
                marcador.style.padding = "5px";
                marcador.style.borderRadius = "50%";
                marcador.style.margin = "5px";
                casa.appendChild(marcador);
            }
        });

        tabuleiro.appendChild(casa);
    }
    jogadorAtualSpan.textContent = jogadores[jogadorAtual];
    jogadorAtualSpan.style.color = coresJogadores[jogadorAtual]; // Cor do texto conforme jogador atual
}

// Determina o nível da pergunta com base no número de casas
function determinarNivel(casas) {
    if (casas <= 2) return "verde";
    if (casas <= 4) return "amarelo";
    if (casas <= 6) return "vermelho";
    return "roxo";
}

// Exibe a pergunta de acordo com o nível
function exibirPergunta(nivel, casas) {
    rodadaPronta = true; // Permite responder a pergunta
    perguntaSection.innerHTML = ""; // Limpa perguntas anteriores

    const perguntaAleatoria = perguntas[nivel][Math.floor(Math.random() * perguntas[nivel].length)];
    const perguntaContainer = document.createElement("div");
    perguntaContainer.className = `pergunta pergunta-${nivel}`;
    perguntaContainer.textContent = perguntaAleatoria.pergunta;
    perguntaContainer.style.backgroundColor = {
        verde: "green",
        amarelo: "yellow",
        vermelho: "red",
        roxo: "purple",
    }[nivel];
    perguntaSection.appendChild(perguntaContainer);

    perguntaAleatoria.alternativas.forEach((alternativa) => {
        const botaoAlternativa = document.createElement("button");
        botaoAlternativa.textContent = alternativa;
        botaoAlternativa.className = "alternativa";
        perguntaContainer.appendChild(botaoAlternativa);

        botaoAlternativa.addEventListener("click", () => {
            if (!rodadaPronta) {
                alert("Você precisa girar a roleta antes de responder!");
                return;
            }

            // Verifica se a resposta está correta
            const movimento = casas;
            if (alternativa === perguntaAleatoria.respostaCorreta) {
                if (nivel === "roxo") {
                    // Se for uma pergunta roxa, o jogador avança o dobro das casas
                    posicoes[jogadorAtual] = Math.min(posicoes[jogadorAtual] + movimento * 2, numeroCasas - 1);
                } else {
                    posicoes[jogadorAtual] = Math.min(posicoes[jogadorAtual] + movimento, numeroCasas - 1);
                }
            } else {
                posicoes[jogadorAtual] = Math.max(posicoes[jogadorAtual] - movimento, 0);
            }

            // Salva as posições no localStorage e o jogador atual
            localStorage.setItem("posicoes", JSON.stringify(posicoes));
            localStorage.setItem("jogadorAtual", jogadorAtual);

            rodadaPronta = false; // Impede responder novamente
            verificarVitoria();
            jogadorAtual = (jogadorAtual + 1) % jogadores.length; // Avança para o próximo jogador
            atualizarTabuleiro();
            perguntaSection.innerHTML = ""; // Limpa perguntas após a resposta
        });
    });
}

// Verifica se há um vencedor
function verificarVitoria() {
    if (posicoes[jogadorAtual] === numeroCasas - 1) {
        alert(`${jogadores[jogadorAtual]} venceu o jogo!`);
        window.location.href = "index.html";
    }
}

// Gerencia o turno do jogador
function realizarTurno() {
    if (rodadaPronta) {
        alert("Responda a pergunta atual antes de girar a roleta!");
        return;
    }
    window.location.href = "roleta.html"; // Direciona para a roleta
}

// Inicializa o tabuleiro e as interações
atualizarTabuleiro();
botaoJogar.addEventListener("click", realizarTurno);

// Verifica se há um resultado da roleta para exibir pergunta
const resultado = localStorage.getItem("resultadoRoleta");
if (resultado) {
    const casas = parseInt(resultado);
    const nivel = determinarNivel(casas);
    exibirPergunta(nivel, casas);
    localStorage.removeItem("resultadoRoleta"); // Limpa o resultado após uso
}
