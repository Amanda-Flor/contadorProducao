const express = require('express')
const routes = require('./routes')

const app = express()


//Configurações para conexão com o banco
app.use(express.json())
app.use(routes)

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


////////////////////////////////////////////////////////////////////////////
//Servidor
// const express = require ('express')
// const server = express()

// const {
//     pageLanding,
//     pageStudy,
//     pageGiveClasses,
//     saveClasses
// } = require('./pages')


// //configurar nunjucks
// const nunjucks = require('nunjucks')//importando o nunjucks para a aplicação
// nunjucks.configure(__dirname + '/views', {
//     express: server,
//     noCache: true,
// })

// //inicio e Configuração do servidor
// server
// //receber os dados do req.body no pages.js
// .use(express.urlencoded({extended: true}))
// //configurar arquivos estáticos
// .use(express.static ("public"))
// //
// //rotas da aplicação
// .get("/", pageLanding)
// .get("/study", pageStudy)
// .get("/give-classes", pageGiveClasses)
// .post("/save-classes", saveClasses)
// //start do servidor
// .listen(5500)

