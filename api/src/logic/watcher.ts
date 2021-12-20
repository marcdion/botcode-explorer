'use strict'

import chokidar     from 'chokidar';
import createTree   from 'directory-tree';
import store        from '../data/store';
import sockets      from './sockets';

/**
 * Watches to changes inside top level directory
 * @param {string} path 
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


/**
 * Regenerates tree when an element in it changes
 * @param {string} path
 */
const regenerateTree = (path: string) => {
    let index = -1;
    for(let i: number = 0; i < store.trees.length; i++) {
        const tree = store.trees[i];
        if(pathExistsInTree(tree, 'path', path)) {
            index = i;
        }
    }
    
    if(index !== -1) {
        store.trees[index] = createTree(store.trees[index].path, {attributes: ['type', 'extension']});
        
        const io = sockets._getIO();
        if(io) {
            io.emit('update', store.trees);
        }
    }
}

/**
 * Check if path exists in tree
 * @param {Object} obj
 * @param {string} key
 * @param {string} value
 * @returns {Object} returns the node if it exists
 */
const pathExistsInTree = (obj: any, key: string, value: string): any => {
    if (obj[key] === value) {
      return obj;
    } else {
      let keys = Object.keys(obj);
  
      for (let i = 0, len = keys.length; i < len; i++) {
        let k = keys[i];
  
        if (obj[k] && typeof obj[k] == 'object') {
          let found = pathExistsInTree(obj[k], key, value);
          if (found) {
            return found;
          }
        }
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