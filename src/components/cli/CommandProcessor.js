import commands, { getCommandNames } from './commands/index';
import { parseCommand } from './utils/parser';
import { ASCII_ART } from './utils/ascii-art';

class CommandProcessor {
    constructor(context = {}) {
        this.context = context;
        this.commandNames = getCommandNames();
    }

    // Update context (for callbacks like openCVViewer, clearTerminal, etc.)
    updateContext(newContext) {
        this.context = { ...this.context, ...newContext };
    }

    // Process a command input (supports async commands)
    async processCommand(input) {
        const { command, args } = parseCommand(input);

        // Empty command
        if (!command) {
            return null;
        }

        // Check if command exists
        if (!commands[command]) {
            return {
                type: 'error',
                content: `Command not found: ${command}\nType 'help' to see available commands.`
            };
        }

        // Execute command (supports both sync and async)
        try {
            const result = await commands[command].execute(args, this.context);
            return result;
        } catch (error) {
            return {
                type: 'error',
                content: `Error executing command: ${error.message}`
            };
        }
    }

    // Get welcome message
    getWelcomeMessage() {
        return {
            type: 'ascii',
            content: ASCII_ART.welcome
        };
    }

    // Get command suggestions for auto-complete
    getSuggestions(input) {
        if (!input) return [];

        const matches = this.commandNames.filter(cmd =>
            cmd.startsWith(input.toLowerCase())
        );

        return matches;
    }

    // Get best match for auto-complete
    getAutoComplete(input) {
        const suggestions = this.getSuggestions(input);
        return suggestions.length > 0 ? suggestions[0] : input;
    }
}

export default CommandProcessor;
