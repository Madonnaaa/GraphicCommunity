const { MessageEmbed, MessageSelectMenu, MessageActionRow } = require('discord.js')
const config = require('../../config.json')
module.exports = {
    name: "help",
    data: {
        name: "help",
        description: "Lista di tutti i comandi del bot."
    },

    execute(interaction, client) {

        const embed = new MessageEmbed()
        .setTitle(config.emoji.settings + " | __COMANDI__ __BOT__")
        .setDescription(`Tutti i comandi del **bot ufficiale**!\nTutti i __comandi__ del bot sono con lo ${config.emoji.slashcommand}, cosi che non avrai problemi nel capirli.`)
        .setColor("#C61720")
        .addField("Per vedere i vari sistemi, il comando __help__, è __diviso__ in più pagine! Usa il menu sottostante per vedere le varie categorie!", `\n\n*Lista delle categorie...*\n\n${config.emoji.scudo}・**Moderazione**\n${config.emoji.ticket}・**Ticket**\n${config.emoji.giveaway}・**Giveaway**\n${config.emoji.info}・**Info**\n${config.emoji.musica}・**Musica**\n${config.emoji.suggerimento}・**Suggerimenti**`)
        .setFooter({ text: "Graphic Community Bot | Madonnaa_#8736", iconURL: config.server.logoGC })

        const menu = new MessageSelectMenu()
        .setPlaceholder("Seleziona una categoria.")
        .setMaxValues(1)
        .setMinValues(1)
        .setCustomId("menuid")
        .setOptions([
            {
                label: "Moderazione",
                emoji: config.emoji.scudo,
                description: "Lista dei comandi per la moderazione.",
                value: "pag1"
            },
            {
                label: "Giveaway",
                emoji: config.emoji.giveaway,
                description: "Lista dei comandi per la creazione di giveaway.",
                value: "pag2"
            },
            {
                label: "Ticket",
                emoji: config.emoji.ticket,
                description: "Lista dei comandi per la gestione dei ticket.",
                value: "pag3"
            },
            {
                label: "Info",
                emoji: config.emoji.info,
                description: "Lista dei comandi vari del bot.",
                value: "pag4"
            },
            {
                label: "Suggerimenti",
                emoji: config.emoji.suggerimento,
                description: "Comandi per inviare suggerimenti allo staff.",
                value: "pag5"
            },
            {
                label: "Musica",
                emoji: config.emoji.musica,
                description: "Comandi per ascoltare la musica.",
                value: "pag6"
            },
            {
                label: "Owner",
                emoji: "👑",
                value: "pag7",
                description: "Comandi accessibili solo all'owner."
            }
        ])

        const row = new MessageActionRow().addComponents(menu)

        interaction.reply({ content: config.emoji.logoGC + "**Graphic Community | Bot**", embeds: [embed], components: [row] })

    }
}