import Queue from "./index.js";
import assert from "assert";
import { describe, it } from "node:test";

const t = assert;
describe('ycoto-queue', () => {
    it('enqueue', () => {
        const queue = new Queue();
        queue.enqueue('🦄');
        t.equal(queue.dequeue(), '🦄');
        queue.enqueue('🌈');
        queue.enqueue('❤️');
        t.equal(queue.dequeue(), '🌈');
        t.equal(queue.dequeue(), '❤️');
    })

    it('dequeue', () => {
        const queue = new Queue();
        t.equal(queue.dequeue(), undefined);
        t.equal(queue.dequeue(), undefined);
        queue.enqueue('🦄');
        t.equal(queue.dequeue(), '🦄');
        t.equal(queue.dequeue(), undefined);
    })

    it('peek', () => {
        const queue = new Queue();
        t.equal(queue.peek(), undefined);
        queue.enqueue('🦄');
        t.equal(queue.peek(), '🦄');
        queue.enqueue('🌈');
        t.equal(queue.peek(), '🦄');
        queue.dequeue();
        t.equal(queue.peek(), '🌈');
        queue.dequeue();
        t.equal(queue.peek(), undefined);
    })

    it('clear', () => {
        const queue = new Queue();
        queue.clear();
        queue.enqueue(1);
        queue.clear();
        t.equal(queue.size, 0);
        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);
        queue.clear();
        t.equal(queue.size, 0);
    })

    it('size', () => {
        const queue = new Queue();
        t.equal(queue.size, 0);
        queue.clear();
        t.equal(queue.size, 0);
        queue.enqueue('🦄');
        t.equal(queue.size, 1);
        queue.enqueue('🦄');
        t.equal(queue.size, 2);
        queue.dequeue();
        t.equal(queue.size, 1);
        queue.dequeue();
        t.equal(queue.size, 0);
        queue.dequeue();
        t.equal(queue.size, 0);
    })

    it('iterable', () => {
        const queue = new Queue();
        queue.enqueue('🦄');
        queue.enqueue('🌈');
        t.deepEqual([...queue], ['🦄', '🌈']);
    })
})
