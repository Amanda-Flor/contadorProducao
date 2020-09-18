const express = require('express')
const routes = require('./routes')
const bodyParser = require('body-parser')

const app = express()

//Configurando para receber JSON
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//Configurações para conexão com o banco
app.use(express.json())
app.use(routes)

//configurar arquivos estáticos
.use(express.static ("public"))

//configuração do nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    autoescape: true,
    express: app,
    noCache: true
});



//notFound
app.use((req, res, next) => {
    const error = new Error("not Found")
    error.status = 404
    next(error)
})

//catch all - captura de todos os erros
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({ error: error.message})
})


app.listen(3333, () => console.log('Server is running'))

