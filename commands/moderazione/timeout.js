const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')
const ms = require('ms')

module.exports = {
    name: "timeout",
    data: {
        name: "timeout",
        description: "Muta un utente con una durata.",
        options: [
            {
                name: "utente",
                description: "Inserisci l'utente da mutare.",
                required: true,
                type: "USER"
            },
            {
                name: "durata",
                description: "Inserisci la durata del timeout.",
                required: true,
                type: "STRING"
            },
            {
                name: "motivo",
                description: "Inserisci la motivazione del timeout.",
                required: true,
                type: "STRING"
            }
        ]
    },
    async execute(interaction, client) {
        
        const utente = interaction.options.getUser('utente')
        const durata = interaction.options.getString('durata')
        const motivo = interaction.options.getString('motivo')
        const membro = interaction.guild.members.cache.get(utente.id)
        
        
        const durataInMs =  ms(durata)
        
        const embed = new MessageEmbed()
        .setTitle(`[TIMEOUT] ${utente.tag}`)
        .setColor(config.color.darkred)
        .setDescription("Sei stato messo in timeout!")
        .addField(`${config.emoji.scudo} Esecutore`, `*\`${interaction.user.tag}\`*`, true)
        .addField(`💢Utente`, `*\`${utente.tag}\`*`, true)
        .addField(`📝Motivo`, `*\`${motivo}\`*`)
        .addField(`⌚Durata`, `*\`${durata}\`*`)
        .setFooter({ text: "Graphic Community | Staff", iconURL: config.server.logoGC })

        const embed1 = new MessageEmbed()
        .setTitle(`[TIMEOUT] ${utente.tag}`)
        .setColor(config.color.darkred)
        .addField(`${config.emoji.scudo} Esecutore`, `*\`${interaction.user.tag}\`*`, true)
        .addField(`💢Utente`, `*\`${utente.tag}\`*`, true)
        .addField(`📝Motivo`, `*\`${motivo}\`*`)
        .addField(`⌚Durata`, `*\`${durata}\`*`)
        .setFooter({ text: "Graphic Community | Staff", iconURL: config.server.logoGC })

        const errorEmbed = new MessageEmbed()
        .setColor(config.embed.errorColor)
        .setFooter({ text: "Graphic Community | Staff", iconURL: config.server.logoGC })

        try {
            await membro.send({ embeds: [embed] })
        } catch (error) {
            errorEmbed.setTitle("L'utente ha i dm chiusi.")
            interaction.reply({ embeds: [errorEmbed] })
        }

        try {
            await membro.timeout(durataInMs, motivo)
            interaction.reply({ embeds: [embed1] })
        } catch (error) {
            console.error(error)
        }

    }
}