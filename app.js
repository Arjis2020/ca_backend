const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const cors = require('cors')
//import DB
const db = require('./database')

//init db
db.init().then(() => {
    console.log("Database connection OK \n\n")

    //allow cors
    app.use(cors())
    app.options('*', cors())
    app.use((req, res, next) => {
        res.append("Access-Control-Expose-Headers", "*")
        next()
    })
    app.set('trust proxy', true);

    //init routes
    //import routes
    const ca = require('./routes/ca')
    app.use('/current_affairs', ca)

    //crons
    const caCron = require('./crons/ca.cron')
    caCron.start()

    app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))
})

