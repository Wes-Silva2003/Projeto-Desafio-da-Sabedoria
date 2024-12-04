const numJogadoresInput = document.getElementById("numJogadores");
const inputsJogadores = document.getElementById("inputsJogadores");
const iniciarJogoBtn = document.getElementById("iniciarJogo");

numJogadoresInput.addEventListener("change", (e) => {
    const numJogadores = parseInt(e.target.value);

    if (numJogadores >= 2 && numJogadores <= 4) {
        inputsJogadores.innerHTML = ""; // Limpar campos anteriores
        for (let i = 1; i <= numJogadores; i++) {
            const inputNome = document.createElement("input");
            inputNome.type = "text";
            inputNome.name = `nomeJogador${i}`;
            inputNome.placeholder = `Jogador ${i}`;
            inputNome.className = "campo-jogador";
            inputsJogadores.appendChild(inputNome);
        }
    } else {
        inputsJogadores.innerHTML = ""; // Esconde campos de nome
        alert("Escolha entre 2 a 4 jogadores.");
    }
});

iniciarJogoBtn.addEventListener("click", () => {
    const numJogadores = parseInt(numJogadoresInput.value);
    const jogadoresNomes = [];

    if (!numJogadores || numJogadores < 2 || numJogadores > 4) {
        alert("Escolha o número de jogadores entre 2 e 4.");
        return;
    }

    for (let i = 1; i <= numJogadores; i++) {
        const nomeJogador = document.querySelector(`input[name="nomeJogador${i}"]`).value.trim();
        if (!nomeJogador) {
            alert(`Por favor, insira o nome do Jogador ${i}`);
            return;
        }
        jogadoresNomes.push(nomeJogador);
    }

    localStorage.setItem("jogadores", JSON.stringify(jogadoresNomes));
    window.location.href = "src/jogo_principal.html";
});
