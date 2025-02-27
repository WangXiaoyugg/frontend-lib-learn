import Queue from 'yocto-queue';

export default function pLimit(concurrency) {
    const queue = new Queue();
    let activeCount = 0;
    const resumeNext = () => {
        if (activeCount < concurrency && queue.size > 0) {
            queue.dequeue()();
            // Since `pendingCount` has been decreased by one, increase `activeCount` by one.
            activeCount++
        }
    }

    const next = () => {
        activeCount--;
        resumeNext();
    }

    const run = async (function_, resolve, arguments_) => {
        const result =  (async () => function_(...arguments_))();
        resolve(result);
        try {
            await result;
        } catch {

        }
        next();
    }

    const enqueue = (function_, resolve, arguments_) => {
        // Queue `internalResolve` instead of the `run` function
		// to preserve asynchronous context.
        new Promise(internalResolve => {
            queue.enqueue(internalResolve);
        }).then(
            run.bind(undefined, function_, resolve, arguments_),
        )

        (async () => {
            await Promise.resolve();
            if (activeCount < concurrency) {
                resumeNext();
            }
        })
    }

    const generator = (function_, ...arguments_) => new Promise((resolve) => {
        enqueue(function_, resolve, arguments_);
    })

    Object.defineProperties(generator, {
        activeCount: {
            get: () => activeCount,
        },
        pendingCount: {
            get: () => queue.size,
        },
        clearQueue: {
            value: () => {
                queue.clear();
            },
        },
        concurrency: {
            get: () => concurrency,
            set(newConcurrency) {
                validateConcurrency(newConcurrency);
                concurrency = newConcurrency;
                queueMicrotask(() => {
                    while(activeCount < concurrency && queue.size > 0) {
                        resumeNext();
                    }
                })

            }
        }
    })

    return generator;
}

function validateConcurrency(concurrency) {
    if (!((Number.isInteger(concurrency) || concurrency === Number.POSITIVE_INFINITY) && concurrency > 0)) {
        throw new TypeError('Expected `concurrency` to be a number from 1 and up');
    }
}