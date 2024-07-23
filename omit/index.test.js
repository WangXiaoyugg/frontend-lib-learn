import assert from "assert";
import omit from './index.js';
import { describe, it } from "node:test";

describe("omit", () => {
    it("should create a shadow copy", () => {
        let obj = { name: 'garen' };
        let copy = omit(obj, []);
        assert.deepEqual(copy, obj);
        assert.notEqual(copy, obj);
    })

    it("should drop fields which are passed in", () => {
        let obj = { name: 'garen', age: 18};
        assert.deepEqual(omit(obj, ['name']), { age: 18});
        assert.deepEqual(omit(obj, ['name', 'age']), {});
    })
})