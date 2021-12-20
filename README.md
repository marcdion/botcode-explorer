# Botcode - The vs-code like file explorer

## What is Botcode ?

Botcode is a vs-code like explorer built with Node JS, NextJS and Socket.IO. It takes in folders from your local machine and displays them in a browser.

## Getting started
**Run locally:**

To run locally, first make sure you have node.js and npm installed. Make sure you have at least Node.JS LTS (16.13.1) or newer. Then:

**API**
1. go to the /api directory
2. run npm install
3. run **npm run start** *your directories*
4. example: npm run start ../adr ./src

**Front end**
1. go to the /explorer directory
2. run npm install
3. run **npm run dev**

Visit http://localhost:3001 to see the explorer in action.

**Run tests:** 
1. go to the /api directory
2. run npm run test

*This was tested on Mac and Windows, with Node.js LTS version v16.13.1 and npm version 8.1.2.*

## Improvements
Here are the things that I would like to improve in the future:

- For the sake of simplicity, the code base was put into one repository, even though is consists of two independent applications. In a real world scenario, the FE and BE would be in two separate repositories. If you want to read why I decided to split the application in two parts, see [ADR-001](./adr/adr-001.md).

- In the directories.spec.js file, we test out the creation of the trees from the paths passed to the application. To do this, I created some dummy data in the __tests__/data folder. This is not robust as someone could change or add to this without knowing and it would break the tests. I would have used something like [node-temp](https://github.com/bruce/node-temp) to create temporary data, run the tests and then delete them. That way, we do not need to commit some dummy data and the tests are more robusts.

- I spent around a day working on an algorithm that would remove/update files and folder from the tree object when it was changed on the host. I wanted to avoid regenerating the entire tree everytime a change was made. It made the code really messy and honestly, it did not work in most cases and I doubt it was any more efficient since we had to do a lot of search throught a lot of nested objects and arrays. I am aware that at a very large scale, it may not make sens but considering the time constraint and the complexity, I decided to simply regenerate the tree every time. It makes the code a lot more clean and simple and makes sure it is properly updated every time.

- When you open big directories, like ./node_modules, there is a small delay when opening and closing the parent folder. The action on the button click is instand, but there is a delay from when *setActive()* is called, which updates the state and when the state is actually modified as can be seen in the React Dev Tools. The delay is not noticeable on children folders. I did not have the time to find the cause of it, but this is definetly something I would refactor in the future. To help with this, I would split the trees into smaller chunks, instead of having one big tree in memory, with potentially thousands and thousands of files as children. This would also help speed up the process in the back end when parsing the arguments and creating the tree/trees.

- For now, the unit tests validate the core functionnality but they could be more exhaustive. We could also have developed FE tests in Cypress but this would require a global package to be installed on a user's machine, instead of all being dealt locally. Again, for the sake of being efficient with time, I only tested the core functionnality and input validation.

## Technologies used
Botcode has been developed with:

**API:**
- [Node JS](https://nodejs.org/en/)
- [Express](https://www.npmjs.com/package/express)
- [Socket.IO](https://www.npmjs.com/package/socket.io)
- [directory-tree](https://www.npmjs.com/package/directory-tree)

**Front end:**
- [Next.JS](https://nextjs.org/)
- [Socket.IO Client](https://www.npmjs.com/package/socket.io-client)
- [SASS](https://www.npmjs.com/package/sass)

## ADR (Architecture Decision Records)
- [ADR-001: Why a separate API/front end instead of Next.js integrated server?](./adr/adr-001.md)
- [ADR-002: Why Socket.IO and not WebSocket?](./adr/adr-002.md)
- [ADR-003: Should we support files or only directories as arguments?](./adr/adr-003.md)

Built with ❤️ in Quebec City