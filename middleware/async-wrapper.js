const asyncWrapper = (controllerFunction) => {
    return async (req, res, next) => {
        try {
            await controllerFunction(req, res, next);
        } catch (error) {
            next(error); //pass the error to the error-handler middleware
        }
    }
}

module.exports = asyncWrapper;