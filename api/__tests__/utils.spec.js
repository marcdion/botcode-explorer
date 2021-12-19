const utils     = require('../dist/utils/utils').default;
const errors    = require('../dist/utils/errors').default;

describe('utility functions', () => {
    function runValidateIfPathsAreValidInArrayPathNotValid(args) {
        it('validateIfPathsAreValidInArray - path is not a valid format', () => {    
            const invalidPaths = utils._validateIfPathsAreValidInArray(args);
    
            expect(Object.keys(invalidPaths).length).toBe(1);
            expect(invalidPaths[args[0]]).toBe(errors.INVALID_PATH_FORMAT)
        });
    }

    runValidateIfPathsAreValidInArrayPathNotValid(['.test']);
    runValidateIfPathsAreValidInArrayPathNotValid(['test']);
    runValidateIfPathsAreValidInArrayPathNotValid(['/test']);

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
    
});