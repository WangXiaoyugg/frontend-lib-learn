
class Node {
    value;
    next;
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

export default class Queue {
    #head;
    #tail;
    #size;

    constructor() {
        this.clear();
    }

    enqueue(value) {
        const node = new Node(value);
        if (this.#head) {
            this.#tail.next = node;
            this.#tail = node;
        } else {
            this.#head = node;
            this.#tail = node;
        }
        this.#size++;
    }

    dequeue() {
        const current = this.#head;
        if (!current) {
            return;
        }
        this.#head = this.#head.next;
        this.#size--;
        return current.value;
    }

    peek() {
        if (!this.#head) {
            return;
        }
        return this.#head.value;
    }

    get size() {
        return this.#size;
    }

    *[Symbol.iterator]() {
        let current = this.#head;
        while(current) {
            yield current.value;
            current = current.next;
        }
    }

    clear() {
        this.#head = undefined;
        this.#tail = undefined;
        this.#size = 0;
    }
}

