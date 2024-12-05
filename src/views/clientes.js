/**
 * Processo de renderização
 * clientes.html
 */

// Array  - Usado nos métodos para a manipulação da estrutura do dados
let arrayCliente = []

// CROUD CREATE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Passo 1 - Slide (capturar os dados dos inputs do form)
let formCliente = document.getElementById('frmClient')
let nomeCliente = document.getElementById('inputNameClient')
let foneCliente = document.getElementById('inputPhoneClient')
let emailCliente = document.getElementById('inputEmailClient')
let cepCliente = document.getElementById('inputCepClient')
let logradouroCliente = document.getElementById('inputLogradouroClient')
let bairroCliente = document.getElementById('inputBairroClient')
let cidadeCliente = document.getElementById('inputCidadeClient')
let ufCliente = document.getElementById('inputUfClient')

// Evento assiciado do botão adicionar (quando o botão for pressionado)
formCliente.addEventListener('submit', async (event) => {
    //  evitar o comportamentopadrao de envio em um form
    event.preventDefault()
    // alert(nomeCliente, foneCliente, emailCliente)
    // teste importante! (fluxo dos dados)
    //console.log(nomeCliente.value, foneCliente.value, emailCliente.value)

    // Passo 2 - Slide (envio das infomações para o main)
    // Criar um objeto
    const cliente = {
        nomeCli: nomeCliente.value,
        foneCli: foneCliente.value,
        emailCli: emailCliente.value,
        cepCli: cepCliente.value,
        logradouroCli: logradouroCliente.value,
        bairroCli: bairroCliente.value,
        cidadeCli: cidadeCliente.value,
        ufCli: ufCliente.value
    }
    api.novoCliente(cliente)

})

// Fimm do Crud create <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD READ >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function buscarCliente() {
    // alert ('teste do botão buscar') TESTAR O BOTÃO TESTAR
    // Passo 1 (slides)
    let cliNome = document.getElementById('searchClient').value
    console.log(cliNome) // teste do passo I
    // Passo 2 (slides) - Enviar o pedido de busca do cliente ao main
    api.buscarCliente(cliNome)
    // Passo 5 - Recebimento dos dados do Cliente
    api.renderizarCliente((event, dadosCliente) => {
        //(teste de recebimento do dados do cliente)
        console.log(dadosCliente)

        // Passo IV: (slide) Renderização dos dados do cliente no formulário
        const clienteRenderizado = JSON.parse(dadosCliente)
        arrayCliente = clienteRenderizado
        // Teste para entendimento da lógica
        console.log(arrayCliente)
        // percorrer o array de clientes, extarir os dados e setar (preencher) os campos do formulário
        arrayCliente.forEach((c) => {
            document.getElementById('inputNameClient').value = c.nomeCliente
            document.getElementById('inputPhoneClient').value = c.foneCliente
            document.getElementById('inputEmailClient').value = c.emailCliente
            document.getElementById('inputClient').value = c._id
        })
    })
}

// FIM DO CRUD READ >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Função para preencher os dados de endereço automaticamente
cepCliente.addEventListener('blur', async () => {
    let cep = cepCliente.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (cep.length === 8) { // Verifica se o CEP tem 8 dígitos
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (data.erro) {
                alert("CEP não encontrado!");
            } else {
                logradouroCliente.value = data.logradouro;
                bairroCliente.value = data.bairro;
                cidadeCliente.value = data.localidade;
                ufCliente.value = data.uf;
            }
        } catch (error) {
            console.log("Erro ao buscar CEP:", error);
            alert("Erro ao buscar o CEP.");
        }
    }
})

// Mapeamento de DDDs por estado ou cidade
const dddMapping = {
    // Região Norte
    "AC": 68, // Acre
    "AM": 92, // Amazonas
    "AP": 96, // Amapá
    "PA": 91, // Pará
    "RO": 69, // Rondônia
    "RR": 95, // Roraima
    "TO": 63, // Tocantins

    // Região Nordeste
    "AL": 82, // Alagoas
    "BA": 71, // Bahia
    "CE": 85, // Ceará
    "MA": 98, // Maranhão
    "PB": 83, // Paraíba
    "PE": 81, // Pernambuco
    "PI": 86, // Piauí
    "RN": 84, // Rio Grande do Norte
    "SE": 79, // Sergipe

    // Região Centro-Oeste
    "DF": 61, // Distrito Federal
    "GO": 62, // Goiás
    "MT": 65, // Mato Grosso
    "MS": 67, // Mato Grosso do Sul

    // Região Sudeste
    "ES": 27, // Espírito Santo
    "MG": 31, // Minas Gerais
    "RJ": 21, // Rio de Janeiro
    "SP": 11, // São Paulo

    // Região Sul
    "PR": 41, // Paraná
    "RS": 51, // Rio Grande do Sul
    "SC": 48, // Santa Catarina

}

// Função para buscar o DDD com base na UF ou Cidade
function getDDD(uf, cidade) {
    // Se a cidade específica estiver mapeada, use-a
    if (dddMapping[cidade]) {
        return dddMapping[cidade];
    }
    // Caso contrário, use o DDD geral do estado (UF)
    return dddMapping[uf] || "Desconhecido";
}

// Função para preencher os dados de endereço e DDD automaticamente
cepCliente.addEventListener('blur', async () => {
    let cep = cepCliente.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (cep.length === 8) { // Verifica se o CEP tem 8 dígitos
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (data.erro) {
                // alert("CEP não encontrado!");
            } else {
                logradouroCliente.value = data.logradouro;
                bairroCliente.value = data.bairro;
                cidadeCliente.value = data.localidade;
                ufCliente.value = data.uf;

                // Determina o DDD baseado na UF ou cidade
                const ddd = getDDD(data.uf, data.localidade);
                foneCliente.value = `(${ddd}) `;
            }
        } catch (error) {
            console.log("Erro ao buscar CEP:", error);

        }
    }
})


// Reset Form >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
api.resetarFormulario((args) => {

    document.getElementById('inputNameClient').value = ""
    document.getElementById('inputPhoneClient').value = ""
    document.getElementById('inputEmailClient').value = ""
    document.getElementById('inputCepClient').value = ""
    document.getElementById('inputLogradouroClient').value = ""
    document.getElementById('inputBairroClient').value = ""
    document.getElementById('inputCidadeClient').value = ""
    document.getElementById('inputUfClient').value = ""
})

// FIM  - reset form <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<