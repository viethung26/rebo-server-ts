import './configEnv'

export const config = {
    database: {
        mongo: process.env.MONGOLOCAL_URI
    }
}