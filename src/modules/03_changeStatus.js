import Discord from 'discord.js-selfbot-v13';
import Handler from '../handler.js';

const handler = new Handler('change status');

export default async () => {
    let statusText = await handler.question('status text? ');
    if (!statusText.trim()) return handler.endError('missing status text!');

    let statusIndicator = await handler.question('status indicator? ');
    if (!statusIndicator.trim()) return handler.endError('missing status indicator!');

    await Promise.all(global.clients.all().map(async (client) => {
        let status = new Discord.CustomStatus(client).setState(statusText);
        await client.user.setPresence({ activities: [status] });
        await client.user.setStatus(statusIndicator);
    }));

    handler.endLog('updated statuses!');
};