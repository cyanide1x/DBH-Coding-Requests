import { Command } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { MessageEmbed } from 'discord.js';

export class UserCommand extends Command {
	public async messageRun(message: Message) {
		return message.channel.send({
			embeds: [
				new MessageEmbed()
					.setTitle("This is an embed")
					.setDescription("This is a description")
					.setColor("RED")
			]
		})
	}
}