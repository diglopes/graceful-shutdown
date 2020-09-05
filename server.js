const express = require("express")
const mongoose = require("mongoose")
const debug = require("debug")
const info = debug("server:info")
const error = debug("Server:error")

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


mongoose.connect('mongodb://localhost:27017/graceful-shutdown', (err => {
    if(err) {
        error(err.message)
        throw err
    }
    info("Mongooose connected")
}))

const User = mongoose.model('User', { name: String })

app.post('/user', async (req, res) => {
    try {
        const user = new User({ name: req.body.username })
        await user.save()
        res.status(201).send('Success!')
    } catch (err) {
        error(err.message)
        res.status(500).send(err.message)
    }
})

const server = app.listen(3000, () => info('Example app listening on port 3000!'))

process.on('SIGTERM', () => {
    info('SIGTERM signal received!')  
    info("Closing http server")
    server.close(() =>  {
        info("Http server closed");
        mongoose.connection.close(false, () => {
            info("Mondodb connection close")
            process.exit(0)
        })
    })  
})