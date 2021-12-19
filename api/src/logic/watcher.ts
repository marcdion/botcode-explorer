'use strict'

import chokidar     from 'chokidar';
import createTree   from 'directory-tree';
import store        from '../data/store';
import sockets      from './sockets';

/**
 * Watches to changes inside top level directory
 * @param {string }path 
 */
const watchChanges = (path: string) => {
    const watcher = chokidar.watch(path, {
        persistent: true,
        ignoreInitial: true
    });

    watcher
        .on('add', function(path) { regenerateTree(path) })
        .on('change', function(path) { regenerateTree(path) })
        .on('unlink', function(path) { regenerateTree(path) })
        .on('addDir', function(path) { regenerateTree(path) })
        .on('unlinkDir', function(path) { regenerateTree(path) });
};

const regenerateTree = (path: string) => {
    let parentPath = path.substring(0, path.indexOf('/', path.indexOf('/') + 1));
    if(parentPath.charAt(0) !== '.') {
        parentPath = `./${parentPath}`;
    }

    const index = store.trees.findIndex(dir => dir.path === parentPath);
    if(index !== -1) {
        store.trees[index] = createTree(parentPath, {attributes: ['type', 'extension']});
        
        const io = sockets._getIO();
        if(io) {
            io.emit('update', store.trees);
        }
    }
}

const watcher = {
    /**
     * Takes in paths and creates Object (trees) from them. Sets the values in data store
     * @param {string[]} paths 
     */
    _initDirectories: function(paths: string[], watch: boolean = true) {
        for(let index = 0; index < paths.length; index++) {
            const tree = createTree(paths[index], {attributes: ['type', 'extension']});
            store.trees.push(tree);

            if(watch) {
                watchChanges(paths[index]);
            }
        }
    }
}

export default watcher