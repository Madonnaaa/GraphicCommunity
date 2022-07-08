const { model, Schema } = require('mongoose')

const suggerimenti = new Schema({
    TicketID: Number,
    IDUtente: Number,
    TAGUtente: String,
    

})
module.exports = model("Suggerimenti", suggerimenti)