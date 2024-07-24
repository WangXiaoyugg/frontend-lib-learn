
const randomInteger = (minimum, maximum) => Math.floor(Math.random() * (maximum - minimum + 1) + minimum);

const createAbortError = () => {
    const error = new Error("Delay aborted");
    error.name = "AbortError";
    return error;
}

const clearMethods = new WeakMap();

export function createDelay({ clearTimeout: defaultClear, setTimeout: defaultSet} = {}) {

    return (milliseconds, { value, signal } = {}) => {
        if (signal?.aborted) {
            return Promise.reject(createAbortError());
        }    
        let timeoutId;
        let settle;
        let rejectFunction;
        const clear = defaultClear ?? clearTimeout;

        const signalListener = () => {
            clear(timeoutId);
            rejectFunction(createAbortError());
        }

        const cleanup = () => {
            if (signal) {
                signal.removeEventListener("abort", signalListener);
            }
        }

        const delayPromise = new Promise((resolve, reject) => {
            settle = () => {
                cleanup();
                resolve(value);
            }
            rejectFunction = reject;
            timeoutId = (defaultSet ?? setTimeout)(settle, milliseconds);
        })

        if (signal) {
            signal.addEventListener("abort", signalListener);
        }

        clearMethods.set(delayPromise, () => {
            clear(timeoutId);
            timeoutId = null;
            settle();
        });

        return delayPromise;
    }
    
}

const delay = createDelay();

export default delay;

export async function rangeDelay(minimum, maximum, options) {
    return delay(randomInteger(minimum, maximum), options);
}
export function clearDelay(promise) {
    clearMethods.get(promise)();
}