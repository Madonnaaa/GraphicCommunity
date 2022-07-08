const { Schema, model} = require("mongoose")

const ticket = new Schema({
    ticketID: String,
    ownerID: String,
    locked: Boolean
})

module.exports = model("TicketXen", ticket)