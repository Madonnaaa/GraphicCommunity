const { Database } = require('../config.json') 
const mongoose = require('mongoose')
module.exports = {
    name: "ready",
    execute(client) {
        client.user.setActivity(
            "i ticket.", {
                type: "WATCHING"
            }
        )

        console.log("<=== Online ===>")

        if(!Database) return console.log("<=== Errore | Connesso Database ===>");
        mongoose.connect(Database, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => {
            console.log("<=== Connesso Database ===>")
        }).catch((err) => {
            console.log(err)
        })
    }
}