import dotenv from 'dotenv'
//9779 knowledge
const result = dotenv.config({path: `${__dirname}/../../.env`})
console.info('9779 config', result)
