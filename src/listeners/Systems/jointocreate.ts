import type { ListenerOptions, PieceContext } from '@sapphire/framework';
import { Listener } from '@sapphire/framework';
import type { CategoryChannelResolvable, GuildMember, Snowflake, VoiceState } from 'discord.js';

export class UserEvent extends Listener {
    public constructor(context: PieceContext, options?: ListenerOptions) {
        super(context, {
            ...options,
            event: "voiceStateUpdate"
        });
    }

    public async run(oldState: VoiceState, newState: VoiceState) {
        const { member, guild } = newState;
        const oldChannel = oldState.channel;
        const newChannel = newState.channel;
        const jtcChannel = '951271226746220584';
        const channelName = member?.user.tag
        const ownedChannel = this.container.client.voiceGenerator.get(member?.id)

        if(ownedChannel && newChannel?.id == jtcChannel && (newChannel?.id !== ownedChannel)) {
            this.container.client.voiceGenerator.set(member?.id, null)
            oldChannel?.delete().catch(() => {});
        }

        if (oldChannel !== newChannel && newChannel && newChannel.id === jtcChannel) {
            const voiceChannel = await guild.channels.create(`${channelName}`, {
                type: "GUILD_VOICE",
                parent: newChannel.parent as CategoryChannelResolvable,
                permissionOverwrites: [
                    {id: member?.id as Snowflake, allow: ["CONNECT"]},
                    {id: guild.id, deny: ["CONNECT"]}
                ]
            })

            this.container.client.voiceGenerator.set(member?.id, voiceChannel.id);
            await newChannel.permissionOverwrites.edit(member as GuildMember, {CONNECT: false})
            setTimeout(() => newChannel.permissionOverwrites.delete(member as GuildMember), 30 * 1000)

            return setTimeout(() => member?.voice.setChannel(voiceChannel), 500)
        }

        if(ownedChannel && oldChannel?.id == ownedChannel && (!newChannel || newChannel.id !== ownedChannel)) {
            this.container.client.voiceGenerator.set(member?.id, null)
            return oldChannel?.delete().catch(() => {});
        }

        return;
    }
}