import { ApplyOptions } from "@sapphire/decorators";
import { Args, Command, CommandOptions } from "@sapphire/framework";
import { Message, MessageEmbed } from "discord.js";

@ApplyOptions<CommandOptions>({
    name: "jtc",
    aliases: ['vc', 'jointocreate', 'vcman', 'voice']
})

export class UserCommand extends Command {
    public async messageRun(message: Message, args: Args) {
        const voiceChannel = message.member?.voice.channel;
        const Embed = new MessageEmbed().setColor("GREEN")
        const ownedChannel = this.container.client.voiceGenerator.get(message.member?.id)
        const arg = await args.pick('string').catch(() => null)

        if (!arg) return message.reply({ embeds: [Embed.setDescription("You need to specify an argument! ( \`name, invite, remove, public\` )")] })

        if (!voiceChannel) return message.reply({ embeds: [Embed.setDescription("You're not in a voice channel.").setColor("RED")] })

        if (!ownedChannel || voiceChannel.id !== ownedChannel) return message.reply({ embeds: [Embed.setDescription("You don't own this / any channels!").setColor("RED")] })

        switch (arg) {
            case "name": {
                const newName = await args.rest('string').catch(() => null)
                if (!newName) return message.reply({ embeds: [Embed.setDescription("You need to specify a name to set!").setColor("RED")] })
                if (newName.length > 22 || newName.length < 1) return message.reply({ embeds: [Embed.setDescription("The Name cannot exceed a limit of **22** chracters!").setColor("RED")] })

                voiceChannel.edit({ name: newName }).catch((err) => {
                    return message.reply({ embeds: [Embed.addField(`Error`, `${err}`).setTimestamp().setColor("RED")] })
                })

                message.reply({ embeds: [Embed.setDescription(`The **Channel Name** has been set to \`${newName}\`!`)] })
            }
                break;

            case "add": {
                const argsid = await args.pick('string').catch(() => null)
                const target = message.mentions.users?.first() || message.guild?.members.cache.get(argsid!) || null

                if (!target) return message.reply({ embeds: [Embed.setDescription("You need to specify a **valid** user to invite!").setColor("RED")] })

                voiceChannel.permissionOverwrites.edit(target, { CONNECT: true });

                message.reply({ embeds: [Embed.setDescription(`${target} has successfully been **invited**!`)] })


            }
                break;

            case "remove": {
                const argsid = await args.pick("string").catch(() => null)
                const target = message.mentions.users.first() || message.guild?.members.cache.get(argsid!) || null
                if (!target) return message.reply({ embeds: [Embed.setDescription("You need to specify a **valid** user to remove!").setColor("RED")] })

                voiceChannel.permissionOverwrites.edit(target, { CONNECT: false })

                message.reply({ embeds: [Embed.setDescription(`${target} has successfully been **removed**!`)] })
            }
                break;

            case "public": {
                const toggle = await args.pick("string").catch(() => null)
                const guild = message.guild?.id
                if (!toggle) return message.reply({ embeds: [Embed.setDescription("You need to specify a **valid** argument! ( \`on, off\` )").setColor("RED")] })

                switch (toggle) {
                    case "on": {
                        voiceChannel.permissionOverwrites.edit(guild as string, { CONNECT: null })

                        message.reply({ embeds: [Embed.setDescription(`This voice channel has been made **public**!`)] })
                    }
                        break;
                    case "off": {
                        voiceChannel.permissionOverwrites.edit(guild as string, { CONNECT: false })

                        message.reply({ embeds: [Embed.setDescription(`This voice channel has been made **private**!`)] })
                    }
                        break;
                }
            }
                break;
        }
        return;
    }
}