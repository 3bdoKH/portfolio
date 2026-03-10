import { formatCommandList } from '../utils/parser';

export const helpCommand = {
    name: 'help',
    description: 'Show all available commands',
    aliases: ['?', 'commands'],
    execute: (args, context) => {
        const commands = [
            { name: 'help', description: 'Show this help message' },
            { name: 'about', description: 'Display bio and information' },
            { name: 'projects', description: 'List all projects' },
            { name: 'project <id>', description: 'View specific project details' },
            { name: 'skills', description: 'Display technical skills' },
            { name: 'contact', description: 'Show contact information' },
            { name: 'cv', description: 'View/download CV' },
            { name: 'clear', description: 'Clear terminal screen' },
            { name: 'themes', description: 'Show available themes' },
            { name: 'exit', description: 'Close terminal' },
            { name: '', description: '' },
            { name: '--- Fun Commands ---', description: '' },
            { name: 'sudo', description: 'Try it and see 😏' },
            { name: 'hack', description: 'Initiate hacking sequence' },
            { name: 'matrix', description: 'Enter the Matrix' },
            { name: 'coffee', description: 'Get some coffee' },
            { name: 'joke', description: 'Random programming joke' },
            { name: 'quote', description: 'Inspirational dev quote' },
            { name: 'git log', description: 'See my disastrous git log' }
        ];

        return {
            type: 'info',
            content: `Available Commands:\n\n${formatCommandList(commands)}\n\nTip: Use Tab for auto-completion, ↑↓ for history`
        };
    }
};

export default helpCommand;
