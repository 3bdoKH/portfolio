import {
    FaReact,
    FaNodeJs,
    FaHtml5,
    FaCss3Alt,
    FaJs,
    FaPython,
    FaGitAlt,
    FaDocker,
    FaDatabase,
    FaServer
} from 'react-icons/fa';
import {
    SiNextdotjs,
    SiTypescript,
    SiTailwindcss,
    SiMongodb,
    SiPostgresql,
    SiRedis,
    SiGraphql,
    SiExpress,
    SiVite,
    SiWebpack
} from 'react-icons/si';

// Web Development Skills
export const skills = [
    {
        id: 1,
        icon: FaReact,
        title: 'frontend_development',
        displayTitle: 'Frontend Development',
        description: [
            'Building responsive UIs',
            'Modern applications',
            'Component-based architecture'
        ]
    },
    {
        id: 2,
        icon: FaNodeJs,
        title: 'backend_development',
        displayTitle: 'Backend Development',
        description: [
            'RESTful API design',
            'Server-side logic',
            'Database integration'
        ]
    },
    {
        id: 3,
        icon: FaDatabase,
        title: 'database_management',
        displayTitle: 'Database Management',
        description: [
            'SQL & NoSQL databases',
            'Data modeling',
            'Query optimization'
        ]
    },
    {
        id: 4,
        icon: FaServer,
        title: 'fullstack_development',
        displayTitle: 'Full-Stack Development',
        description: [
            'End-to-end solutions',
            'MERN/MEAN stack',
            'Scalable architectures'
        ]
    }
];

// Technologies & Languages
export const technologies = {
    languages: [
        { name: 'JavaScript', icon: FaJs, color: '#F7DF1E' },
        { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
        { name: 'Python', icon: FaPython, color: '#3776AB' },
        { name: 'HTML5', icon: FaHtml5, color: '#E34F26' },
        { name: 'CSS3', icon: FaCss3Alt, color: '#1572B6' }
    ],
    frontend: [
        { name: 'React', icon: FaReact, color: '#61DAFB' },
        { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
        { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
        { name: 'Vite', icon: SiVite, color: '#646CFF' }
    ],
    backend: [
        { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
        { name: 'Express', icon: SiExpress, color: '#000000' },
        { name: 'GraphQL', icon: SiGraphql, color: '#E10098' }
    ],
    databases: [
        { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
        { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
        { name: 'Redis', icon: SiRedis, color: '#DC382D' }
    ],
    tools: [
        { name: 'Git', icon: FaGitAlt, color: '#F05032' },
        { name: 'Docker', icon: FaDocker, color: '#2496ED' },
        { name: 'Webpack', icon: SiWebpack, color: '#8DD6F9' }
    ]
};
