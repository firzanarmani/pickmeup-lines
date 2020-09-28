import App from './config/App'

const app = new App().app
//TODO: dotenv
const PORT = 3000

app.listen(PORT, () => console.log(`Running on port ${PORT}`))
