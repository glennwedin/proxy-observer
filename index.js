const recursiveProxy = (object, handler) => {
    for (const i in object) {
        if (object.hasOwnProperty(i) && typeof object[i] === 'object') {
            recursiveProxy(object[i], handler);
            object[i] = new Proxy(object[i], handler);
        }
    }
};

const createObserver = (object, callback) => {
    const handler = {
        /* @params object, property, value */
        set: (...arguments) => {
            callback(...arguments);
            Reflect.set(...arguments);
        }
    };
    recursiveProxy(object, handler);
    const proxy = new Proxy(object, handler);

    return proxy;
};

module.exports = createObserver;
