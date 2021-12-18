'use strict'

import express          from 'express';
import http             from 'http';
import logger           from 'node-color-log';

import utils            from './utils/utils';
import watcher          from './logic/watcher';
import sockets          from './logic/sockets';

const app: express.Application  = express();
const server: http.Server       = http.createServer(app);
const port: string | number     = process.env.PORT || 3000;
const args: string[]            = process.argv.slice(2);

const INVALID_PATH_FORMAT: string = 'invalid path format';
const PATH_DOES_NOT_EXIST: string = 'path does not exist';
const PATH_IS_NOT_A_DIRECTORY: string = 'path is not a directory';

app.get('/', (req, res) => res.send('Botcode explorer API is running smoothly!'));

if(args && args.length !== 0) {
    const invalidPaths: {[key: string]: string} = utils._validateIfPathsAreValidInArray(args);
    if(Object.keys(invalidPaths).length === 0) {
        server.listen(port, () => {
            const directoryString: string = args.length === 1 ? 'directory' : 'directories';

            watcher._initDirectories(args);
            sockets._initIO(server);

            logger.color('green').bold().log(`⚡️[server]: Tracking changes to ${args.length} ${directoryString}. API is running at http://localhost:${port}`);
        });
    }else {
        for (const path in invalidPaths) {
            if(invalidPaths[path] === INVALID_PATH_FORMAT) {
                logger.color('red').bold().log(`[INVALID_PATH_FORMAT]: ${path} is not a valid path`);
            }else if (invalidPaths[path] === PATH_DOES_NOT_EXIST) {
                logger.color('red').bold().log(`[PATH_DOES_NOT_EXIST]: ${path} does not exist`);
            }else if (invalidPaths[path] === PATH_IS_NOT_A_DIRECTORY) {
                logger.color('red').bold().log(`[PATH_IS_NOT_A_DIRECTORY]: ${path} must be a directory`);
            }
        }
    }
}else {
    logger.color('red').bold().log('You must specify at least one directory path!');
}