import Handler from '../handler.js';

const handler = new Handler('change display name');

export default async () => {
    let name = await handler.question('display name? ');
    if (!name.trim()) return handler.endError('missing name!');

    await Promise.all(global.clients.all().map(async (client) => {
        await client.user.setGlobalName(name);
    }));

    handler.endLog('updated global names!');
};