const { MessageEmbed } = require("discord.js")
const config = require('../config.json')

module.exports = {
    name: "interactionCreate",
    execute(interaction, client) {

        if (interaction.customId == "annullasugid") {
            
            const embed = new MessageEmbed()
            .setTitle(`${config.emoji.suggerimento} Invio del suggerimento annullato!`)
            .setColor("GREEN")
            .setFooter({ text: "Graphic Community | Suggerimenti", iconURL: config.server.logoGC})

            interaction.message.edit({ embeds: [embed], components: [] })
        }
    }
}