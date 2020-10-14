const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')

const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 3000

const chatBotRoutes = require('./src/routes/chatbot.route')
const agentRoutes = require('./src/routes/agent.route')
const billTransactionRoutes = require('./src/routes/bill-transaction.route')
const userRoutes = require('./src/routes/user.route')
const subUserRoutes = require('./src/routes/subUser.route')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use('/chatbots', chatBotRoutes)
app.use('/agents', agentRoutes)
app.use('/bill-transactions', billTransactionRoutes)
app.use('/users', userRoutes)
app.use('/sub-users', subUserRoutes)

app.use((req, res, next) => {
    const error = new Error('Not *Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            msg: error.message
        }
    })
})

server.listen(port, () => {
    console.log(`Server started on Port ${port}!`)
})