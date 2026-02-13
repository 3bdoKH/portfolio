export const themesCommand = {
  name: 'themes',
  description: 'Display available themes',
  aliases: ['theme'],
  execute: (args, context) => {
    return {
      type: 'info',
      content: `
          Available themes:
          - nightOwl
          - dracula
          - monokai

          Type 'theme <theme>' to change theme
      `.trim()
    };
  }
};

export default themesCommand;
