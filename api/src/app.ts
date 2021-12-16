'use strict'

import express  from 'express';
import logger   from 'node-color-log';
import utils    from './utils/utils';

const app               = express();
const port              = process.env.PORT || 3000;
const args: string[]    = process.argv.slice(2);

app.get('/', (req, res) => res.send('Botcode explorer API is running smoothly!'));

if(args && args.length !== 0) {
    const invalidPaths: string[] = utils._validateIfPathsAreValidInArray(args);
    if(invalidPaths.length === 0) {
        app.listen(port, () => {
            const directoryString: string = args.length === 1 ? 'directory' : 'directories';
            logger.color('green').bold().log(`⚡️[server]: Tracking changes to ${args.length} ${directoryString}. API is running at http://localhost:${port}`);
        });
    }else {
        for (const path of invalidPaths) {
            logger.color('red').bold().log(`${path} is not a valid path`);
        }
    }
}else {
    logger.color('red').bold().log('You must specify at least one directory path!');
}