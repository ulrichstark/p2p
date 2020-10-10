import { Bytes } from "./data/Bytes";

function assert(actual: any, expected: any) {
    if (actual === expected) {
        return;
    }

    if (JSON.stringify(actual) === JSON.stringify(expected)) {
        return;
    }

    console.log(`TEST FAILED: ${actual} != ${expected}`);
}

function assertBytes(length: number, value: number, hex: string) {
    const bytes = new Bytes(length);
    bytes.set(value);

    assert(bytes.toString(), hex);
}

export function test() {
    assertBytes(1, 0, "00");
    assertBytes(2, 0, "0000");
    assertBytes(2, 1, "0001");
    assertBytes(2, 15, "000F");
    assertBytes(2, 16, "0010");
    assertBytes(2, 17, "0011");
    assertBytes(2, 70, "0046");
    assertBytes(2, 254, "00FE");
    assertBytes(2, 255, "00FF");
    assertBytes(2, 300, "012C");
    assertBytes(2, 512, "0200");
    assertBytes(3, 514, "000202");
}
