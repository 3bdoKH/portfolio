export const clearCommand = {
    name: 'clear',
    description: 'Clear terminal screen',
    aliases: ['cls'],
    execute: (args, context) => {
        if (context && context.clearTerminal) {
            context.clearTerminal();
        }
        return null; // No output, just clear
    }
};

export const exitCommand = {
    name: 'exit',
    description: 'Close terminal',
    aliases: ['quit', 'q'],
    execute: (args, context) => {
        if (context && context.closeTerminal) {
            setTimeout(() => context.closeTerminal(), 500);
        }

        return {
            type: 'info',
            content: 'Goodbye! Thanks for visiting 👋\nClosing terminal...'
        };
    }
};

const systemCommands = { clearCommand, exitCommand };

export default systemCommands;
