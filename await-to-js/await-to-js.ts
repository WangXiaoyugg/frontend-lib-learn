/**
 * @param { Promise } promise
 * @param { Object= } errorExt - Additional Information you can pass to the err object
 * @return { Promise }
 */

export function to<T, U=Error>(
    promise: Promise<T>,
    errorExt?: object
): Promise<[U, undefined] | [null, T]> {
    return promise
        .then<[null, T]>((data: T) => [null, data])
        .catch<[U, undefined]>((error: U) => {
            if (errorExt) {
                const parsedError = Object.assign({}, error, errorExt);
                return [parsedError, undefined]
            }
            return [error, undefined]

        })
}