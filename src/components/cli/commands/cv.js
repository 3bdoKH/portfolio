export const cvCommand = {
    name: 'cv',
    description: 'View/download CV',
    aliases: ['resume'],
    execute: (args, context) => {
        // Trigger CV viewer
        if (context && context.openCVViewer) {
            context.openCVViewer();
            context.closeTerminal();
        }

        return {
            type: 'success',
            content: 'Opening CV viewer...\n\n📄 You can also download the CV directly from the viewer.'
        };
    }
};

export default cvCommand;
