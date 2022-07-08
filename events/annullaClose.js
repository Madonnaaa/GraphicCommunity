const { MessageEmbed } = require('discord.js')
const config = require('../config.json')

module.exports = {
    name: "interactionCreate",
    execute(interaction, client) {

        if (interaction.customId == "annullaid") {

            const embed = new MessageEmbed()
            .setColor(config.color.green)
            .setTitle(config.emoji.ticket + "Eliminazione del ticket annullata!")
            .setFooter({ text: "Graphic Community | Tickets", iconURL: config.server.logoGC })

            interaction.message.edit({ embeds: [embed], components: [] })
        }
    }
}