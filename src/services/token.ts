import jwt from 'jsonwebtoken'
import {injectable} from 'inversify'
const PRIVATE_KEY = `-----BEGIN RSA PRIVATE KEY-----
MIIBPAIBAAJBAKjSE3dpSdlYopImQOSGAKNSusljgehLF7bQTuUzOZHm6GngI3z6
5UboCrPPhjFMsJclXl6iCudWC/HDXNPLS18CAwEAAQJBAKXEohi+6iThQ8D+jvnW
GwpEUeUuMIFIOyDnqpCknAMGgSv5OFcEe2DSux/o4ZFQfudYNnCck3bWcy2FQkwx
SAECIQDP5UbSrUxqDEV4m6NpNJ48mD0Zu7esfemCSPATOXO1/wIhAM/iL8RVva8l
cnerUKR1CQateIH1tkl1GJt3NV9t1iqhAiBn67xTY71m5Wt0tpgg5uSSdadVTbiq
yOYI8lzPv1BQEQIhAJJMkmVQGiAq8HX7oNM8ck+6wXZkoBbuS5UNvggc2n5BAiEA
nGUTaB1/DJRWubqvPEJH+LKaJtmXKB5PiYvZvBPnNg4=
-----END RSA PRIVATE KEY-----`
const PUBLIC_KEY = `
-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKjSE3dpSdlYopImQOSGAKNSusljgehL
F7bQTuUzOZHm6GngI3z65UboCrPPhjFMsJclXl6iCudWC/HDXNPLS18CAwEAAQ==
-----END PUBLIC KEY-----
`
export interface ITokenService {
    sign(payload, options): any
    verify(token, options): any
    decode(token: string): any
}
const defaultOptions = {
    algorithm: "RS256"
}

@injectable()
export default class TokenService implements ITokenService {
    async sign(payload: any, options) {
        
        Object.assign(options, {...defaultOptions, ...options})
        return jwt.sign(payload, PRIVATE_KEY, options)
    }
    async verify(token: string, options:any = {}) {
        Object.assign(options, {...defaultOptions, ...options})
        try {
            return jwt.verify(token, PUBLIC_KEY, options)
        } catch (err) {
            throw err
        }
    }
    async decode(token: string){
        return jwt.decode(token)
    }
}