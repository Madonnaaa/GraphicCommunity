const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')
const moment = require('moment')

module.exports = {
    name: "kick",
    data: {
        name: "kick",
        description: "Kicka un utente dal server.",
        options: [
            {
                name: "utente",
                type: "USER",
                required: true,
                description: "Inserisci l'utente da kickare.",
            },
            {
                name: "motivo",
                type: "STRING",
                required: false,
                description: "Inserisci una motivazione del kick.",
            }
        ]
    },

    execute(interaction, client) {

        const utente = interaction.options.getUser("utente")
        const motivo = interaction.options.getString("motivo") || "Nessuna motivazione."

        const errorEmbed = new MessageEmbed()
        .setColor(config.embed.errorColor)
        .setFooter({ text: "Graphic Community | Staff", iconURL: config.server.logoGC })

        if (!interaction.member.permissions.has('KICK_MEMBERS')) {
            errorEmbed.setTitle("Non hai il permesso per eseguire questo comando! `KICK_MEMBERS`")
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }

        const utenteid = interaction.guild.members.cache.get(utente.id)
        if (!utenteid?.kickable) {
            errorEmbed.setTitle("Non hai il permesso di kickare questo utente! (Forse ha un ruolo più alto del tuo👀)")
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true })
        }

        utente.kick()

        const embed = new MessageEmbed()
        .setTitle(`[KICK] ${utente.tag}`)
        .setColor(config.color.darkred)
        .addField(`${config.emoji.scudo} Esecutore`, `*\`${interaction.user.tag}\`*`, true)
        .addField(`💢Utente`, `*\`${utente.tag}\`*`, true)
        .addField(`📝Motivo`, `*\`${motivo}\`*`)
        .setFooter({ text: "Graphic Community | Staff", iconURL: config.server.logoGC })

        interaction.reply({ embeds: [embed] })

    }
}