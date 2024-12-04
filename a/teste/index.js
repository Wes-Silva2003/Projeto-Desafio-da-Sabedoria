// Definir as cores disponíveis para os jogadores
const coresPeoes = ['#3498db', '#e74c3c', '#2ecc71', '#9b59b6'];

// Definir os jogadores e as perguntas
let jogadores = [];
const perguntas = {
  verde: [
    { pergunta: 'Qual é a capital do Brasil?', alternativas: ['A) Brasília', 'B) Rio de Janeiro', 'C) São Paulo', 'D) Salvador', 'E) Porto Alegre'], resposta: 'A' },
    // Adicione mais perguntas de dificuldade fácil aqui
  ],
  amarelo: [
    { pergunta: 'Quem escreveu "Dom Casmurro"?', alternativas: ['A) Machado de Assis', 'B) José de Alencar', 'C) Clarice Lispector', 'D) Graciliano Ramos', 'E) Lima Barreto'], resposta: 'A' },
    // Adicione mais perguntas de dificuldade média aqui
  ],
  vermelho: [
    { pergunta: 'Qual é o elemento químico com símbolo "O"?', alternativas: ['A) Oxigênio', 'B) Ouro', 'C) Ozônio', 'D) Osmium', 'E) Oganessônio'], resposta: 'A' },
    // Adicione mais perguntas de dificuldade difícil aqui
  ],
  roxo: [
    { pergunta: 'Qual é a fórmula da água?', alternativas: ['A) H2O', 'B) CO2', 'C) O2', 'D) H2O2', 'E) CH4'], resposta: 'A' },
    // Adicione mais perguntas especiais aqui
  ]
};

let turnoAtual = 0;
let rodadaAtiva = false;

// Função para configurar o número de jogadores e suas cores
function configurarJogadores() {
  const numJogadores = parseInt(document.getElementById('num-jogadores').value);
  if (numJogadores < 2 || numJogadores > 4) {
    alert("O número de jogadores deve ser entre 2 e 4.");
    return;
  }

  jogadores = [];
  for (let i = 0; i < numJogadores; i++) {
    jogadores.push({
      nome: `Jogador ${i + 1}`,
      posicao: 0,
      cor: coresPeoes[i],
      peao: null
    });
  }

  document.getElementById('controle-jogadores').style.display = 'none';
  document.getElementById('iniciar').style.display = 'block';
}

// Função para iniciar o jogo
function iniciarJogo() {
  document.getElementById('iniciar').style.display = 'none';
  document.getElementById('girar').style.display = 'block';
  document.getElementById('roleta').style.display = 'block';
  document.getElementById('pergunta').style.display = 'block';
  document.getElementById('status').style.display = 'block';
  gerarTabuleiro();
  criarPeoes();
  atualizarStatus();
}

// Função para gerar o tabuleiro com 50 casas
function gerarTabuleiro() {
  const tabuleiroDiv = document.getElementById('tabuleiro');
  for (let i = 0; i < 50; i++) {
    const casa = document.createElement('div');
    casa.id = `casa-${i}`;
    casa.innerHTML = i + 1; // Exibe o número da casa
    tabuleiroDiv.appendChild(casa);
  }
}

// Função para criar os peões no tabuleiro
function criarPeoes() {
  const tabuleiroDiv = document.getElementById('tabuleiro');
  jogadores.forEach((jogador, index) => {
    const peao = document.createElement('div');
    peao.classList.add('peao');
    peao.id = `peao-${index}`;
    peao.style.backgroundColor = jogador.cor; // Define a cor do peão
    jogador.peao = peao;
    tabuleiroDiv.appendChild(peao);
  });
}

// Função para atualizar o status do jogo
function atualizarStatus() {
  const jogador = jogadores[turnoAtual];
  document.getElementById('turno').textContent = `Vez do ${jogador.nome}`;
  document.getElementById('posicao').textContent = `Posição: ${jogador.posicao}`;
}

// Função para girar a roleta
function girarRoleta() {
  if (rodadaAtiva) return;
  rodadaAtiva = true;
  const numero = Math.floor(Math.random() * 6) + 1;
  document.getElementById('resultado-roleta').textContent = `Você tirou: ${numero}`;
  apresentarPergunta(numero);
}

// Função para apresentar a pergunta
function apresentarPergunta(numero) {
  const categorias = ['verde', 'amarelo', 'vermelho', 'roxo'];
  const categoria = categorias[Math.floor(Math.random() * categorias.length)];
  const pergunta = perguntas[categoria][Math.floor(Math.random() * perguntas[categoria].length)];
  document.getElementById('texto-pergunta').textContent = pergunta.pergunta;
  const alternativasDiv = document.getElementById('alternativas');
  alternativasDiv.innerHTML = '';
  pergunta.alternativas.forEach((alt, index) => {
    const button = document.createElement('button');
    button.textContent = alt;
    button.onclick = () => verificarResposta(pergunta.resposta, String.fromCharCode(65 + index));
    alternativasDiv.appendChild(button);
  });
}

// Função para verificar se a resposta está correta
function verificarResposta(respostaCorreta, respostaSelecionada) {
  if (respostaCorreta === respostaSelecionada) {
    alert('Você acertou!');
    const jogador = jogadores[turnoAtual];
    jogador.posicao += Math.floor(Math.random() * 6) + 1; // Avança o número de casas
    if (jogador.posicao >= 50) {
      alert(`${jogador.nome} venceu o jogo!`);
      reiniciarJogo();
      return;
    }
    moverPeao(jogador);
  } else {
    alert('Você errou!');
    penalizarJogador();
  }
  turnoAtual = (turnoAtual + 1) % jogadores.length;
  atualizarStatus();
  rodadaAtiva = false;
}

// Função para mover o peão
function moverPeao(jogador) {
  const peao = jogador.peao;
  const casa = document.getElementById(`casa-${jogador.posicao}`);
  const rect = casa.getBoundingClientRect();
  peao.style.left = rect.left + (rect.width / 2) - (peao.offsetWidth / 2) + 'px';
  peao.style.top = rect.top + (rect.height / 2) - (peao.offsetHeight / 2) + 'px';
}

// Função para penalizar o jogador
function penalizarJogador() {
  const jogador = jogadores[turnoAtual];
  jogador.posicao -= 3; // Exemplo de penalização, você pode definir conforme o nível de dificuldade
  if (jogador.posicao < 0) jogador.posicao = 0;
  moverPeao(jogador);
  alert(`Você errou e voltou algumas casas.`);
  turnoAtual = (turnoAtual + 1) % jogadores.length;
  atualizarStatus();
}

// Função para reiniciar o jogo
function reiniciarJogo() {
  jogadores.forEach(jogador => jogador.posicao = 0);
  turnoAtual = 0;
  rodadaAtiva = false;
  document.getElementById('iniciar').style.display = 'block';
  document.getElementById('girar').style.display = 'none';
  document.getElementById('roleta').style.display = 'none';
  document.getElementById('pergunta').style.display = 'none';
  document.getElementById('status').style.display = 'none';
  alert('O jogo foi reiniciado!');
}

// Adicionar evento para configurar o número de jogadores
document.getElementById('configurar-jogadores').addEventListener('click', configurarJogadores);

// Adicionar evento para iniciar o jogo
document.getElementById('iniciar').addEventListener('click', iniciarJogo);

// Adicionar evento para girar a roleta
document.getElementById('girar').addEventListener('click', girarRoleta);
