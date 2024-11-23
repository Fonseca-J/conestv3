/**
 * Processo de renderização
 * clientes.html
 */

// CROUD CREATE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Passo 1 - Slide (capturar os dados dos inputs do form)
let formCliente = document.getElementById('frmClient')
let nomeCliente = document.getElementById('inputNameClient')
let foneCliente = document.getElementById('inputPhoneClient')
let emailCliente = document.getElementById('inputEmailClient')

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
    emailCli: emailCliente.value
}
api.novoCliente(cliente)

})

// Fimm do Crud create <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


// Reset Form >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
api.resetarFormulario((args) =>{
    
document.getElementById('inputNameClient').value = ""
document.getElementById('inputPhoneClient').value = ""
document.getElementById('inputEmailClient').value = ""

})

// FIM  - reset form <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<