import 'dotenv/config'

const dbConfig = {
    dbURL: process.env.DATABASE_URL,
    mongoDbPassword: process.env.MONGODBPASSWORD
}

const serverConfig = {
    port: process.env.PORT,
}

export {
    dbConfig,
    serverConfig,
}