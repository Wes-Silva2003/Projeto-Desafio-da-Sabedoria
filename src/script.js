const numJogadoresInput = document.getElementById("numJogadores");
const inputsJogadores = document.getElementById("inputsJogadores");
const iniciarJogoBtn = document.getElementById("iniciarJogo");

numJogadoresInput.addEventListener("change", (e) => {
    const numJogadores = parseInt(e.target.value);

    if (numJogadores >= 2 && numJogadores <= 4) {
        // Exibir campos para os nomes dos jogadores
        inputsJogadores.innerHTML = ''; // Limpar campos anteriores
        for (let i = 1; i <= numJogadores; i++) {
            const inputNome = document.createElement("input");
            inputNome.type = "text";
            inputNome.name = `nomeJogador${i}`;
            inputNome.placeholder = `Jogador ${i}`;
            inputsJogadores.appendChild(inputNome);
        }
        inputsJogadores.style.display = "flex";
    } else {
        inputsJogadores.style.display = "none"; // Esconde campos de nome
    }
});

// Ao clicar no botão de iniciar
iniciarJogoBtn.addEventListener("click", () => {
    const numJogadores = parseInt(numJogadoresInput.value);
    const jogadoresNomes = [];

    for (let i = 1; i <= numJogadores; i++) {
        const nomeJogador = document.querySelector(`input[name="nomeJogador${i}"]`).value.trim();
        if (!nomeJogador) {
            alert(`Por favor, insira o nome do Jogador ${i}`);
            return;
        }
        jogadoresNomes.push(nomeJogador);
    }

    // Salvar os nomes dos jogadores no localStorage
    localStorage.setItem("jogadores", JSON.stringify(jogadoresNomes));

    // Redirecionar para o jogo (agora o caminho é src/jogo_principal.html)
    window.location.href = "src/jogo_principal.html";
});
