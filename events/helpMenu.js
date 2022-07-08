const { MessageEmbed } = require('discord.js')
const config = require('../config.json')

module.exports = {
    name: "interactionCreate",
    execute(interaction, client) {

        if (interaction.customId == "menuid") {
            interaction.deferUpdate()

            switch (interaction.values[0]) {
                case "pag1": {
                    const embed = new MessageEmbed()
                        .setTitle(`${config.emoji.scudo} COMANDI | MODERAZIONE`)
                        .setColor("#C61720")
                        .setDescription(`${config.emoji.slashcommand}ban [utente] [motivo]\n${config.emoji.slashcommand}kick [utente] [motivo]`)

                    interaction.message.edit({ embeds: [embed] })
                } break
                case "pag2": {
                    const embed = new MessageEmbed()
                        .setTitle(`${config.emoji.giveaway} COMANDI | GIVEAWAY`)
                        .setColor("#C61720")
                        .setDescription(`${config.emoji.slashcommand}giveaway crea [canale] [durata] [vincitori] [premio]\n${config.emoji.slashcommand}giveaway elimina [id giveaway]\n${config.emoji.slashcommand}giveaway reroll [id giveaway]\n${config.emoji.slashcommand}giveaway stop [id giveaway]`)

                    interaction.message.edit({ embeds: [embed] })
                } break
                case "pag3": {
                    const embed = new MessageEmbed()
                        .setTitle(`${config.emoji.ticket} COMANDI | TICKET`)
                        .setColor("#C61720")
                        .setDescription(`${config.emoji.slashcommand}ticket panel\n${config.emoji.slashcommand}ticket add [utente]\n${config.emoji.slashcommand}ticket remove [utente]`)

                    interaction.message.edit({ embeds: [embed] })
                } break
                case "pag4": {
                    const embed = new MessageEmbed()
                        .setTitle(`${config.emoji.info} COMANDI | INFO`)
                        .setColor("#C61720")
                        .setDescription(`${config.emoji.slashcommand}help\n${config.emoji.slashcommand}faq`)

                    interaction.message.edit({ embeds: [embed] })
                } break
                case "pag5": {
                    const embed = new MessageEmbed()
                        .setTitle(`${config.emoji.suggerimento} COMANDI | SUGGERIMENTI`)
                        .setColor("#C61720")
                        .setDescription(`${config.emoji.slashcommand}suggerimento [testo]`)

                    interaction.message.edit({ embeds: [embed] })
                } break
                case "pag6": {
                    const embed = new MessageEmbed()
                        .setTitle(`${config.emoji.musica} COMANDI | MUSICA`)
                        .setColor("#C61720")
                        .setDescription(`${config.emoji.slashcommand}play [link/nome canzone]\n${config.emoji.slashcommand}stop\n${config.emoji.slashcommand}pause\n${config.emoji.slashcommand}resume\n${config.emoji.slashcommand}loop\n${config.emoji.slashcommand}volume [numero]\n${config.emoji.slashcommand}queue`)

                    interaction.message.edit({ embeds: [embed] })
                } break
                case "pag7": {
                    const embed = new MessageEmbed()
                        .setTitle(`👑 COMANDI | OWNER`)
                        .setColor("#C61720")
                        .setDescription(`${config.emoji.slashcommand}status\n${config.emoji.slashcommand}test`)

                    interaction.message.edit({ embeds: [embed] })
                } break
            }
        }
    }
}