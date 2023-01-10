const express = require('express');


const app = express()

app.get('/',(req, res)=>{
    res.write('<h1> Hello From express server</h1>')
    res.end()
})

app.listen(5000,()=>{
    console.log('server running on port 5000')
})