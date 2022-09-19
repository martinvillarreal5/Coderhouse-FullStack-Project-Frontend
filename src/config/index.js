import 'dotenv/config'

const serverConfig = {
    port: process.env.PORT,
    secret: process.env.SECRET || 'mySecret'
}

export {
    serverConfig,
}