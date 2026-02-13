// Export all commands
import helpCommand from './help';
import aboutCommand from './about';
import skillsCommand from './skills';
import contactCommand from './contact';
import { projectsCommand, projectCommand } from './projects';
import cvCommand from './cv';
import { clearCommand, exitCommand } from './system';
import { themesCommand, themeCommand } from './themes';
import {
    sudoCommand,
    hackCommand,
    matrixCommand,
    coffeeCommand,
    jokeCommand,
    quoteCommand
} from './easter-eggs';

export const commands = {
    // Core commands
    help: helpCommand,
    '?': helpCommand,
    commands: helpCommand,

    about: aboutCommand,
    whoami: aboutCommand,
    info: aboutCommand,

    skills: skillsCommand,
    tech: skillsCommand,
    stack: skillsCommand,

    contact: contactCommand,
    email: contactCommand,
    reach: contactCommand,

    projects: projectsCommand,
    ls: projectsCommand,
    work: projectsCommand,
    portfolio: projectsCommand,

    project: projectCommand,
    open: projectCommand,

    cv: cvCommand,
    resume: cvCommand,

    themes: themesCommand,
    theme: themeCommand,

    clear: clearCommand,
    cls: clearCommand,

    exit: exitCommand,
    quit: exitCommand,
    q: exitCommand,

    // Easter eggs
    sudo: sudoCommand,
    hack: hackCommand,
    matrix: matrixCommand,
    coffee: coffeeCommand,
    joke: jokeCommand,
    quote: quoteCommand,
};

// Get all command names for auto-complete
export const getCommandNames = () => {
    return Object.keys(commands);
};

// Get primary command names (no aliases) for help
export const getPrimaryCommands = () => {
    return [
        'help', 'about', 'skills', 'contact', 'projects',
        'project', 'cv', 'clear', 'themes', 'exit',
        'sudo', 'hack', 'matrix', 'coffee', 'joke', 'quote'
    ];
};

export default commands;
