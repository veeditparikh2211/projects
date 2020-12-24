const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(__dirname + '/../public'))
app.use(bodyParser.json())

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/book_db');

const {Book} = require('./models/books');
const {Store} = require('./models/stores');

app.post('/api/add/books',(req,res)=>{
    console.log(req.body)
    const book = new Book({
        name: req.body.name,
        author: req.body.author,
        pages:  req.body.pages,
        price:  req.body.price,
        stores:  req.body.stores
    });

    book.save((err,doc)=>{
        if(err) res.status(400).send(err);
        res.status(200).send();
    })

})

app.post('/api/add/store',(req,res)=>{

    const store = new Store({
        name:req.body.name,
        address:req.body.address,
        phone:req.body.phone
    });

    store.save((err,doc)=>{
        if(err) res.status(400).send(err);
        res.status(200).send();

    })
});
 app.get('/api/stores',(req,res)=>{

    Store.find((err,doc)=>{
        if(err) res.status(400).send(err);
        res.send(doc)
    })

})
app.get('/api/books',(req,res)=>{

    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let order = req.query.ord ? req.query.ord : 'asc';

    Book.find().sort({_id:order}).limit(limit).exec((err,doc)=>{
        if(err) res.status(400).send(err);
        res.send(doc)
    })

})   




app.get('/api/books/:id',(req,res)=>{
    Book.findById(req.params.id,(err,doc)=>{
        if(err) res.status(400).send(err);
        res.send(doc)
    })
})

const port = 3000;
app.listen(port,()=>{
console.log(`Server up on port ${port}`)

})