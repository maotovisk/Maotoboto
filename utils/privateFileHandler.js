'use strict'
import readline from 'readline';
import * as fs from 'fs';
import { print, printError } from './printUtils.js'

const PRIVATE_FILE_PATH = "./.private/private.json",
    PRIVATE_FOLDER_PATH = "./.private/";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const checkPrivateFiles = async () => {
    return new Promise((resolve, reject) => {
        try {
            fs.readFile(PRIVATE_FILE_PATH, 'utf8', async (err, data) => {
                if (!err) {
                    print("Private file exists!")
                    resolve(true);
                } else {
                    printError("Private file not found!")
                    print("###### Please get your credentials prepared! The bot will set it up!")
                    let privateFile = {};

                    rl.question("Please insert your DISCORD API TOKEN: ", async (discordToken) => {
                        privateFile.DISCORD_TOKEN = discordToken;
                        rl.question("Please insert your OSU API TOKEN: ", async (osuToken) => {
                            privateFile.OSU_API = osuToken;
                            rl.question("Please insert your LEAGUE API TOKEN: ", async (leagueToken) => {
                                privateFile.LEAGUE_API = leagueToken;
                                fs.mkdir(PRIVATE_FOLDER_PATH, (err) => {
                                    fs.writeFile(PRIVATE_FILE_PATH, JSON.stringify(privateFile), (err) => {
                                        if (err)
                                            throw err;
                                        console.log(JSON.stringify(privateFile));
                                        print("Private file has been created")
                                        resolve(true);
                                    });
                                })
                            });
                        });
                    });
                }
            });
        } catch (e) {
            printError(e);
        }
    });
}

const get = (token) => {
    return new Promise((resolve, reject) => {
        fs.readFile(PRIVATE_FILE_PATH, (err, data) => {
            let credentials = JSON.parse(data);
            switch (token) {
                case "DISCORD_TOKEN":
                    resolve(credentials.DISCORD_TOKEN);
                    break;
                case "OSU_API":
                    resolve(credentials.OSU_API);
                    break;
                case "LEAGUE_API":
                    resolve(credentials.LEAGUE_API);
                    break;
                case "MONGO_URL":
                    resolve(credentials.MONGO_URL);
                    break;
            }
        });
    });
}

export default checkPrivateFiles;
export { checkPrivateFiles, get }