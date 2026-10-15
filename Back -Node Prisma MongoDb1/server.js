const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const app = express();

app.use(cors({ origin: 'http://localhost:5173' })) // libera o acesso à API a partir de outras origens (ex: front-end em outra porta)
app.use(express.json()) // para que o express entenda o formato json

const users = []

// age é Int no schema; formulários e query params enviam texto, então converte
const toAge = (value) => (value === undefined || value === '' ? undefined : Number(value))

app.post('/usuarios', async (req, res) => {

   await prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            age: toAge(req.body.age)
        }
    })

    res.status(201).json(req.body)
})

/*Três principai maneiras de enviar dados na requisição
1º - Query Params => request.query (Ele coloca as informações na URL)exemplo: lojadoseuzé.com/users?name=Diego&idade=18
2º - Route Params => request.params (Quando queremos identificar um recurso específico)exemplo: lojadoseuzé.com/users/1
3º - Request Body => request.body (Ele coloca as informações no corpo da requisição, por ele você pode enviar dados mais complexos)exemplo: lojadoseuzé.com/users

*/
/* */
app.get('/usuarios',async (req, res) => {
    let users = []

   if (req.query) {
        users = await prisma.user.findMany({
            where: {name: req.query.name,
                email: req.query.email,
                age: toAge(req.query.age)
            }
            
        })
    } else {

    users = await prisma.user.findMany()
    }
    res.status(200).json(users)
/*
Rotas precisam de 
1º tipo de rota ou metódo http (GET(ler dados), POST(criar dados), PUT(atualizar tudo), PATCH (atualizar um), DELETE(excluir dados))
2º endereço da rota (ex: lojadoseuzé.com/home, lojadoseuzé.com/users, lojadoseuzé.com/products)
3º função de callback que recebe 2 parâmetros (req, res) que são respectivamente a requisição e a resposta

*/
})

app.put('/usuarios/:id', async (req, res) => {

   await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            name: req.body.name,
            email: req.body.email,
            age: toAge(req.body.age)

        }
    })

    res.status(201).json(req.body) 
    
})

app.delete('/usuarios/:id', async (req, res) => {

    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({ message: 'Usuário deletado com sucesso' })
})

// Captura erros das rotas e devolve JSON em vez do HTML com stack trace
app.use((err, req, res, next) => {
    console.error(err)

    if (err.code === 'P2025') {
        return res.status(404).json({ message: 'Usuário não encontrado' })
    }
    if (err.code === 'P2002') {
        return res.status(409).json({ message: 'Já existe um usuário com esse e-mail' })
    }
    if (err.name === 'PrismaClientInitializationError') {
        return res.status(503).json({ message: 'Não foi possível conectar ao banco de dados' })
    }

    res.status(500).json({ message: 'Erro interno do servidor' })
})

app.listen(3000)

/*
    Criar Api, listagem de Usuários
    -Cirar usuários
    -Listar os Usuários 
    -Editar Usuários
    -Excluir Usuários
*/ 