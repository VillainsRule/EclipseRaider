process.noDeprecation = true;

import chalk from 'chalk';
import readline from 'readline';
import fs from 'fs';
import Discord from 'discord.js-selfbot-v13';

import resetPrompt from './resetPrompt.js';

global.rl = readline.createInterface(process.stdin, process.stdout);

console.clear();

let tokens = fs.readFileSync('./tokens.txt', 'utf-8').split('\n').filter(t => !!t).map(t => t.trim());

if (!tokens.length) {
    console.log(chalk.magenta('    [Login] No tokens found. Add a few in tokens.txt.'));
    process.exit(0);
};

class Group extends Discord.Collection {
    all = () => Array.from(this.values());
};

global.clients = new Group();

console.log(chalk.magenta('    [Login] Starting clients...'));

for (let token of tokens) {
    let client = new Discord.Client({ checkUpdate: false });
    client.login(token);
    await new Promise((r) => {
        client.on('ready', () => {
            clients.set(token, client);
            console.log(chalk.magenta('    [Login] Logged in account: ' + client.user.username));
            r();
        });
    });
};

console.clear();

console.log(chalk.red(`\n\n                                               
        ▓█████  ▄████▄   ██▓     ██▓ ██▓███    ██████ ▓█████     ██▀███   ▄▄▄       ██▓▓█████▄ ▓█████  ██▀███  
        ▓█   ▀ ▒██▀ ▀█  ▓██▒    ▓██▒▓██░  ██▒▒██    ▒ ▓█   ▀    ▓██ ▒ ██▒▒████▄    ▓██▒▒██▀ ██▌▓█   ▀ ▓██ ▒ ██▒
        ▒███   ▒▓█    ▄ ▒██░    ▒██▒▓██░ ██▓▒░ ▓██▄   ▒███      ▓██ ░▄█ ▒▒██  ▀█▄  ▒██▒░██   █▌▒███   ▓██ ░▄█ ▒
        ▒▓█  ▄ ▒▓▓▄ ▄██▒▒██░    ░██░▒██▄█▓▒ ▒  ▒   ██▒▒▓█  ▄    ▒██▀▀█▄  ░██▄▄▄▄██ ░██░░▓█▄   ▌▒▓█  ▄ ▒██▀▀█▄  
        ░▒████▒▒ ▓███▀ ░░██████▒░██░▒██▒ ░  ░▒██████▒▒░▒████▒   ░██▓ ▒██▒ ▓█   ▓██▒░██░░▒████▓ ░▒████▒░██▓ ▒██▒
        ░░ ▒░ ░░ ░▒ ▒  ░░ ▒░▓  ░░▓  ▒▓▒░ ░  ░▒ ▒▓▒ ▒ ░░░ ▒░ ░   ░ ▒▓ ░▒▓░ ▒▒   ▓▒█░░▓   ▒▒▓  ▒ ░░ ▒░ ░░ ▒▓ ░▒▓░
         ░ ░  ░  ░  ▒   ░ ░ ▒  ░ ▒ ░░▒ ░     ░ ░▒  ░ ░ ░ ░  ░     ░▒ ░ ▒░  ▒   ▒▒ ░ ▒ ░ ░ ▒  ▒  ░ ░  ░  ░▒ ░ ▒░
           ░   ░          ░ ░    ▒ ░░░       ░  ░  ░     ░        ░░   ░   ░   ▒    ▒ ░ ░ ░  ░    ░     ░░   ░ 
           ░  ░░ ░          ░  ░ ░                 ░     ░  ░      ░           ░  ░ ░     ░       ░  ░   ░     
               ░                                                                        ░                      



                    `) + chalk.yellow(`
    ╔══════════════════════════════════════════════════════════╗
    ║ > want to ruin someone's day?                            ║
    ╠════╦═══════════════════════╦═════════════════════════════╣
    ║ 00 ║ join server           ║ 04 ║ spam messages          ║
    ║ 01 ║ change display name   ║ 05 ║ create invite          ║
    ║ 02 ║ change bio            ║ 06 ║ leave server           ║
    ║ 03 ║ change status         ║ 07 ║ quit                   ║
    ╚════╩═════════════════════════════════════════════════════╝\n\n`));

resetPrompt();