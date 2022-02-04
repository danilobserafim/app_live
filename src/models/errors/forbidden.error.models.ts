export default class forbiddenError extends Error {
    constructor(
        public message: string,
        public error?: any
    ) {
        super(message)

    }
}