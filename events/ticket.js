const { MessageEmbed, MessageButton, MessageSelectMenu, MessageActionRow } = require('discord.js')
const { cp } = require('fs')
const config = require('../config.json')

module.exports = {
    name: "interactionCreate",
    execute(interaction, client) {

        if(interaction.customId == "ticketid") {

            interaction.deferUpdate()

            const errorEmbed = new MessageEmbed()
            .setColor(config.embed.errorColor)

        if (interaction.guild.channels.cache.find(ch => ch.topic == `ID Utente: ${interaction.user.id}`)) {
            errorEmbed.setTitle("Hai già un ticket aperto!")
            interaction.user.send({ embeds: [errorEmbed] }).catch(() => { })
            return
        }

        interaction.guild.channels.create(`🎫︱ticket-${interaction.user.username}`, {
            type: "GUILD_TEXT",
            topic: `ID Utente: ${interaction.user.id}`,
            parent: config.server.category.ticket,
            permissionOverwrites: [
                {
                    id: interaction.guild.roles.everyone.id,
                    deny: ["VIEW_CHANNEL"]
                },
                {
                    id: interaction.user.id,
                    allow: ["VIEW_CHANNEL"]
                },
                { 
                    id: config.server.roles.ticketaccess,
                    allow: ["VIEW_CHANNEL"]
                }
            ]
        }).then(ch => {

            const embed = new MessageEmbed()
            .setTitle(`${config.emoji.ticket} TICKET APERTO`)
            .setDescription("Grazie per aver aperto il ticket!\nSeleziona qui sotto la categoria che ti serve!")
            .setColor(config.color.darkred)
            .setFooter({ text: "Graphic Community | Ticket Support", iconURL: config.server.logoGC })

            const menu1 = new MessageSelectMenu()
            .setPlaceholder("Seleziona la categoria.")
            .setCustomId("ticketmenuid")
            .setMaxValues(1)
            .setMinValues(1)
            .setOptions([
                {
                    label: "Shop",
                    description: "Aquisto di grafiche, loghi o altro...",
                    emoji: "💸",
                    value: "shoppag1"
                },
                {
                    label: "Bando",
                    description: "Risposta del bando staff.",
                    emoji: config.emoji.scudo,
                    value: "bandopag2"
                },
                {
                    label: "Partner",
                    description: "Richiesta partner.",
                    emoji: config.emoji.partner,
                    value: "partnerpag3"
                },
                {
                    label: "Supporto",
                    description: "Assistenza generale, o in caso di problemi.",
                    emoji: "❗",
                    value: "supportopag4"
                }
            ])

            const close = new MessageButton()
            .setLabel("Chiudi")
            .setStyle("DANGER")
            .setCustomId("closeid")
            const transcript = new MessageButton()
            .setLabel("Transcript")
            .setStyle("SECONDARY")
            .setCustomId("transcriptid")
            .setDisabled()

            const row = new MessageActionRow().addComponents(close, transcript)
            const row1 = new MessageActionRow().addComponents(menu1)

            ch.send({ content: `${interaction.user}`, embeds: [embed], components: [row, row1] })
            })
        }

    }
}