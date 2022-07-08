const { MessageEmbed } = require("discord.js")
const config = require('../config.json')
const db = require('../models/suggerimenti.js')

module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {

        if (interaction.customId == "confermasugid") {
            interaction.deferUpdate()

            const data =  await db.findOne({ IDUtente: interaction.user.id })
            if(!data) return;

            const embed = new MessageEmbed()
            .setTitle(`${config.emoji.suggerimento} Suggerimento inviato..`)
            .setColor("GREEN")
            .setFooter({ text: "Graphic Community | Suggerimenti", iconURL: config.server.logoGC})

            interaction.message.edit({ embeds: [embed], components: [] })

            const embedlogs = new MessageEmbed()
            .setTitle(config.emoji.suggerimento + " NUOVO SUGGERIMENTO")
            .setDescription("Un nuovo suggerimento è arrivato, controlla qui sotto le varie informazioni!")
            .setTimestamp()
            .setThumbnail(config.server.logoGC)
            .addField("IDUtente:", `${data.IDUtente}`, true)
            .addField("TAGUtente:", `${data.TAGUtente}`, true)
            .addField("Suggerimento:", `${data.testo}`)

            const logs = interaction.guild.channels.cache.get(config.server.Schannels.suggerimenti)

            logs.send({ embeds: [embedlogs] })
        }
    }
}