const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')
const moment = require('moment')

module.exports = {
    name: "ban",
    data: {
        name: "ban",
        description: "Banna un utente dal server.",
        options: [
            {
                name: "utente",
                type: "USER",
                required: true,
                description: "Inserisci l'utente da bannare.",
            },
            {
                name: "motivo",
                type: "STRING",
                required: false,
                description: "Inserisci una motivazione del ban.",
            }
        ]
    },

    execute(interaction, client) {

        const utente = interaction.options.getUser("utente")
        const motivo = interaction.options.getString("motivo") || "Nessuna motivazione."

        const errorEmbed = new MessageEmbed()
        .setColor(config.embed.errorColor)
        .setFooter({ text: "Graphic Community | Staff", iconURL: config.server.logoGC })

        if (!interaction.member.permissions.has('BAN_MEMBERS')) {
            errorEmbed.setTitle("Non hai il permesso per eseguire questo comando! `BAN_MEMBERS`")
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }

        const utenteid = interaction.guild.members.cache.get(utente.id)
        if (!utenteid?.bannable) {
            errorEmbed.setTitle("Non hai il permesso di bannare questo utente! (Forse ha un ruolo più alto del tuo👀)")
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true })
        }
//sciao racazzi
        utente.ban()

        const embed = new MessageEmbed()
        .setTitle(`[BAN] ${utente.tag}`)
        .setColor(config.color.darkred)
        .addField(`${config.emoji.scudo} Esecutore`, `*\`${interaction.user.tag}\`*`, true)
        .addField(`💢Utente`, `*\`${utente.tag}\`*`, true)
        .addField(`📝Motivo`, `*\`${motivo}\`*`)
        .setFooter({ text: "Graphic Community | Staff", iconURL: config.server.logoGC })

        interaction.reply({ embeds: [embed] })
      

    }
}