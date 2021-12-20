'use strict'

import os           from 'os';
import chokidar     from 'chokidar';
import createTree   from 'directory-tree';
import store        from '../data/store';
import sockets      from './sockets';

const isWindows = os.platform().includes('win32') || os.platform().includes('win64');

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
        .on('add', function(path) { findTree(path, 'add') })
        .on('change', function(path) { findTree(path, 'change') })
        .on('unlink', function(path) { findTree(path, 'unlink') })
        .on('addDir', function(path) { findTree(path, 'addDir') })
        .on('unlinkDir', function(path) { findTree(path, 'unlinkDir') });
};

/**
 * Finds tree where change occured
 * @param {string} path
 */
const findTree = (path: string, action: string) => {
    let index = -1;
    let i = 0;

    while (i < store.trees.length && index === -1) {
        const tree = store.trees[i];

        if(action === 'add' || action === 'addDir') {
            path = normalizeFileName(path);

            if(tree !== null && convertPathForWindows(path).includes(convertPathForWindows(tree.path))) {
                index = i;
            }
        }else {
            if(tree !== null && pathExistsInTree(tree, 'path', path)) {
                index = i;
            }
        }

        i++;
    }
    
    if(index !== -1) {
        regenerateTree(index);
    }
}

/**
 * Converts path from \ to / for windows
 * @param path 
 * @returns {string} path
 */
const convertPathForWindows = (path: string): string => {
    const searchRegExp: RegExp = /\\/g;
    if(isWindows) {
        return path.replace(searchRegExp, '/');
    }

    return path;
}

/**
 * Normalized folder path when it starts with ./ in the file system as directory-tree seems to strip it
 * @param path 
 * @returns {string} path
 */
const normalizeFileName = (path: string): string => {
    return (path.charAt(0) !== '.' && path.charAt(0) !== '/') ? `./${path}` : path;
}

/**
 * Regenerates tree when an element in it changes
 * @param index 
 */
const regenerateTree = (index: number) => {
    store.trees[index] = createTree(store.trees[index].path, {attributes: ['type', 'extension']});

    const io = sockets._getIO();
    if(io) {
        io.emit('update', store.trees);
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