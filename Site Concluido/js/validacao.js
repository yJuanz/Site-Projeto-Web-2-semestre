// Função para validar o formulário
function validarFormulario(event) {
    // Impede o envio do formulário para validar os campos
    event.preventDefault();

    // Obtendo os valores dos campos
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const assunto = document.getElementById("subject").value;
    const mensagem = document.getElementById("message").value;

    // Validação: Verificando se todos os campos estão preenchidos
    if (nome === "" || email === "" || assunto === "" || mensagem === "") {
        alert("Todos os campos são obrigatórios!");
        return false;
    }

    // Validação do formato do e-mail
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        alert("Por favor, insira um e-mail válido!");
        return false;
    }

    // Validação do comprimento mínimo da mensagem
    if (mensagem.length < 20) {
        alert("A mensagem deve ter no mínimo 20 caracteres!");
        return false;
    }

    // Verificando se os dados preenchidos são os mesmos que estão no localStorage
    const dadosSalvos = localStorage.getItem("dadosFormulario");

    if (dadosSalvos) {
        const dados = JSON.parse(dadosSalvos);
        
        // Se os dados preenchidos forem os mesmos dos salvos no localStorage
        if (dados.nome === nome && dados.email === email && dados.assunto === assunto && dados.mensagem === mensagem) {
            alert("Você já preencheu o formulário com essas informações.");
            return false; // Não envia o formulário
        }
    }

    // Se os dados forem diferentes ou se não houver dados salvos, salvar no localStorage
    const dadosFormulario = {
        nome: nome,
        email: email,
        assunto: assunto,
        mensagem: mensagem
    };

    // Salvando no localStorage
    localStorage.setItem("dadosFormulario", JSON.stringify(dadosFormulario));

    // Mensagem de sucesso
    alert("Formulário enviado com sucesso!");

    // Limpar o formulário (opcional)
    document.getElementById("form-contato").reset();
}

// Função para carregar os dados salvos no localStorage
function carregarDadosFormulario() {
    const dadosSalvos = localStorage.getItem("dadosFormulario");

    if (dadosSalvos) {
        const dados = JSON.parse(dadosSalvos);

        document.getElementById("nome").value = dados.nome;
        document.getElementById("email").value = dados.email;
        document.getElementById("subject").value = dados.assunto;
        document.getElementById("message").value = dados.mensagem;
    }
}

// Chama a função para carregar os dados salvos ao carregar a página
window.onload = carregarDadosFormulario;
