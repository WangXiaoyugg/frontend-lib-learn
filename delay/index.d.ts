export type Options<T> = {
    value?: T;
    signal?: AbortSignal;
}


export default function delay<T>(
    milliseconds: number,
    options?: Options<T>
): Promise<T>;


export function rangeDelay<T>(
    minimum: number,
    maximum: number,
    options?: Options<T>
): Promise<T>;

export function clearDelay(delayPromise: Promise<unknown>): void;

export function createDelay(timers: {
    clearTimeout: (timeoutId: any) => void;
    setTimeout: (callback: (...args: any[]) => void, milliseconds: number, ...args: any[]) => unknown;
}): typeof delay;
