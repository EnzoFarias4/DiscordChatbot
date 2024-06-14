const fs = require('fs');
const { exec } = require('child_process');
require('dotenv').config();

class CommandModule {
    constructor() {
        this.languagePath = process.env.LANGUAGE_PATH;
    }

    executeCommand(cmd, callback) {
        const fullCmd = `${this.languagePath} ${cmd}`;

        exec(fullCmd, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return callback(error, null);
            }
            callback(null, stdout ? stdout : stderr);
        });
    }

    saveAndExecute(scriptContent, scriptName, callback) {
        const filePath = `./${scriptName}`;

        fs.writeFile(filePath, scriptContent, (err) => {
            if (err) {
                console.error(`Failed to write script file: ${err}`);
                return callback(err, null);
            }

            this.executeCommand(filePath, (execErr, result) => {
                if (execErr) {
                    console.error(`Failed to execute script: ${execErr}`);
                    callback(execErr, null);
                } else {
                    console.log(`Script executed successfully: ${result}`);
                    callback(null, result);
                }
            });
        });
    }
}

const myCommandModule = new CommandModule();
const myScriptContent = 'console.log("Hello, World!");';
const myScriptName = 'exampleScript.js';

myCommandModule.saveAndExecute(myScript)