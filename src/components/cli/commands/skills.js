export const skillsCommand = {
  name: 'skills',
  description: 'Display technical skills',
  aliases: ['tech', 'stack'],
  execute: (args, context) => {
    return {
      type: 'info',
      content: `
╔════════════════════════════════════════════════════════╗
║  Technical Skills & Expertise                          ║
╚════════════════════════════════════════════════════════╝

Frontend Development:
  ▸ React.js          ████████████████░░  90%
  ▸ JavaScript (ES6+) ████████████████░░  90%
  ▸ HTML5 & CSS3      ███████████████░░░  85%
  ▸ Responsive Design ███████████████░░░  85%

Backend Development:
  ▸ Node.js           ███████████████░░░  85%
  ▸ Express.js        ███████████████░░░  85%
  ▸ RESTful APIs      ████████████████░░  90%
  ▸ MongoDB           ██████████████░░░░  80%

Tools & Technologies:
  ▸ Git & GitHub      ████████████████░░  90%
  ▸ VS Code           ████████████████░░  90%
  ▸ Postman           ███████████████░░░  85%
  ▸ npm/yarn          ████████████████░░  90%

Currently Learning:
  ▸ TypeScript
  ▸ Next.js
  ▸ Docker

Type 'projects' to see these skills in action!
      `.trim()
    };
  }
};

export default skillsCommand;
