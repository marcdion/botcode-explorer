'use strict'

import createTree from 'directory-tree';
import store from '../data/store';

const trees: createTree.DirectoryTree[] = [];

const watcher = {
    /**
     * Takes in paths and creates Object (trees) from them. Sets the values in data store
     * @param {string[]} paths 
     */
    _initDirectories: function(paths: string[]) {
        for(let index = 0; index < paths.length; index++) {
            const tree = createTree(paths[index], {attributes: ['type', 'extension']});
            trees.push(tree);
        }

        store.trees = trees;
    }
}

export default watcher