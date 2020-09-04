const express = require("express")
const mongoose = require("mongoose")

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


mongoose.connect('mongodb://localhost:27017/graceful-shutdown', (err => {
    if(err) throw err
    console.info("Mongooose connected")
}))

const User = mongoose.model('User', { name: String })

app.post('/user', async (req, res) => {
    try {
        const user = new User({ name: req.body.username })
        await user.save()
        res.status(201).send('Success!')
    } catch (error) {
        console.error(err)
        res.status(500).send(err.message)
    }
})

app.listen(3000, () => console.info('Example app listening on port 3000!'))