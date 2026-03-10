export const aboutCommand = {
   name: 'about',
   description: 'Display bio and information',
   aliases: ['whoami', 'info'],
   execute: (args, context) => {
      return {
         type: 'info',
         content: `
╔════════════════════════════════════════════════════════╗
║  Abdelrahman Khairy - Full-Stack Developer             ║
╚════════════════════════════════════════════════════════╝

 About Me:
   Passionate full-stack developer specializing in building
   modern web applications with React, Node.js, and MongoDB.
   
 Focus Areas:
   • Frontend: React, JavaScript, HTML/CSS
   • Backend: Node.js, Express, MongoDB
   • Tools: Git, VS Code, Postman
   
 Experience:
   Building scalable web applications and RESTful APIs
   with focus on clean code and user experience.

 Interests:
   Web Development, UI/UX Design, Problem Solving

Type 'skills' to see my technical stack
Type 'projects' to view my work
Type 'contact' to get in touch
      `.trim()
      };
   }
};

export default aboutCommand;
