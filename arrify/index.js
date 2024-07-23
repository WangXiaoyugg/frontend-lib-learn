/**
 * arrify 
 * covert a value to an array;
 * import arrify from 'arrify';

        arrify('🦄');
        //=> ['🦄']

        arrify(['🦄']);
        //=> ['🦄']

        arrify(new Set(['🦄']));
        //=> ['🦄']

        arrify(null);
        //=> []

        arrify(undefined);
        //=> []
 */

function arrify(value) {
    if (value === null || value === undefined) {
        return [];
    }

    if (typeof value === 'string') {
        return [value];
    }

    if (Array.isArray(value)) {
        return value;
    }

    if (typeof value[Symbol.iterator] === 'function') {
        return [...value];
    }

    return [value];
    
}

export default arrify;