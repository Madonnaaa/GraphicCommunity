const DiscordJS = require("discord.js")
const settings = require('../settings.json')
const ticketsModel = require("../models/ticketxen")

module.exports = {
    name: "interactionCreate", 
    async execute(interaction, client) {

    if (interaction.isButton()) {
        if (interaction.customId == "open") {
            const ticketsData = await ticketsModel.findOne({ ownerID: interaction.user.id }).catch((err) => console.log(err))

            if (ticketsData) return await interaction.reply({ content: `**Hai già un ticket aperto!** (${interaction.guild.channels.cache.get(ticketsData.ticketID).toString()})`, ephemeral: true }) 

            const ticketChannel = await interaction.guild.channels.create(
                `ticket-${interaction.user.username}`, { // The name of the ticket
                    type: "GUILD_TEXT",
                    parent: settings.TICKETS_CATEGORY_ID, // Set the ticket category
                    permissionOverwrites: [
                        {
                            id: interaction.guild.roles.everyone.id, // Remove the permission to view the ticket from everyone
                            deny: ["VIEW_CHANNEL"]
                        }, {
                            id: interaction.user.id, // Add the permission to view the ticket to the user
                            allow: ["VIEW_CHANNEL"]
                        }, {
                            id: settings.SUPPORT_ROLE_ID, // Add the permission to view the ticket to the support role
                            allow: ["VIEW_CHANNEL"]
                        }
                    ]
                }
            )

            ticketChannel.send({
                content: `${interaction.user.toString()} grazie per aver aperto il ticket!`,
                components: [
                    new DiscordJS.MessageActionRow()
                    .addComponents(
                        new DiscordJS.MessageButton()
                        .setCustomId("close")
                        .setLabel("Close ticket")
                        .setStyle("DANGER"),
                        new DiscordJS.MessageButton()
                        .setCustomId("unlock")
                        .setLabel("Unlock ticket")
                        .setStyle("SUCCESS")
                    )
                ]
            })

            new ticketsModel({
                ticketID: interaction.channelId,
                ownerID: interaction.user.id,
                locked: true
            }).save()
        } else if (interaction.customId == "unlock") {
            const ticketsData = await ticketsModel.findOne({ ticketID: interaction.channelId }).catch((err) => console.log(err))

            if (!ticketsData) return await interaction.deferUpdate().catch(() => {}) 
            if (ticketsData.locked == false) return await interaction.reply({ content: "Il ticket non è più visibile al server.", ephemeral: true }) 

            await interaction.channel.permissionOverwrites.edit(
                interaction.guild.roles.everyone, {
                    VIEW_CHANNEL: true 
                }
            )
            await interaction.reply({ content: "Il ticket è visibile a tutto il server." })

            interaction.message.edit({
                content: interaction.message.content,
                components: [
                    new DiscordJS.MessageActionRow()
                    .addComponents(
                        new DiscordJS.MessageButton()
                        .setCustomId("close")
                        .setLabel("Close ticket")
                        .setStyle("DANGER"),
                        new DiscordJS.MessageButton()
                        .setCustomId("lock")
                        .setLabel("Lock ticket")
                        .setStyle("SUCCESS")
                    )
                ]
            })
        } else if (interaction.customId == "lock") {
            const ticketsData = await ticketsModel.findOne({ ticketID: interaction.channelId }).catch((err) => console.log(err))

            if (!ticketsData) return await interaction.deferUpdate().catch(() => {}) 
            if (ticketsData.locked == true) return await interaction.reply({ content: "Il ticket non è più visibile al server.", ephemeral: true }) 

            await interaction.channel.permissionOverwrites.edit(
                interaction.guild.roles.everyone, {
                    VIEW_CHANNEL: false 
                }
            )
            await interaction.reply({ content: "Il ticket è visibile a tutto il server." })

            interaction.message.edit({
                content: interaction.message.content,
                components: [
                    new DiscordJS.MessageActionRow()
                    .addComponents(
                        new DiscordJS.MessageButton()
                        .setCustomId("close")
                        .setLabel("Close ticket")
                        .setStyle("DANGER"),
                        new DiscordJS.MessageButton()
                        .setCustomId("unlock")
                        .setLabel("Unlock ticket")
                        .setStyle("SUCCESS")
                    )
                ]
            })
        } else if (interaction.customId == "close") {
            const ticketsData = await ticketsModel.findOne({ ticketID: interaction.channelId }).catch((err) => console.log(err))

            if (!ticketsData) return await interaction.deferUpdate().catch(() => {}) // Check if the channel is a ticket

            await interaction.channel.delete().catch(() => {})
            await ticketsModel.findOneAndDelete({ ticketID: interaction.channelId }).catch((err) => console.log(err))
        }
    }
}}