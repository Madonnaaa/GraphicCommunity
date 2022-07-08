const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')
const config = require('../../config.json')

module.exports = {
    name: "ticket",
    data: {
        name: "ticket",
        description: "Comando per la gestione dei ticket.",
        options: [
            {
                name: "panel",
                type: "SUB_COMMAND",
                required: false,
                description: "Invia il pannello dei ticket."
            }
        ]
    },

    execute(interaction, client) {
        
        const embed = new MessageEmbed()
        .setTitle(`${config.emoji.ticket} TICKET`)
        .setDescription("Spingi qui sotto il bottone per aprire un ticket!\nAppena aprirai il ticket ti troverai un menu davanti, seleziona ciò di cui ti interessa, e lo staff ti  rispondera, o ti aiuterà!\n\n⚠Non aprire ticket senza motivo! Porterà a prendere proveddimenti da parte dello staff!")
        .setColor(config.color.darkred)
        .setFooter({ text: "Graphic Community | Tickets", iconURL: config.server.logoGC })
        .setThumbnail(config.server.logoGC)

        const button = new MessageButton()
        .setLabel("Apri Ticket")
        .setStyle("DANGER")
        .setCustomId("ticketid")
        .setEmoji(config.emoji.ticket)

        const row = new MessageActionRow().addComponents(button)

        interaction.reply({ embeds: [embed], components: [row] })

    }
}