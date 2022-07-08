const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')
const config = require('../config.json')

module.exports = {
    name: "interactionCreate",
    execute(interaction, client) {

        if (interaction.customId == "closeid") {

            const embed = new MessageEmbed()
            .setColor(config.color.red)
            .setTitle("Conferma l'eliminazione del ticket!")
            .setFooter({ text: "Graphic Community | Tickets", iconURL: config.server.logoGC })

            const conferma = new MessageButton()
            .setLabel("Conferma")
            .setStyle("SUCCESS")
            .setCustomId("confermaid")
            const annulla = new MessageButton()
            .setLabel("Annulla")
            .setStyle("DANGER")
            .setCustomId("annullaid")

            const row = new MessageActionRow().addComponents(conferma, annulla)

            interaction.reply({ embeds: [embed], components: [row] })
        }
    }
}