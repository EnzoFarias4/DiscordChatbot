const fsPromises = require('fs').promises;
const { exec } = require('child_process');
const util = require('util');
const execPromisified = util.promisify(exec);
require('dotenv').config();

class CommandModule {
    constructor() {
        this.languagePath = process.env.LANGUAGE_PATH;
    }

    async executeCommand(cmd) {
        const fullCmd = `${this.languagePath} ${cmd}`;

        try {
            const { stdout, stderr } = await execPromisified(fullCmd);
            return stdout ? stdout : stderr;
        } catch (error) {
            console.error(`exec error: ${error}`);
            throw error; // Rethrow an error to be caught by the caller.
        }
    }

    async saveAndExecute(scriptContent, scriptName) {
        const filePath = `./${scriptName}`;

        try {
            await fsPromises.writeFile(filePath, scriptContent);
            const result = await this.executeCommand(filePath);
            await fsPromises.unlink(filePath); // Remove the script file after execution
            console.log(`Script executed successfully: ${result}`);
            return result;
        } catch (err) {
            await fsPromises.unlink(filePath).catch(cleanupErr => console.error(`Cleanup failed: ${cleanupErr}`)); // Ensure cleanup in case of errors
            console.error(`An error occurred: ${err}`);
            throw err; // Rethrow the error for further handling.
        }
    }
}

const myCommandModule = new CommandModule();
const myScriptContent = 'console.log("Hello, World!");';
const myScriptName = 'exampleScript.js';

(async () => {
    try {
        await myCommandModule.saveAndExecute(myScriptContent, myScriptName);
    } catch (error) {
        console.error(`Failed to save or execute script: ${error}`);
    }
})();