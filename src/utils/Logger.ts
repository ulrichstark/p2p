export class Logger {
    private tag: string;

    constructor(tag: string) {
        this.tag = tag;
    }

    public log(text: string) {
        console.log(`${this.tag}> ${text}`);
    }

    public logError(error: Error) {
        this.log(`${error.name} ${error.message}`);
    }
}
