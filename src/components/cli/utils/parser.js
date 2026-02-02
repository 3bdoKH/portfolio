// Command parser utility
export const parseCommand = (input) => {
    const trimmed = input.trim();
    if (!trimmed) return { command: '', args: [] };

    const parts = trimmed.split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    return { command, args };
};

// Format output with typing effect support
export const formatOutput = (content, type = 'text') => {
    return {
        type, // 'text', 'error', 'success', 'info', 'ascii'
        content,
        timestamp: new Date().toISOString()
    };
};

// Command suggestions for auto-complete
export const getSuggestions = (input, availableCommands) => {
    if (!input) return [];

    const matches = availableCommands.filter(cmd =>
        cmd.startsWith(input.toLowerCase())
    );

    return matches;
};

// Format command list for help
export const formatCommandList = (commands) => {
    const maxLength = Math.max(...commands.map(c => c.name.length));

    return commands.map(cmd => {
        const padding = ' '.repeat(maxLength - cmd.name.length + 4);
        return `  ${cmd.name}${padding}- ${cmd.description}`;
    }).join('\n');
};

export default {
    parseCommand,
    formatOutput,
    getSuggestions,
    formatCommandList
};
