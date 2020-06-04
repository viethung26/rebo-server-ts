import app from './App'
import morgan from 'morgan'
const PORT = 8080

app.use(morgan('dev'))
app.listen(PORT, () => {
    console.log("App is running ",)
})
