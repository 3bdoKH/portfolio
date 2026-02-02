export const contactCommand = {
   name: 'contact',
   description: 'Show contact information',
   aliases: ['email', 'reach'],
   execute: (args, context) => {
      return {
         type: 'info',
         content: `
╔════════════════════════════════════════════════════════╗
║  Contact Information                                   ║
╚════════════════════════════════════════════════════════╝

 Email:
   the.abdo.kh@gmail.com

 GitHub:
   github.com/3bdoKH

 Portfolio:
   abdokhairy.tech

 Let's connect! Feel free to reach out for:
   • Job opportunities
   • Collaboration on projects
   • Technical discussions
   • Freelance work

Type 'projects' to see my work
Type 'cv' to view my resume
      `.trim()
      };
   }
};

export default contactCommand;
