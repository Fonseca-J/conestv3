/**
 * Segurança e Desempenho
 */

const { contextBridge, ipcRenderer} = require('electron')

// Estabelecer a conexão com o Banco (pedindo para o main)
ipcRenderer.send('db-connect')

// Processos de comunicação entre renderer e main
contextBridge.exposeInMainWorld('api', {
    // A linha abaixo cria uma função que envia uma mensagem ao processo principal
    fecharJanela: () => ipcRenderer.send('close-about'), 
    janelaClientes: () => ipcRenderer.send('open-client'),
    janelaFornecedores: () => ipcRenderer.send('open-supplier'),
    janelaProdutos: () => ipcRenderer.send('open-product'),
    janelaRelatorios: () => ipcRenderer.send('open-report')
})