// Seletores e variáveis iniciais
const tabuleiro = document.querySelector(".tabuleiro");
const botaoJogar = document.getElementById("jogar");
let jogadorAtual = 0; // Jogador 0 será o primeiro jogador
let posicoes = Array(4).fill(0); // Até 4 jogadores
const numeroCasas = 50;
let perguntas = {
    verde: [],
    amarelo: [],
    vermelho: [],
    roxo: []
};

// Recuperar os nomes dos jogadores
const jogadores = JSON.parse(localStorage.getItem("jogadores")) || [];
if (jogadores.length < 2 || jogadores.length > 4) {
    alert("Número de jogadores inválido!");
    window.location.href = "index.html";
}

// Função para gerar o tabuleiro
function gerarTabuleiro() {
    for (let i = 1; i <= numeroCasas; i++) {
        const casa = document.createElement("div");
        casa.textContent = i;
        tabuleiro.appendChild(casa);
    }
}

// Atualizar a posição dos jogadores no tabuleiro
function atualizarTabuleiro() {
    document.querySelectorAll(".tabuleiro div").forEach((casa, index) => {
        casa.classList.remove("jogador1", "jogador2", "jogador3", "jogador4");
        posicoes.forEach((pos, i) => {
            if (pos === index) casa.classList.add(`jogador${i + 1}`);
        });
    });
}

// Verificar se há um vencedor
function verificarVitoria() {
    posicoes.forEach((pos, i) => {
        if (pos >= numeroCasas) {
            alert(`Jogador ${i + 1} venceu!`);
            localStorage.setItem("vencedor", `Jogador ${i + 1}`);
            window.location.href = "final.html";
        }
    });
}

// Função para ler os arquivos JSON de perguntas
async function carregarPerguntas() {
    try {
        const verde = await fetch("src/verde.json");
        const amarelo = await fetch("src/amarelo.json");
        const vermelho = await fetch("src/vermelho.json");
        const roxo = await fetch("src/roxo.json");

        perguntas.verde = await verde.json();
        perguntas.amarelo = await amarelo.json();
        perguntas.vermelho = await vermelho.json();
        perguntas.roxo = await roxo.json();

        console.log("Perguntas carregadas com sucesso!");
    } catch (error) {
        console.error("Erro ao carregar as perguntas: ", error);
    }
}

// Função para exibir uma pergunta
function exibirPergunta() {
    // Verifica se a roleta foi girada e o resultado está no localStorage
    const resultado = localStorage.getItem("resultadoRoleta");
    if (!resultado) {
        alert("Você precisa girar a roleta antes de jogar.");
        return;
    }

    // Seleciona o nível de pergunta com base no número sorteado
    const nivel = determinarNivel(); // Função para determinar o nível da pergunta
    const perguntaAleatoria = pegarPerguntaAleatoria(nivel);

    // Exibe a pergunta
    const perguntaContainer = document.createElement("div");
    perguntaContainer.textContent = perguntaAleatoria.pergunta;
    document.body.appendChild(perguntaContainer);

    // Define a cor de fundo com base no nível da pergunta
    switch (nivel) {
        case 'verde':
            perguntaContainer.style.backgroundColor = "green";
            break;
        case 'amarelo':
            perguntaContainer.style.backgroundColor = "yellow";
            break;
        case 'vermelho':
            perguntaContainer.style.backgroundColor = "red";
            break;
        case 'roxo':
            perguntaContainer.style.backgroundColor = "purple";
            break;
        default:
            perguntaContainer.style.backgroundColor = "gray";
            break;
    }

    // Botão de resposta
    const botaoResposta = document.createElement("button");
    botaoResposta.textContent = "Responder";
    document.body.appendChild(botaoResposta);

    botaoResposta.addEventListener("click", () => {
        const respostaCorreta = perguntaAleatoria.respostaCorreta;
        const respostaJogador = prompt("Digite a sua resposta:").toLowerCase();

        if (respostaJogador === respostaCorreta.toLowerCase()) {
            alert("Você acertou!");
            localStorage.setItem("acertou", true);
            posicoes[jogadorAtual] += 1; // Avançar uma casa
        } else {
            alert("Você errou!");
            localStorage.setItem("acertou", false);
            posicoes[jogadorAtual] -= 1; // Voltar uma casa
        }

        verificarVitoria();
        jogadorAtual = (jogadorAtual + 1) % jogadores.length; // Alternar jogador
        atualizarTabuleiro();
    });
}

// Função para determinar o nível da pergunta (simulando um sorteio)
function determinarNivel() {
    // Aqui estamos usando um sorteio simples. Você pode modificar para algo mais sofisticado.
    const niveis = ["verde", "amarelo", "vermelho", "roxo"];
    const nivelSorteado = niveis[Math.floor(Math.random() * niveis.length)];
    return nivelSorteado;
}

// Função para pegar uma pergunta aleatória de um nível
function pegarPerguntaAleatoria(nivel) {
    const perguntasNivel = perguntas[nivel];
    return perguntasNivel[Math.floor(Math.random() * perguntasNivel.length)];
}

// Função para iniciar a jogada
function jogar() {
    // Salvar as posições e o jogador atual no localStorage
    localStorage.setItem("posicoes", JSON.stringify(posicoes));
    localStorage.setItem("jogadorAtual", jogadorAtual);

    // Redirecionar para a página da roleta
    window.location.href = "roleta.html";
}

// Recuperar dados do localStorage ao carregar a página
function carregarDados() {
    const resultado = parseInt(localStorage.getItem("resultadoRoleta")) || 0;
    const acertou = JSON.parse(localStorage.getItem("acertou"));

    if (resultado) {
        if (acertou) {
            posicoes[jogadorAtual] += resultado;
        } else {
            posicoes[jogadorAtual] -= resultado;
        }

        verificarVitoria();
        jogadorAtual = (jogadorAtual + 1) % jogadores.length; // Alternar jogador
    }
}

// Inicialização
gerarTabuleiro();
carregarDados();
carregarPerguntas(); // Carregar as perguntas
atualizarTabuleiro();

// Verifica se já foi redirecionado da roleta
const foiRedirecionadoDaRoleta = localStorage.getItem("resultadoRoleta");

if (foiRedirecionadoDaRoleta) {
    exibirPergunta(); // Exibe a pergunta se foi redirecionado
    localStorage.removeItem("resultadoRoleta"); // Limpa o valor após a exibição da pergunta
}

// Evento do botão Jogar
botaoJogar.addEventListener("click", jogar);
