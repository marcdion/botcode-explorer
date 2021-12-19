'use strict'

import fs from 'fs';
import errors from './errors'

const PATH_VALIDATION_REGEX: RegExp = /^(.\/|..\/|~\/|78).*$/;

/**
 * Validates if string is valid path
 * @param {string} path 
 * @returns {boolean} 
 */
const validateIfPathIsValid = (path: string): boolean => {
    return PATH_VALIDATION_REGEX.test(path);
}

/**
 * Validates if a path exists on the file system
 * @param path 
 * @returns {boolean}
 */
const validateIfPathExists = (path: string): boolean => {
    return fs.existsSync(path);
}

/**
 * Validates if a path is a directory and not a file
 * @param path 
 * @returns {boolean}
 */
const validateIfPathIsADirectory = (path: string): boolean => {
    return fs.lstatSync(path).isDirectory() 
}

const utils = {
    /**
     * Validates if paths are a valid format in array
     * @param directories 
     * @returns {string[]} array containing all invalid paths
     */
    _validateIfPathsAreValidInArray: function(directories: string[]): {[key: string]: string} {
        const invalidPaths: {[key: string]: string} = {};
        directories.forEach((path: string) => {
            const isPathValid: boolean = validateIfPathIsValid(path);
            if(!isPathValid) {
                invalidPaths[path] = errors.INVALID_PATH_FORMAT;
                return;
            }

            const pathExists: boolean = validateIfPathExists(path);
            if(!pathExists) {
                invalidPaths[path] = errors.PATH_DOES_NOT_EXIST;
                return;
            }

            const pathIsADirectory: boolean = validateIfPathIsADirectory(path);
            if(!pathIsADirectory) {
                invalidPaths[path] = errors.PATH_IS_NOT_A_DIRECTORY;
                return;
            }
        });

        return invalidPaths;
    }
}

export default utils