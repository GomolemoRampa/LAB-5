const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('whoami', (req, res) => {
    res.status(200).send('2676309');
});

app.get('books', (req, res)=>{
    res.status(200).json(books);
});

app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) return res.status(404).send("Book not found");
    res.status(200).json(book);
});

//creating new books
app.post('/books', (req, res) => {
    const { id, title, details } = req.body;

    //validating required id and the book title
    if (!id || !title) {
        return res.status(400).send("ID and Title are required");
    }

    const newBook = {
        id,
        title,
        details: details || [] //here we ensure details exist in an array even though they not provided
    };

    books.push(newBook);
    res.status(201).json(newBook);
});

app.put('/books/:id', (req, res) => {
    const index = books.findIndex(b => b.id === req.params.id);
    if (index === -1) return res.status(404).send("Book not found");

    // Update title if provided in the body
    if (req.body.title) {
        books[index].title = req.body.title;
    }
    
    res.status(200).json(books[index]);
});


app.delete('/books/:id', (req, res) => {        //deleting a book
    const index = books.findIndex(b => b.id === req.params.id);
    if (index === -1) return res.status(404).send("Book not found");

    books.splice(index, 1);
    res.status(200).send("Book deleted successfully");
});


app.post('/books/:id/details', (req, res) => {      //passing details to a book object
    const book = books.find(b => b.id === req.params.id);
    if (!book) return res.status(404).send("Book not found");

    const { id, author, genre, publicationYear } = req.body;
    const newDetail = { id, author, genre, publicationYear };

    book.details.push(newDetail);
    res.status(201).json(newDetail);
});


app.delete('/books/:id/details/:detailId', (req, res) => {      //deleting some aspects of a book
    const book = books.find(b => b.id === req.params.id);
    if (!book) return res.status(404).send("Book not found");

    const detailIndex = book.details.findIndex(d => d.id === req.params.detailId);
    if (detailIndex === -1) return res.status(404).send("Detail not found");

    book.details.splice(detailIndex, 1);
    res.status(200).send("Detail removed successfully");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

let books = [];
