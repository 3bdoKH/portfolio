import { ASCII_ART, JOKES, QUOTES } from '../utils/ascii-art';

export const sudoCommand = {
    name: 'sudo',
    description: 'Try it and see 😏',
    execute: (args, context) => {
        const responses = [
            'Nice try! But this is a portfolio, not a server 😄',
            'Permission denied! You\'re not root here 🚫',
            'sudo make me a sandwich? Sorry, I only make websites 🥪',
            'Error: User is not in the sudoers file. This incident will be reported... to nobody 😅',
            'With great power comes great responsibility... but you don\'t have the power here 💪'
        ];

        const randomResponse = responses[Math.floor(Math.random() * responses.length)];

        return {
            type: 'error',
            content: randomResponse
        };
    }
};

export const hackCommand = {
    name: 'hack',
    description: 'Initiate hacking sequence',
    execute: (args, context) => {
        return {
            type: 'ascii',
            content: ASCII_ART.hack
        };
    }
};

export const matrixCommand = {
    name: 'matrix',
    description: 'Enter the Matrix',
    execute: (args, context) => {
        return {
            type: 'ascii',
            content: ASCII_ART.matrix
        };
    }
};

export const coffeeCommand = {
    name: 'coffee',
    description: 'Get some coffee',
    execute: (args, context) => {
        return {
            type: 'ascii',
            content: ASCII_ART.coffee
        };
    }
};

export const jokeCommand = {
    name: 'joke',
    description: 'Random programming joke',
    execute: (args, context) => {
        const randomJoke = JOKES[Math.floor(Math.random() * JOKES.length)];
        return {
            type: 'info',
            content: `\n${randomJoke}\n`
        };
    }
};

export const quoteCommand = {
    name: 'quote',
    description: 'Inspirational dev quote',
    execute: (args, context) => {
        const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
        return {
            type: 'info',
            content: `\n${randomQuote}\n`
        };
    }
};

export default {
    sudoCommand,
    hackCommand,
    matrixCommand,
    coffeeCommand,
    jokeCommand,
    quoteCommand
};
