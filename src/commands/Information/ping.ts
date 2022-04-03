import { ApplyOptions } from '@sapphire/decorators';
import { Command, CommandOptions } from '@sapphire/framework';
import { Message, MessageEmbed } from 'discord.js';

@ApplyOptions<CommandOptions>({
	description: 'ping pong'
})
export class UserCommand extends Command {
	public async messageRun(message: Message) {
		const msg = await message.channel.send({
			embeds: [
				new MessageEmbed()
				.setDescription('Ping?')
				.setColor("AQUA")
			]
		})

		const content = `Pong! Bot Latency ${Math.round(this.container.client.ws.ping)}ms. API Latency ${
			(msg.editedTimestamp || msg.createdTimestamp) - (message.editedTimestamp || message.createdTimestamp)
		}ms.`;

		return msg.edit({
			embeds: [
				new MessageEmbed()
				.setDescription(content)
				.setColor("AQUA")
			]
		})
	}
}
