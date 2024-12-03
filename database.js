/**
 * Módulo de conexão com o banco de dados
 * Uso do mongoose
 */

const mongoose = require('mongoose')

// definir a URL e autenticação do banco de dados 
const url = 'mongodb+srv://admin:123senac@conest.0ul5b.mongodb.net/dbfonsconest' // ao final da URL acrescentar o nome do banco de dados

// Status de conexão (icone de conexão)
let isConnected = false

// Só estabelecer uma nova conexão se não estiver conectado
const dbConnect = async () => {
    if (isConnected === false) {
        await conectar()
    }
}

// Conectar
const conectar = async () => {
    if (isConnected === false) {
        try {
            // alinha abaixo abre a conexão com o MongoDB
            await mongoose.connect(url)
            isConnected = true // sinalizar que o banco está conectado
            console.log('MongoDB conectado')
        } catch (erro) {
            console.log(`Problema detectado: ${error}`)
        }
    }
}

// Desconectar
const desconectar = async () => {
    if (isConnected === true) {
        try {
            // alinha abaixo encerra a conexão com o MongoDB
            await mongoose.disconnect(url)
            isConnected = false // sinalizar que o banco não está conectado
            console.log('MongoDB desconectado')
        } catch (erro) {
            console.log(`Problema detectado: ${error}`)
        }
    }
}

// Exportar para o "main" as funções desejadas
module.exports = {dbConnect, desconectar}