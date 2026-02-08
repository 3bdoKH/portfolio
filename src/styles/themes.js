export const themes = {
    nightOwl: {
        name: 'Night Owl',
        id: 'nightOwl',

        // Background Colors
        '--bg-primary': '#0a0e27',
        '--bg-secondary': '#1a1f3a',
        '--bg-card': '#000000',
        '--bg-card-hover': '#0d0d0d',
        '--bg-gray': '#2d2d2d',
        '--bg-overlay': 'rgba(0, 0, 0, 0.3)',

        // Syntax Highlighting Colors
        '--syntax-keyword': '#00ff88',
        '--syntax-string': '#ffffff',
        '--syntax-comment': '#4a9eff',
        '--syntax-variable': '#ffd700',
        '--syntax-bracket': '#888888',
        '--syntax-function': '#ff6b9d',
        '--syntax-number': '#bd93f9',

        // Accent Colors
        '--accent-primary': '#00ff88',
        '--accent-secondary': '#4a9eff',
        '--accent-glow': 'rgba(0, 255, 136, 0.3)',
        '--accent-glow-blue': 'rgba(74, 158, 255, 0.3)',

        // Text Colors
        '--text-primary': '#ffffff',
        '--text-secondary': '#a0a0a0',
        '--text-tertiary': '#666666',

        // Border & Shadow
        '--border-color': '#2a2f4a',
        '--border-accent': '#00ff88',
        '--shadow-sm': '0 2px 8px rgba(0, 0, 0, 0.3)',
        '--shadow-md': '0 4px 16px rgba(0, 0, 0, 0.4)',
        '--shadow-lg': '0 8px 32px rgba(0, 0, 0, 0.5)',
        '--shadow-glow': '0 0 20px rgba(0, 255, 136, 0.3)',
        '--shadow-glow-blue': '0 0 20px rgba(74, 158, 255, 0.3)',
    },

    dracula: {
        name: 'Dracula',
        id: 'dracula',

        // Background Colors
        '--bg-primary': '#282a36',
        '--bg-secondary': '#1e1f29',
        '--bg-card': '#21222c',
        '--bg-card-hover': '#2a2b36',
        '--bg-gray': '#44475a',
        '--bg-overlay': 'rgba(0, 0, 0, 0.3)',

        // Syntax Highlighting Colors
        '--syntax-keyword': '#ff79c6',
        '--syntax-string': '#f1fa8c',
        '--syntax-comment': '#6272a4',
        '--syntax-variable': '#8be9fd',
        '--syntax-bracket': '#f8f8f2',
        '--syntax-function': '#50fa7b',
        '--syntax-number': '#bd93f9',

        // Accent Colors
        '--accent-primary': '#ff79c6',
        '--accent-secondary': '#8be9fd',
        '--accent-glow': 'rgba(255, 121, 198, 0.3)',
        '--accent-glow-blue': 'rgba(139, 233, 253, 0.3)',

        // Text Colors
        '--text-primary': '#f8f8f2',
        '--text-secondary': '#bfbfbf',
        '--text-tertiary': '#6272a4',

        // Border & Shadow
        '--border-color': '#44475a',
        '--border-accent': '#ff79c6',
        '--shadow-sm': '0 2px 8px rgba(0, 0, 0, 0.3)',
        '--shadow-md': '0 4px 16px rgba(0, 0, 0, 0.4)',
        '--shadow-lg': '0 8px 32px rgba(0, 0, 0, 0.5)',
        '--shadow-glow': '0 0 20px rgba(255, 121, 198, 0.3)',
        '--shadow-glow-blue': '0 0 20px rgba(139, 233, 253, 0.3)',
    },

    monokai: {
        name: 'Monokai',
        id: 'monokai',

        // Background Colors
        '--bg-primary': '#272822',
        '--bg-secondary': '#1e1e1e',
        '--bg-card': '#1a1a1a',
        '--bg-card-hover': '#242424',
        '--bg-gray': '#3e3d32',
        '--bg-overlay': 'rgba(0, 0, 0, 0.3)',

        // Syntax Highlighting Colors
        '--syntax-keyword': '#f92672',
        '--syntax-string': '#e6db74',
        '--syntax-comment': '#75715e',
        '--syntax-variable': '#fd971f',
        '--syntax-bracket': '#f8f8f2',
        '--syntax-function': '#a6e22e',
        '--syntax-number': '#ae81ff',

        // Accent Colors
        '--accent-primary': '#e6db74',
        '--accent-secondary': '#fd971f',
        '--accent-glow': 'rgba(230, 219, 116, 0.3)',
        '--accent-glow-blue': 'rgba(253, 151, 31, 0.3)',

        // Text Colors
        '--text-primary': '#f8f8f2',
        '--text-secondary': '#cfcfc2',
        '--text-tertiary': '#75715e',

        // Border & Shadow
        '--border-color': '#3e3d32',
        '--border-accent': '#e6db74',
        '--shadow-sm': '0 2px 8px rgba(0, 0, 0, 0.3)',
        '--shadow-md': '0 4px 16px rgba(0, 0, 0, 0.4)',
        '--shadow-lg': '0 8px 32px rgba(0, 0, 0, 0.5)',
        '--shadow-glow': '0 0 20px rgba(230, 219, 116, 0.3)',
        '--shadow-glow-blue': '0 0 20px rgba(253, 151, 31, 0.3)',
    },
};

export const themeList = [
    { id: 'nightOwl', name: 'Night Owl' },
    { id: 'dracula', name: 'Dracula' },
    { id: 'monokai', name: 'Monokai' },
];
