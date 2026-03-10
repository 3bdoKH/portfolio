export const gitCommand = {
    name: 'git',
    description: 'Git log and other git commands',
    execute: (args, context) => {
        const sub = args[0];

        if (sub === 'log') {
            return {
                type: 'info',
                content: `
commit f00d42a  (HEAD -> main, origin/main)
Author: Abdulrahman Khairy <the.abdo.kh@gmail.com>
Date:   just now

    pushed to main. closed laptop. not looking back.

commit cc12345
Date:   10 minutes ago

    CSS is fine. I am fine. everything is fine.

commit 9b1e44f
Date:   2 hours ago

    it works. don't touch it. don't even look at it.

commit a3f2c1b
Date:   yesterday at 2am

    fix bug (introduced 3 others, deal with it)

commit de4db33f
Date:   last week

    rewrite everything i just wrote because i hated it

commit b4dc0de
Date:   last month

    add comments so future me understands this
    (future me does not understand this)

commit 0000001
Date:   2023

    first commit. thought i was a genius.
    i was not.

-- end of git log. please don't judge the commit messages. --
        `.trim()
            };
        }

        if (sub === 'push') {
            return {
                type: 'info',
                content: `
> git push --force
! Warning: force pushing to main
  ...
  refreshed the url 47 times after. no regrets.
        `.trim()
            };
        }

        if (sub === 'stash') {
            return {
                type: 'info',
                content: `Saved working directory state to stash.\n(the graveyard of good ideas and half-finished features)`
            };
        }

        return {
            type: 'error',
            content: `git: '${sub || ''}' is not a git command.\nTry: git log, git push, git stash`
        };
    }
};

export default gitCommand;
