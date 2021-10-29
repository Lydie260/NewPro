const express = require ('express');
const router = require('./app/routes/index');


const app = express();


app.use(express.json());
app.use(router);

const port = 5000;

app.listen(port,()=>{
    console.log('app is running')
})


