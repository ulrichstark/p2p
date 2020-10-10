import * as fs from "fs";
import * as readline from "readline";
import { LocalNode } from "./net/LocalNode";
import { IConfig } from "./IConfig";
import { test } from "./test";
import { Bytes } from "./data/Bytes";
import { Hash } from "./data/Hash";

test();

const userInterface = readline.createInterface({ input: process.stdin, output: process.stdout });

askForHash();

function askForHash() {
    userInterface.question("Number: ", (answer) => {
        const number = Number.parseInt(answer);
        const bytes = new Bytes(3);
        bytes.set(number);

        const hash = Hash.generate(8, bytes);

        console.log(`${bytes.toString()} -> ${hash.toString()}`);

        askForHash();
    });
}

const bytes = new Bytes(3);
bytes.set(10777);

console.log();

const config = readConfig();
const { port, seeds } = config;

const localNode = new LocalNode(port);

for (const seed of seeds) {
    localNode.connect(seed.port);
}

function readConfig(): IConfig {
    const filePath = process.argv[2];
    const fileContent = fs.readFileSync(filePath);
    const config = JSON.parse(fileContent.toString()) as IConfig;
    return config;
}
