const express = require('express')
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.json());

app.post(`/teste`, (req, res) => {    
  console.log(`
    ========= POST =========
    Params: ${JSON.stringify(req.params)}
    Body: ${JSON.stringify(req.body)}
    ========================
  `)
  res.send()
})


app.get(`/teste`, (req, res) => {    
  console.log(`
    ========= GET  =========
    Params: ${JSON.stringify(req.query)}
    Body: ${JSON.stringify(req.body)}
    ========================
  `)
  res.send()
})


app.put(`/teste`, (req, res) => {    
  console.log(`
    ========= PUT  =========
    Params: ${JSON.stringify(req.params)}
    Body: ${JSON.stringify(req.body)}
    ========================
  `)
  res.send()
})

app.listen('9191')