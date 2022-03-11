import { Command } from "@sapphire/framework";
import { Message, MessageEmbed } from "discord.js";
import moment from "moment";
import "moment-duration-format";

export class UserCommand extends Command {
    public async messageRun(message: Message) {

        const uptime = moment.duration(this.container.client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        const totalGuildCount = this.container.client.guilds.cache.get.length
        const totalUserCount = this.container.client.users.cache.get.length

        return message.reply({
            embeds: [
                new MessageEmbed()
                    .setAuthor({
                        url: `${this.container.client.user!.displayAvatarURL({ format: 'png' })}`,
                        name: `${this.container.client.user?.username}`
                    })
                    .setThumbnail(this.container.client.user!.displayAvatarURL({ format: 'png' }))
                    .setColor("BLUE")
                    .setTitle(`__Bot Statistics__`)
                    .setDescription(`\`\`\`yaml\n${[
                        `Users  :: ${totalUserCount} user(s).`,
                        `Guilds :: ${totalGuildCount} guild(s).`
                    ].join('\n')}\`\`\`\n`)
                    .addField(`(+) Uptime (+)`, `${uptime}`)
                    .addField(`(+) Bot Stats (+)`, `\`\`\`yml\nOS: Linux | Debian\nCPU Usage: 59 %\nRAM Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\`\`\``)
                    .addField(`(+) Bot Links (+)`, [
                        `<a:check_DV:912156659554607144> Invite Me! **>>** [Click Here](https://discord.com/api/oauth2/authorize?client_id=950935816446816256&permissions=8&scope=bot%20applications.commands)`,
                        `<:Channel:935342978162110464> Support Server! **>>** [Click Here](https://discord.gg/kysNtgpcxn)`,
                        `<:BUGHUNTER_LEVEL_1:847968167996686376> Website! **>>** [Click Me](https://artibot.cyanidedev.mn)`,
                        `<:owner:847967706380107848> Github! **>>** [Click Me](https://github.com/cyanide1x)`
                    ].join('\n'))
            ]
        })
    }
}