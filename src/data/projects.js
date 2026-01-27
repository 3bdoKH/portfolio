import project1 from '../images/project-1.png';
import project2 from '../images/project-2.png';
import project3 from '../images/project-3.png';
import project4 from '../images/project-4.png';
import project5 from '../images/project-5.png';
import project6 from '../images/project-6.png';

export const projects = [
    {
        id: 1,
        title: 'project_one',
        displayTitle: "Adam's Agency",
        description: 'Adam’s Agency is a marketing and technology company delivering innovative digital solutions for businesses worldwide.',
        image: project1,
        tags: ['React', 'Node.js', 'MongoDB'],
        links: {
            live: 'https://adams-agency.online/'
        }
    },
    {
        id: 2,
        title: 'project_two',
        displayTitle: 'Dalel Altashtebat',
        description: 'Dalil Al-Tashtebat is a leading platform that connects homeowners and office owners with top finishing and renovation companies in Egypt.',
        image: project2,
        tags: ['React', 'express', 'MySQL', 'Node.js', 'Bootstrap'],
        links: {
            live: 'https://dalel-eltashtebat.online/'
        }
    },
    {
        id: 3,
        title: 'project_three',
        displayTitle: 'Kayan',
        description: 'I developed this website to showcase a leading finishing services company with over 15 years of experience and 500+ completed projects across Egypt.',
        image: project3,
        tags: ['React', 'Node.js', 'MongoDB', 'Bootstrap'],
        links: {
            live: 'https://www.kayan-tashteebbeltaqseet.online/'
        }
    },
    {
        id: 4,
        title: 'project_four',
        displayTitle: 'Tashteeb Beltaqseet',
        description: 'This website was developed for a finishing and construction company with over 15 years of experience, offering high-quality services at competitive prices.',
        image: project4,
        tags: ['React', 'Node.js', 'MongoDB', 'Bootstrap'],
        links: {
            live: 'https://www.tashteeb-beltaqseet.com/'
        }
    },
    {
        id: 5,
        title: 'project_five',
        displayTitle: 'Portfolio V1',
        description: 'Modern, responsive portfolio website showcasing skills and projects with a unique  design.',
        image: project5,
        tags: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
        links: {
            live: 'https://my-portfolio-deploy-nine.vercel.app/'
        }
    },
    {
        id: 6,
        title: 'project_six',
        displayTitle: 'Winch Enqaz Cars',
        description: 'A leading 24/7 vehicle rescue and towing service in Egypt, providing fast, professional solutions across all governorates. Equipped with modern tow trucks and expert technicians, we ensure safety, reliability, and customer satisfaction.',
        image: project6,
        tags: ['React', 'Node.js', 'MySQL', 'Express'],
        links: {
            live: 'https://winchenqaz.com/'
        }
    }
];
