const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')

const { DisTube } = require("distube")
const { SpotifyPlugin } = require("@distube/spotify")
const { SoundCloudPlugin } = require("@distube/soundcloud")

module.exports = {
    name: "play",
    data: {
        name: "play",
        description: "Cerca un canzone da ascoltare.",
        options: [
            {
                name: "canzone",
                description: "Inserisci il link o il nome della canzone che si vuole ascoltare.",
                required: true,
                type: "STRING"
            }
        ]
    },
    execute(interaction, client) {

        const distube = new DisTube(client, {
            youtubeDL: false,
            plugins: [new SpotifyPlugin(), new SoundCloudPlugin()],
            leaveOnEmpty: true,
            leaveOnStop: true
        })

        const errorEmbed = new MessageEmbed()
        .setColor(config.embed.errorColor)
        .setFooter({ text: "Graphic Community | Musica", iconURL: config.server.logoGC })

        const voiceChannel = message.member.voice.channel
        if (!voiceChannel) {
            errorEmbed.setTitle("Devi essere in un canale vocale.")
            return interaction.reply({ embeds: [errorEmbed] })
        }

        const voiceChannelBot = message.guild.channels.cache.find(x => x.type == "GUILD_VOICE" && x.members.has(client.user.id))
        if (voiceChannelBot && voiceChannel.id != voiceChannelBot.id) {
            errorEmbed.setTitle("Un altro utente sta già usando il bot in una vocale.")
            return interaction.reply({ embeds: [errorEmbed] })
        }

        const query = interaction.options.getString("canzone")

        distube.play(voiceChannelBot || voiceChannel, query, {
            member: interaction.user,
            textChannel: interaction.channel,
            message: interaction
        })

    }
}