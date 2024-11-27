let questions = {};  // Objeto para armazenar perguntas carregadas
let usedQuestions = [];  // Array para armazenar perguntas já usadas
 
// Função para carregar perguntas do arquivo JSON
async function loadQuestions() {
    try {
        const response = await fetch('perguntas.json');
        questions = await response.json();
        console.log("Perguntas carregadas com sucesso!", questions);
    } catch (error) {
        console.error("Erro ao carregar perguntas:", error);
    }
}

function startTurn() {
    if (!questions.verde || questions.verde.length === 0) {
        alert("Nenhuma pergunta disponível! Verifique o arquivo JSON.");
        return;
    }

    questionCard.classList.remove('hidden');

    const remainingQuestions = questions.verde.filter(q => !usedQuestions.includes(q.pergunta));

    if (remainingQuestions.length === 0) {
        alert("Todas as perguntas foram usadas! Reinicie o jogo ou adicione mais perguntas.");
        return;
    }

    const question = remainingQuestions[Math.floor(Math.random() * remainingQuestions.length)];
    usedQuestions.push(question.pergunta);

    questionText.textContent = question.pergunta;
    optionsList.innerHTML = '';
    question.opcoes.forEach(opcao => {
        const li = document.createElement('li');
        li.textContent = opcao;
        optionsList.appendChild(li);

        li.addEventListener('click', () => {
            if (li.textContent.startsWith(question.respostaCorreta)) {
                alert('Resposta correta!');
                advancePlayer();
            } else {
                alert('Resposta errada! Penalidade aplicada.');
                penalizePlayer();
            }
            questionCard.classList.add('hidden');
            nextPlayer();
        });
    });
}

// Chame a função `loadQuestions()` quando a página carregar
window.addEventListener('load', async () => {
    await loadQuestions();
    createBoard();
    renderPlayers();
});