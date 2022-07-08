module.exports = {
    name: "interactionCreate",
    execute(interaction, client) {

        if (interaction.customId == "confermaid") {
            interaction.channel.delete()
        }
    }
}