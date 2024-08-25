export class MissingAccountError extends Error {

    constructor(msg: string) {
        super(msg);
    }
}