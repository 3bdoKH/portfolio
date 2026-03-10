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

export const themeCommand = {
  name: 'theme',
  description: 'Change theme',
  aliases: ['theme'],
  execute: (args, context) => {
    if (!args || args.length === 0) {
      return {
        type: 'error',
        content: 'Please specify a theme.\nUsage: theme <theme>\nExample: theme nightOwl\n\nOr use "themes" to see all themes.'
      };
    }
    try {
      const theme = args[0];
      context.changeTheme(theme);
      return {
        type: 'success',
        content: `Theme ${theme} applied successfully.`
      };
    } catch (error) {
      console.log(error);
      return {
        type: 'error',
        content: `Theme ${args[0]} not found.`
      };
    }
  }
};
const themes = {
  themesCommand,
  themeCommand
};

export default themes;
