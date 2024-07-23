import arrify from "./index.js";
import { describe, it } from "node:test";
import assert from "assert";

describe("arrify", () => {
    assert.deepEqual(arrify('foo'), ['foo']);
    assert.deepEqual(arrify(new Map([[1,2], ['a', 'b']])), [[1,2], ['a', 'b']]);
    assert.deepEqual(arrify(new Set([1,2,3])), [1,2,3])
    assert.deepEqual(arrify(null), []);
    assert.deepEqual(arrify(undefined), []);
    assert.deepEqual(arrify(1), [1]);

    const fooArray = ['foo'];
    assert.deepEqual(arrify(fooArray), fooArray);
})