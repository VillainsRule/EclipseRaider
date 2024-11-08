import Handler from '../handler.js';

const handler = new Handler('leave server');

export default async () => {
    let guildID = await handler.question(`guild ID? `);
    if (!guildID.trim()) return handler.endError('missing guild ID!');

    let cachedName;

    await Promise.all(global.clients.all().map(async (client) => {
        let g = await client.guilds.fetch(guildID);
        if (!cachedName) cachedName = g.name;
        await g.leave();
    }));

    handler.endLog(`left ${cachedName} on all accounts!`);
};