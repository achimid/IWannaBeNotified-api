
const skipOnError = (fn, object) => (object instanceof Error ? object : fn(object))
const skip = fn => object => (object instanceof Error ? object : fn(object))

const throwErrorWhen = condition => (ErrorType, message) => (object) => {
    if (condition(object)) throw new ErrorType(message)

    return Promise.resolve(object)
}

const throwErrorIfNotExists = throwErrorWhen(object => !object)

const throwErrorIfExists = throwErrorWhen(object => !!object)

module.exports = {
    skipOnError,
    skip,
    throwErrorIfNotExists,
    throwErrorIfExists
}
