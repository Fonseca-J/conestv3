/**
 * Modelo de Dados (Clientes)
 */

// Importação de recursos
const { model, Schema } = require('mongoose')

//Criação da estrutura de dados ("tabela") que será usada no banco
const clienteSchema = new Schema ({
    nomeCliente: {
        type: String
    },
    foneCliente: {
        type: String
    },
    emailCliente: {
        type: String
    },
    cepCliente: {
        type: String
    },
    logradouroCliente: {
        type: String
    },
    bairroCliente: {
        type: String
    },
    cidadeCliente: {
        type: String
    },
    ufCliente: {
        type: String
    }
    
})

// Exportar para arqivo main.js
module.exports = model('Clientes', clienteSchema )