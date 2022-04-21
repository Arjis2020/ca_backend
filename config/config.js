/* const fs = require('fs');
const path = require('path'); */

/* require('dotenv').config({
  path: path.join(__dirname, '..', '..', '..', '.env')
}); */
require('dotenv').config()

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    database: process.env.DB,
    host: process.env.DB_HOST,
    define: {
      underscored: false
    },
    dialect: "mysql",
    logging: null
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    database: process.env.DB,
    host: process.env.DB_HOST,
    define: {
      underscored: false
    },
    dialect: "mysql",
    logging: null
  }
}

/* function logger(msg) {
  try {
    const version = require('../../../version')
    require('../../')
    const path = require('path')
    fs.appendFileSync(path.join(__dirname, '..', '..', '..', `${version}`, 'database.log'), msg.toString() + "\n\n")
  }
  catch (err) {
    console.log("Failed to write to log file. See below for the log. \n\n")
    console.log("Error report: " + err.toString() + "\n")
    console.log("The actual sequelize message : " + msg.toString() + "\n\n")
  }
} */
