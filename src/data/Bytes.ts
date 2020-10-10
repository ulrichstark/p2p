const characters = "0123456789ABCDEF";

export class Bytes {
    public bytes: number[] = [];

    constructor(length: number) {
        for (let i = 0; i < length; i++) {
            this.bytes.push(0);
        }
    }

    public setByte(index: number, byte: number) {
        this.bytes[index] = byte % 256;
    }

    public set(value: number) {
        const values = [];

        do {
            values.unshift(value % 256);
            value = Math.floor(value / 256);
        } while (value > 0);

        this.fill(values);
    }

    public fill(values: number[]) {
        while (values.length < this.bytes.length) {
            values.unshift(0);
        }

        this.bytes = values;
    }

    public toString() {
        let text = "";

        for (const byte of this.bytes) {
            const bigChar = characters[Math.floor(byte / 16)];
            const smallChar = characters[byte % 16];
            text += bigChar + smallChar;
        }

        return text;
    }
}
