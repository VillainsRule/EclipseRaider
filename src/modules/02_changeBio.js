import Handler from '../handler.js';

const handler = new Handler('change bio');

export default async () => {
    let bio = await handler.question('bio? ');
    if (!bio.trim()) return handler.endError('missing bio!');

    await Promise.all(clients.all().map(async (client) => {
        await client.user.setAboutMe(bio);
    }));

    handler.endLog('updated bios!');
};