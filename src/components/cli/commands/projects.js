import { getProjects } from '../../../services/api';

export const projectsCommand = {
    name: 'projects',
    description: 'List all projects',
    aliases: ['ls', 'work', 'portfolio'],
    execute: async (args, context) => {
        try {
            // Fetch projects from API
            const response = await getProjects();
            const projects = response.data || [];

            if (projects.length === 0) {
                return {
                    type: 'info',
                    content: 'No projects found.\n\nCheck back soon for updates!'
                };
            }
            // Format project list
            const projectList = projects.projects.map((p, i) => {
                const techStack = p.tags?.join(', ') || 'N/A';
                return `  ${i + 1}. ${p.title}\n     Tech: ${techStack}\n     ${p.description || 'No description available'}`;
            }).join('\n\n');

            // Scroll to projects section after delay
            if (context && context.scrollToSection) {
                setTimeout(() => {
                    context.scrollToSection('projects');
                    if (context.closeTerminal) {
                        context.closeTerminal();
                    }
                }, 1000);
            }

            return {
                type: 'success',
                content: `
╔════════════════════════════════════════════════════════╗
║  Projects Portfolio (${projects.projects.length} projects)      ║
╚════════════════════════════════════════════════════════╝

${projectList}

Scrolling to projects section...
      `.trim()
            };
        } catch (error) {
            console.error('Error fetching projects:', error);
            return {
                type: 'error',
                content: `Failed to load projects: ${error.message}\n\nPlease try again later or check your connection.`
            };
        }
    }
};

export const projectCommand = {
    name: 'project',
    description: 'View specific project details',
    aliases: ['open'],
    execute: async (args, context) => {
        if (!args || args.length === 0) {
            return {
                type: 'error',
                content: 'Please specify a project number.\nUsage: project <number>\nExample: project 1\n\nOr use "projects" to see all projects.'
            };
        }

        try {
            const projectIndex = parseInt(args[0]) - 1;

            // Fetch all projects to get the ID
            const response = await getProjects();
            const projects = response.data || [];

            if (projectIndex < 0 || projectIndex >= projects.length) {
                return {
                    type: 'error',
                    content: `Invalid project number. Please use a number between 1 and ${projects.length}.\n\nType 'projects' to see all available projects.`
                };
            }

            const project = projects[projectIndex];

            // Scroll to projects section
            if (context && context.scrollToSection) {
                setTimeout(() => {
                    context.scrollToSection('projects');
                    if (context.closeTerminal) {
                        context.closeTerminal();
                    }
                }, 500);
            }

            return {
                type: 'info',
                content: `Opening "${project.title}"...\nScrolling to projects section...`
            };
        } catch (error) {
            console.error('Error fetching project:', error);
            return {
                type: 'error',
                content: `Failed to load project: ${error.message}\n\nPlease try again later.`
            };
        }
    }
};

const projectCommands = { projectsCommand, projectCommand };

export default projectCommands;
