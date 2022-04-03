import { Args, Command } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { AFKSchema } from '../../lib/structures/schemas/AFKSystem'
import { MessageEmbed } from 'discord.js';

export class UserCommand extends Command {
	public async messageRun(message: Message, args: Args) {
		const Embed = new MessageEmbed()
			.setAuthor({
				name: message.author.tag,
				iconURL: message.author.displayAvatarURL({ dynamic: true })
			})

		const afkStatus = await args.pick('string').catch(() => null)

		if(!afkStatus) {
			Embed.setColor("RED").setDescription(`You need to specify a valid status!`)
			return message.reply({embeds:[Embed]})
		}

		try {
			await AFKSchema.findOneAndUpdate(
				{GuildID: message.guild?.id, UserID: message.author.id},
				{Status: afkStatus, Time: parseInt(String(message.createdTimestamp / 1000))},
				{new: true, upsert: true}
			)

			Embed.setColor("GREEN").setDescription(`Your **AFK status** has been updated!`).addField("New AFK Status", `> **>>**	 \`${afkStatus}\``)

			return message.reply({embeds: [Embed]})
		} catch(err) {
			console.log(err)
		}
		return
	}
}