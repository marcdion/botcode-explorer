const watcher   = require('../dist/logic/watcher').default;
const store     = require('../dist/data/store').default;

describe('watcher - directories', () => {
    it('initDirectories - validate directories', () => {    
        const args = ['./__tests__/data'];
        watcher._initDirectories(args);

        expect(store.trees.length).toBe(1);

        const tree = store.trees[0];
        expect(tree.path).toBe('./__tests__/data');
        expect(tree.name).toBe('data');
        expect(tree.type).toBe('directory');
        expect(tree.children.length).toBe(2);

        //dir
        expect(tree.children[0].path).toBe('__tests__/data/dir');
        expect(tree.children[0].name).toBe('dir');
        expect(tree.children[0].type).toBe('directory');
        expect(tree.children[0].children.length).toBe(3);

        expect(tree.children[0].children[0].path).toBe('__tests__/data/dir/bar.js');
        expect(tree.children[0].children[0].name).toBe('bar.js');
        expect(tree.children[0].children[0].type).toBe('file');
        expect(tree.children[0].children[0].extension).toBe('.js');

        expect(tree.children[0].children[1].path).toBe('__tests__/data/dir/main.js');
        expect(tree.children[0].children[1].name).toBe('main.js');
        expect(tree.children[0].children[1].type).toBe('file');
        expect(tree.children[0].children[1].extension).toBe('.js');

        expect(tree.children[0].children[2].path).toBe('__tests__/data/dir/main.ts');
        expect(tree.children[0].children[2].name).toBe('main.ts');
        expect(tree.children[0].children[2].type).toBe('file');
        expect(tree.children[0].children[2].extension).toBe('.ts');

        //otherDir
        expect(tree.children[1].path).toBe('__tests__/data/otherDir');
        expect(tree.children[1].name).toBe('otherDir');
        expect(tree.children[1].type).toBe('directory');
        expect(tree.children[1].children.length).toBe(2);

        expect(tree.children[1].children[0].path).toBe('__tests__/data/otherDir/subDir');
        expect(tree.children[1].children[0].name).toBe('subDir');
        expect(tree.children[1].children[0].type).toBe('directory');
        expect(tree.children[1].children[0].children.length).toBe(0);

        expect(tree.children[1].children[1].path).toBe('__tests__/data/otherDir/test.json');
        expect(tree.children[1].children[1].name).toBe('test.json');
        expect(tree.children[1].children[1].type).toBe('file');
        expect(tree.children[1].children[1].extension).toBe('.json');


    });
})
