import express from 'express';

const app = new express();
const port = 3000;

app.get('/', (req,res)=>{
    res.send("Listening");
})

app.listen(port,()=>{
    console.log(`Listening on port: ${port}`);
})

app.get('/login', function (req, res) {
    res.send('<h1>Estás en la página de login</h1>');
});
