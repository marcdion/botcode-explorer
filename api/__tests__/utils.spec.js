const utils     = require('../dist/utils/utils').default;
const errors    = require('../dist/utils/errors').default;

describe('utility functions', () => {
    function runValidateIfPathsAreValidInArrayPathDoesNotExist(args) {
        it('validateIfPathsAreValidInArray - path does not exist', () => {    
            const invalidPaths = utils._validateIfPathsAreValidInArray(args);
    
            expect(Object.keys(invalidPaths).length).toBe(1);
            expect(invalidPaths[args[0]]).toBe(errors.PATH_DOES_NOT_EXIST)
        });
    }

    runValidateIfPathsAreValidInArrayPathDoesNotExist(['./fakepath']);

    function runValidateIfPathsAreValidInArrayPathIsNotADirectory(args) {
        it('validateIfPathsAreValidInArray - path is not a directory', () => {    
            const invalidPaths = utils._validateIfPathsAreValidInArray(args);
    
            expect(Object.keys(invalidPaths).length).toBe(1);
            expect(invalidPaths[args[0]]).toBe(errors.PATH_IS_NOT_A_DIRECTORY)
        });
    }
    
    runValidateIfPathsAreValidInArrayPathIsNotADirectory(['./package.json']);
    runValidateIfPathsAreValidInArrayPathIsNotADirectory(['./tsconfig.json']);

    function runValidateIfPathsAreValidInArrayPathIsValid(args) {
        it('validateIfPathsAreValidInArray - path is valid', () => {    
            const invalidPaths = utils._validateIfPathsAreValidInArray(args);
    
            expect(Object.keys(invalidPaths).length).toBe(0);
        });
    }

    runValidateIfPathsAreValidInArrayPathIsValid(['../adr']);
    runValidateIfPathsAreValidInArrayPathIsValid(['./__tests__/testdata']);
    runValidateIfPathsAreValidInArrayPathIsValid(['src']);
});