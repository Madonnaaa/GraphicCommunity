const { model, Schema } = require('mongoose')
const mongoose = require("mongoose");

const suggerimenti = new Schema({
    testo: String,
    IDUtente: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
    },
    TAGUtente: String,
})
module.exports = model("Suggerimenti", suggerimenti)