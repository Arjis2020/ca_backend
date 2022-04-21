const Sequelize = require('sequelize')
//const fs = require('fs')
require('dotenv').config()

const sequelize = new Sequelize(process.env.DB, process.env.DB_USERNAME, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    //logging: logger
});

/* function logger(msg){
    try{
        const version = require('./version')
        fs.appendFileSync(__dirname + `/${version}/database.log`, msg.toString() + "\n\n")
    }
    catch(err){
        console.log("Failed to write to log file. See below for the log. \n\n")
        console.log("Error report: " + err.toString() + "\n")
        console.log("The actual sequelize message : " + msg.toString() + "\n\n")
    }
} */

async function init() {
    return new Promise(async (resolve, reject) => {
        try {
            await sequelize.authenticate()
            //global.sequelize = sequelize
            resolve(sequelize)
        }
        catch (err) {
            //throw err
            reject(err)
        }
    })
}

module.exports = { init }