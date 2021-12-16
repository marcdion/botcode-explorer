'use strict'

const PATH_VALIDATION_REGEX: RegExp = /^(.\/|..\/|~\/|78).*$/;

/**
 * Validates if string is valid path
 * @param {string} path 
 * @returns {boolean} 
 */
const validateIfPathIsValid = (path: string): boolean => {
    return PATH_VALIDATION_REGEX.test(path);
}

const utils = {
    /**
     * Validates if paths are a valid format in array
     * @param directories 
     * @returns {string[]} array containing all invalid paths
     */
    _validateIfPathsAreValidInArray: function(directories: string[]): string[] {
        const invalidPaths: string[] = [];

        directories.forEach((path: string) => {
            const isPathValid: boolean = validateIfPathIsValid(path);
            if(!isPathValid) {
                invalidPaths.push(path);
            }
        });

        return invalidPaths;
    }
}

export default utils