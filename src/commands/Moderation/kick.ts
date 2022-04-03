import { Args, Command } from "@sapphire/framework";
import type { Message } from "discord.js";
import { MessageEmbed } from "discord.js";

export class UserCommand extends Command {
    public async messageRun(message: Message, args: Args) {
        const userArgs = await args.rest('string').catch(() => null)
        const mentionedMember = message.mentions.users.first() || message.guild?.members.cache.get(userArgs!) || null
        const Embed = new MessageEmbed().setColor("GREEN")
        const ErrorEmbed = new MessageEmbed().setColor("RED")

        if(!mentionedMember) return message.reply({embeds: [ErrorEmbed.setDescription("You need to specify a valid user to kick!")]})

        return message.reply({embeds: [Embed.setDescription("This is an embed")]})
    }
}