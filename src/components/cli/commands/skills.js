export const skillsCommand = {
  name: 'skills',
  description: 'Display technical skills',
  aliases: ['tech', 'stack'],
  execute: (args, context) => {
    return {
      type: 'info',
      content: `
╔════════════════════════════════════════════════════════════════╗
║  skills.js  (according to me, which is a biased source)        ║
╚════════════════════════════════════════════════════════════════╝

JavaScript   ████████████████████░░░  85%  <- writes it. fears it. loves it. hates it.
React        ███████████████████░░░░  80%  <- useEffect has broken me as a person
Node.js      ████████████████░░░░░░░  70%  <- it's just javascript but angrier
CSS / UI     ████████████████████░░░  85%  <- i am good at css and i will die on this hill
MongoDB      ███████████████░░░░░░░░  65%  <- NoSQL because structure is for cowards
Python       ████████████░░░░░░░░░░░  50%  <- enough to be dangerous, not enough to be useful
Git          █████████████████████░░  90%  <- the 90% is git stash. the other 10% is crying.

Currently learning:
  > TypeScript   (JavaScript with trust issues)
  > Next.js      (React but it judges you more)
  > Docker       (still not sure what it actually does)

stackoverflow is my unpaid senior developer.
Type 'projects' to see these skills in action (or in flames).
      `.trim()
    };
  }
};

export default skillsCommand;
