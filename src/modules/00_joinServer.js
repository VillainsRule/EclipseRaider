import Handler from '../handler.js';

const handler = new Handler('join server');

export default async () => {
    let invite = await handler.question('invite code? ');
    if (!invite.trim()) return handler.endError('missing invite code!');

    await Promise.all(clients.all().map(async (client) => {
        let i = await client.fetchInvite(invite);
        if (client.guilds.cache.has(i.guildID)) return;
        await client.acceptInvite(i);
    }));

    handler.endLog('joined server!');
};