import Handler from '../handler.js';

const handler = new Handler('create invite');

export default async () => {
    let allClients = global.clients.all();
    let selectedClient = allClients[allClients.length * Math.random() | 0];

    let guildID = await handler.question(`guild ID (account: ${selectedClient.user.username})? `);
    if (!guildID.trim()) return handler.endError('missing guild ID!');

    let guild = await selectedClient.guilds.cache.get(guildID);
    if (!guild) return handler.endError('invalid guild!');

    let channels = await guild.channels.fetch();
    let inv = await [...channels.values()]
        .find(c => c.permissionsFor(selectedClient.user.id)
        .has('CREATE_INSTANT_INVITE'))
        .createInvite({ maxAge: 0, unique: true });
    
    handler.endLog(`generated invite! code: ${inv.code} [ discord.gg/${inv.code} ]`);
};