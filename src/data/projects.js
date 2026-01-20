import project1 from '../images/project-1.png';
import project2 from '../images/project-2.png';
import project3 from '../images/project-3.png';
import project4 from '../images/project-4.png';
import project5 from '../images/project-5.png';

export const projects = [
    {
        id: 1,
        title: 'project_one',
        displayTitle: 'E-Commerce Platform',
        description: 'A full-stack e-commerce application with user authentication, product management, and payment gateway integration.',
        image: project1,
        tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        links: {
            github: 'https://github.com',
            live: 'https://example.com'
        }
    },
    {
        id: 2,
        title: 'project_two',
        displayTitle: 'Social Media Dashboard',
        description: 'Real-time analytics dashboard for social media management, featuring data visualization and reporting tools.',
        image: project2,
        tags: ['Vue.js', 'Firebase', 'D3.js', 'Sass'],
        links: {
            github: 'https://github.com',
            live: 'https://example.com'
        }
    },
    {
        id: 3,
        title: 'project_three',
        displayTitle: 'Task Management App',
        description: 'Collaborative task management tool with drag-and-drop interface, team features, and progress tracking.',
        image: project3,
        tags: ['React', 'Redux', 'Express', 'PostgreSQL'],
        links: {
            github: 'https://github.com',
            live: 'https://example.com'
        }
    },
    {
        id: 4,
        title: 'project_four',
        displayTitle: 'Weather Forecast App',
        description: 'Mobile-responsive weather application providing real-time forecasts, location tracking, and severe weather alerts.',
        image: project4,
        tags: ['React Native', 'OpenWeatherMap API', 'Expo'],
        links: {
            github: 'https://github.com',
            live: 'https://example.com'
        }
    },
    {
        id: 5,
        title: 'project_five',
        displayTitle: 'Portfolio Website',
        description: 'Modern, responsive portfolio website showcasing skills and projects with a unique code-themed design.',
        image: project5,
        tags: ['React', 'CSS3', 'Framer Motion'],
        links: {
            github: 'https://github.com',
            live: 'https://example.com'
        }
    }
];
