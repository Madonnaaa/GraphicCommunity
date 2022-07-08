const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')
const config = require('../../config.json')
const db = require('../../models/suggerimenti.js')

module.exports = {
    name: "suggerimento",
    data: {
        name: "suggerimento",
        description: "Crea, e invia un suggerimento allo staff.",
        options: [
            {
                name: "testo",
                type: "STRING",
                description: "Inserisci il suggerimento da inviare.",
                required: true
            }
        ]
    },
    async execute(interaction, client) {

        const text = interaction.options.getString("testo")

        const server = interaction.guild.id
        const iduser = interaction.user.id
        const taguser = interaction.user.tag


        let data
        try {
            data = await db.findOne({ IDutente: interaction.user.id })
            if (!data) {
                db.create({ testo: text, GuildID: server, IDUtente: iduser, TAGUtente: taguser })
            }
        } catch (err) {
            console.log(err)
        }

        data.testo = text;
        await data.save()

        const embed = new MessageEmbed()
            .setTitle(`${config.emoji.suggerimento} SUGGERIMENTO CREATO`)
            .setDescription("Spingi conferma, per confermare l'invio del tuo suggerimento.")
            .addField(`Il tuo suggerimento:`, `${text}`)
            .setColor(config.color.darkred)

        const conferma = new MessageButton()
            .setLabel("Conferma")
            .setStyle("SUCCESS")
            .setCustomId("confermasugid")
        const annulla = new MessageButton()
            .setLabel("Annulla")
            .setStyle("DANGER")
            .setCustomId("annullasugid")

        const row = new MessageActionRow().addComponents(conferma, annulla)

        interaction.reply({ embeds: [embed], components: [row] })
    }
}