import chalk from 'chalk';

export default () => {
    rl.question(chalk.green(`\n    Enter an option # > `), async (input) => {
        if (isNaN(input)) {
            console.log(chalk.magenta('    > Invalid input.'));
            resetPrompt();
            return;
        };

        let numbers = {
            0: '00_joinServer.js',
            1: '01_changeDisplayName.js',
            2: '02_changeBio.js',
            3: '03_changeStatus.js',
            4: '04_spamMessages.js',
            5: '05_createInvite.js',
            6: '06_leaveServer.js'
        };

        if (Number(input) === 7) {
            console.log(chalk.magenta('    owo bye bye'));
            process.exit(0);
        };

        if (!numbers[Number(input)]) {
            console.log(chalk.magenta('    > I cannot find that module number.'));
            resetPrompt();
            return;
        };

        let file = await import(`./modules/${numbers[Number(input)]}`);
        file.default();
    });
};