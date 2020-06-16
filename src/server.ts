import App from './App'
const PORT = 8080

const server = App.run(PORT, () => {
    console.log("App is running ",)
})

process.on("exit", () => {
    console.info('9779 exit')
    server.close()

})

process.on("uncaughtException", (ex) => {
    console.info('9779 exception')
    server.close()

})
process.on('SIGTERM', (sig) => {
    console.info('9779 sig', sig)
})