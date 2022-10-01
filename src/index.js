const express = require("express")

// FACE DATABSE
let books = []

// criar o APP
const app = express()

// *api passa entender que esta lidando com json, servindo paginas estaticas
app.use(express.json())

app.post("/books", (req, res) => {
    const { id, title, author, publishedAt } = req.body
    const book = { id, title, author, publishedAt }
    books.push(book)    
    return res.status(201).json(book)
})

app.get('/books', (req, res) => {
    const allBooks = books
    return res.status(200).json(allBooks)
})

app.get('/books/:book_id', (req, res) => {
    const { book_id } = req.params
    const book = books.find((book) => book.id === book_id )
    if (!book) res.status(404).json('not found')
    return res.status(200).json(book)
})

app.delete('/books/:book_id', (req, res) => {
    const { book_id } = req.params
    const filteredBooks = books.filter(book => book.id !== book_id)
    books = filteredBooks
    return res.status(204).json('deleted')
})

app.patch('/books/:book_id', (req, res) => {
    const { author, title, publishedAt } = req.body
    const { book_id } = req.params
    const book = books.find((book) => book.id === book_id)
    book.id = book.id
    book.title = title ? title : book.title
    book.author = author ? author : book.author
    book.publishedAt = publishedAt ? publishedAt : book.publishedAt
    return res.status(200).json(book)
})

// MANDAR O SERVIDOR RODAR
app.listen(3333, () => console.log('Server is running'))
