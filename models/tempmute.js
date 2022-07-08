const { model, Schema } = require('mongoose')

const timeout = new Schema({
    IDUtente: Number,
    TAGUtente: String,
    IDStaffer: String,
    TAGStaffer: String,
    orarioAttuale: String,
    tempomute: String,
})
module.exports = model("moderazione", timeout)