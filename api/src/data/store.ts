'use strict'

import createTree from 'directory-tree';

type Store = {
    trees: createTree.DirectoryTree[]
}

const store: Store = {
    trees: []
}

export default store