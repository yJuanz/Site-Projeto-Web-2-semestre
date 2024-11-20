// Função para buscar o clima usando a API do WeatherAPI
async function buscarClima() {
    const cidade = document.getElementById('cidade').value.trim();  // Remover espaços extras
    const chaveApi = '2cead4aba88641a2985162522241611'; // Substitua pela sua chave da API

    if (!cidade) {
        alert('Por favor, insira o nome de uma cidade.');
        return;
    }

    // Adiciona o código do país para melhorar a busca
    const cidadeComPais = `${cidade},br`;  // Exemplo: "São Paulo,br" (Brasil)

    const url = `https://api.weatherapi.com/v1/current.json?key=${chaveApi}&q=${cidadeComPais}&lang=pt`;

    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();

        // Verificar se a cidade foi encontrada
        if (dados.error) {
            document.getElementById('weather-info').innerHTML = `
                <p><strong>Erro:</strong> Não foi possível encontrar a cidade. Verifique o nome ou tente com o código do país.</p>
            `;
            return;
        }

        // Exibe as informações do clima
        const temperatura = dados.current.temp_c; // Temperatura em °C
        const condicaoClima = dados.current.condition.text.toLowerCase(); // Condição do clima (ex: "nuvens", "ensolarado")

        // Exibe informações sobre o clima
        document.getElementById('weather-info').innerHTML = `
            <h3>Clima em ${dados.location.name}</h3>
            <p><strong>Temperatura:</strong> ${temperatura}°C</p>
            <p><strong>Condição:</strong> ${dados.current.condition.text}</p>
        `;

        // Agora chama a função para gerar sugestões de roupas com base no clima
        const sugestao = gerarSugestaoDeRoupas(temperatura, condicaoClima);
        document.getElementById('clothing-suggestions').innerHTML = sugestao;

    } catch (erro) {
        console.error('Erro ao buscar dados do clima:', erro);
        document.getElementById('weather-info').innerHTML = `
            <p>Ocorreu um erro ao obter as informações do clima. Tente novamente mais tarde.</p>
        `;
    }
}

// Função para gerar sugestões de roupas com base no clima e exibir imagens
function gerarSugestaoDeRoupas(temperatura, condicaoClima) {
    let sugestao = '';

    // Contém as URLs das imagens (substitua pelas suas imagens)
    const roupas = {
        quente: 'https://taco.vtexassets.com/arquivos/ids/478878/22177_C025_2-BRM-CRG-PRG-MACHO-PT-FLEX.jpg?v=638567478543130000',  // Imagem para clima quente
        ameno: 'https://taco.vtexassets.com/arquivos/ids/452163/21070_C050_1-CJNS-COMF-ESP-ESCURA.jpg?v=638324779138530000',   // Imagem para clima ameno
        frio: 'https://lojausereserva.vtexassets.com/arquivos/ids/8759834-1200-auto?v=638618545342830000&width=1200&height=auto&aspect=true',     // Imagem para clima frio
        chuva: 'https://lojausereserva.vtexassets.com/arquivos/ids/7651456-1200-auto?v=638194609947830000&width=1200&height=auto&aspect=true',   // Imagem para clima de chuva
        neve: 'https://lojausereserva.vtexassets.com/arquivos/ids/8590978-1200-auto?v=638536371129930000&width=1200&height=auto&aspect=true',     // Imagem para clima de neve
        vento: 'https://lojausereserva.vtexassets.com/arquivos/ids/8611210-1200-auto?v=638549477671230000&width=1200&height=auto&aspect=true',   // Imagem para clima de vento
        nublado: 'https://mofficer.com.br/cdn/shop/products/129008019-500-1.jpg?v=1677159965' // Imagem para clima nublado
    };

    // Condições baseadas na temperatura
    if (condicaoClima.includes('sol') || condicaoClima.includes('parcialmente nublado') || condicaoClima.includes('nublado') || condicaoClima.includes('limpo')) {
        if (temperatura > 25) {
            sugestao = `
                <h4>Hoje está quente!</h4>
                <p>Use roupas leves como camisetas, vestidos, shorts e sandálias.</p>
                <h1>Melhor <span class="destaque">promoção</span> no momento para este clima!<h1>
                <a href="https://www.taco.com.br/bermuda-cargo-flex-khaki-22177-c025/p">
                <img src="${roupas.quente}" alt="Roupas leves" />
                <h3>BERMUDA CARGO FLEX KHAKI</h3>
                <p1>De: R$ 259,90</p1>
                <h3>Por: R$ 199,90</h3>
                <p2>ou em até 2x sem juros.</p2> 
            `;
        } else if (temperatura > 15) {
            sugestao = `
                <h4>Está ameno!</h4>
                <p>Uma camisa de manga longa ou blusa com calças e tênis são boas escolhas.</p>
                <h1>Melhor <span class="destaque">promoção</span> no momento para este clima!<h1>
                <a href="https://www.taco.com.br/calca-jeans-comfort-black-21070-c050/p">
                <img src="${roupas.ameno}" alt="Roupas amenas" />
                <h3>CALÇA JEANS COMFORT</h3>
                <p1>De: R$ 189,90</p1>
                <h3>Por: R$ 149,90</h3>
                <p2>ou em até 2x sem juros.</p2>
            `;
        } else {
            sugestao = `
                <h4>Está frio!</h4>
                <p>Coloque um casaco ou jaqueta, calças mais grossas e botas.</p>
                <h1>Melhor <span class="destaque">promoção</span> no momento para este clima!<h1>
                <a href="https://www.usereserva.com/parka-navy-bicolor0086731/p?skuId=543354">
                <img src="${roupas.frio}" alt="Roupas frias" />
                <h3>PARK NAVY BICOLOR</h3>
                <p1>De: R$ 1499,90</p1>
                <h3>Por: R$ 1424,90</h3>
                <p2>ou em até 2x sem juros.</p2>
            `;
        }
    }

    // Condições de chuva
    if (condicaoClima.includes('chuva') || condicaoClima.includes('chuvisco') || condicaoClima.includes('garoa')) {
        sugestao = `
            <h4>Está chovendo!</h4>
            <p>Use uma jaqueta impermeável, guarda-chuva e botas de chuva.</p>
            <h1>Melhor <span class="destaque">promoção</span> no momento para este clima!<h1>
            <a href="https://www.usereserva.com/jaqueta-casual-sarja0071049/p?skuId=442051">
            <img src="${roupas.chuva}" alt="Roupas de chuva" />
            <h3>JAQUETA CASUAL SARJA</h3>
                <p1>De: R$ 999,90</p1>
                <h3>Por: R$ 949,90</h3>
                <p2>ou em até 2x sem juros.</p2>
        `;
    }

    // Condições de neve
    if (condicaoClima.includes('neve')) {
        sugestao = `
            <h4>Está nevando!</h4>
            <p>Sugiro roupas bem quentes: casacos pesados, luvas, gorro e botas de neve.</p>
            <h1>Melhor <span class="destaque">promoção</span> no momento para este clima!<h1>
            <a href="https://www.usereserva.com/jaqueta-alpes-puffer0070985/p?skuId=434096&utm_campaign=shopping&gad_source=1&gclid=CjwKCAiAxea5BhBeEiwAh4t5K5OgGhI2_5YjOhniBiPotzDzfQhFhdJE7f9D3zaCxFomfBsUxOwluBoCEBQQAvD_BwE">
            <img src="${roupas.neve}" alt="Roupas para neve" />
            <h3>JAQUETA ALPES PUFFER</h3>
                <p1>De: R$ 1299,99</p1>
                <h3>Por: R$ 493,05</h3>
                <p2>ou em até 2x sem juros.</p2>
        `;
    }

    // Condições de vento forte
    if (condicaoClima.includes('vento')) {
        sugestao = `
            <h4>Vento forte!</h4>
            <p>Use roupas resistentes ao vento, como jaquetas cortavento e calças mais grossas.</p>
            <h1>Melhor <span class="destaque">promoção</span> no momento para este clima!<h1>
            <a href="https://www.usereserva.com/jaqueta-melhor-do-mundo0082808/p?skuId=516830">
            <img src="${roupas.vento}" alt="Roupas para vento" />
            <h3>JAQUETA MELHOR DO MUNDO</h3>
            <p1>De: R$ 2499,00</p1>
            <h3>Por: R$ 2374,90</h3>
            <p2>ou em até 2x sem juros.</p2>
        `;
    }

    // Condição de "parcialmente nublado"
    if (condicaoClima.includes('parcialmente nublado')) {
        if (temperatura > 20) {
            sugestao = `
                <h4>Está parcialmente nublado!</h4>
                <p>Use uma roupa leve como uma camisa de manga curta ou blusa, mas leve uma jaqueta leve caso esfrie.</p>
                <h1>Melhor <span class="destaque">promoção</span> no momento para este clima!<h1>
                <a href="https://mofficer.com.br/products/polo-m-c-basic-casual?pr_prod_strat=e5_desc&pr_rec_id=a4e776aab&pr_rec_pid=7099233763443&pr_ref_pid=7099233665139&pr_seq=uniform">
                <img src="${roupas.nublado}" alt="Roupas parcialmente nubladas" />
                <h3>POLO BASIC BLACK</h3>
                <p1>De: R$ 189,90</p1>
                <h3>Por: R$ 159,90</h3>
                <p2>ou em até 2x sem juros.</p2>
            `;
        } else {
            sugestao = `
                <h4>Está parcialmente nublado e mais fresco!</h4>
                <p>Um casaco leve ou uma jaqueta é recomendada, além de calças.</p>
                <h1>Melhor <span class="destaque">promoção</span> no momento para este clima!<h1>
                <a href="https://mofficer.com.br/products/polo-m-c-basic-casual?pr_prod_strat=e5_desc&pr_rec_id=a4e776aab&pr_rec_pid=7099233763443&pr_ref_pid=7099233665139&pr_seq=uniform">
                <img src="${roupas.nublado}" alt="Roupas parcialmente nubladas" />
                <h3>POLO BASIC BLACK</h3>
                <p1>De: R$ 189,90</p1>
                <h3>Por: R$ 159,90</h3>
                <p2>ou em até 2x sem juros.</p2>
            `;
        }
    }

    return sugestao;
}
