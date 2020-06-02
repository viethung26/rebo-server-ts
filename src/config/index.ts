import './configEnv'
console.info('9779 env', process.env)

export const config = {
    database: {
        mongo: process.env.MONGOLOCAL_URI
    }
}