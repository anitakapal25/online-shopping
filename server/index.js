const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors())

console.log(app);

app.get('/',(req,res)=>{
    res.send('Hello from server');
})

const port = process.env.PORT || 8001

app.listen(port,()=>{
    console.log(`Listening to port ${port}`);
})