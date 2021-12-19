# Botcode - The vs-code like file explorer

## What is Botcode ?

Botcode is a vs-code like explorer built with Node JS, NextJS and Socket.IO. It takes in folders from your local machine and displays them in a browser.

## Getting started
**Run locally:**

To run locally, first make sure you have node.js and npm installed. Then:

**API**
1. go to the /api directory
2. run npm install
3. run **npm run start** *your directories*

**Front end**
1. go to the /explorer directory
2. run npm install
3. run **npm run dev**

visit http://localhost:3001 to see the explorer


**Run tests:** 
1. go to the /api directory
2. run npm run test

*This was tested on Mac and Windows, with Node.js version v12.19.0 and npm version 6.14.8*

## Improvements
Here are the things that I would like to improve in the future:

- For the sake of simplicity, the code base was put into one repository, even though is consists of two independent applications. In a real world scenario, the FE and BE would be in two separate repositories. If you want to read why I decided to split the application in two parts, see [ADR-001](./adr/adr-001.md)

- In the directories.spec.js file, we test out the creation of the trees from the paths passed to the application. To do this, I created some dummy data in the __tests__/data folder. This is not robust as someone could change or add to this without knowing and it would break the tests. I would have used something like [node-temp](https://github.com/bruce/node-temp) to create temporary data, run the tests and then delete them. That way, we do not need to commit some dummy data and the tests are more robusts.

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


Built with ❤️ in Quebec City