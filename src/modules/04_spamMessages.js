import Handler from '../handler.js';

const handler = new Handler('spam messages');

export default async () => {
    let guildID = await handler.question('guild ID? ');
    if (!guildID.trim() || isNaN(guildID)) return handler.endError('missing guild ID!');

    let message = await handler.question('message? ');
    if (!message.trim()) return handler.endError('missing message!');

    let intervals = [];
    let stop = false;

    clients.all().forEach(async (client) => {
        let guild = await client.guilds.cache.get(guildID);
        if (!guild) return handler.endError('guild not found.');
        let channels = await guild.channels.fetch();
        channels = [...channels.values()].filter((chan) => chan.permissionsFor(client.user.id).has('SEND_MESSAGES') && chan.type === 'GUILD_TEXT');
        if (!channels.length) return handler.endError('no channels to raid.');
        let int = setInterval(() => {
            if (stop) return clearInterval(int);
            let channel = channels[channels.length * Math.random() | 0];
            channel.send(message).catch(() => {});
        }, 250);
        intervals.push(int);
    });

    await handler.question('press enter to stop...');
    stop = true;
    intervals.forEach((i) => clearInterval(i));
    handler.endLog('stopped spamming!');
};