const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send("running successfully1")
})

const port = process.env.PORT || 8080

app.listen(port, (req, res) => {
    console.log(`listening on port o ${port}`)
})
