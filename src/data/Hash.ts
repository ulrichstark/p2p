import { Bytes } from "./Bytes";

export class Hash {
    public static generate(length: number, source: Bytes) {
        const { bytes } = source;
        const target = new Bytes(length);

        for (let r = 0; r < 10; r++) {
            for (let i = 0; i < bytes.length; i++) {
                const byte = bytes[i];
                for (let j = 0; j < length; j++) {
                    let value = target.bytes[j];
                    value += value * byte + i + j + r;
                    target.setByte(j, value);
                }
            }
        }

        return target;
    }
}
