import * as readline from "readline";
import { LocalNode } from "./net/LocalNode";

const userInterface = readline.createInterface({ input: process.stdin, output: process.stdout });

userInterface.question("Local Port: ", (answer) => {
    const localPort = Number.parseInt(answer);

    if (Number.isNaN(localPort)) {
        return;
    }

    const localNode = new LocalNode(localPort);

    userInterface.question("Target Port: ", (answer) => {
        const targetPort = Number.parseInt(answer);

        if (Number.isNaN(targetPort)) {
            return;
        }

        localNode.connect(targetPort);
    });
});
