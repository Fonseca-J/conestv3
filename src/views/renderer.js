/**
 * Processos de Renderização
 */

//Botões


function fechar() {
    api.fecharJanela()
}

function clientes() {
    api.janelaClientes()
}

function fornecedores() {
    api.janelaFornecedores()
}
function produtos() {
    api.janelaProdutos()
}
function relatorios() {
    api.janelaRelatorios()
}

// Inserção da data no rodapé

function obterData() {
    const data = new Date()
    const optinons = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return data.toLocaleDateString('pt-BR', optinons)
}
document.getElementById('dataAtual').innerHTML = obterData()