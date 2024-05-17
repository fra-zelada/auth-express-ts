export class CustomError extends Error {
    constructor(public statusCode: number, message: string) {
        super(message);
    }

    public static badRequest(message: string) {
        return new CustomError(400, message);
    }

    public static unauthorized(message: string) {
        return new CustomError(401, message);
    }

    public static notFound(message: string) {
        return new CustomError(404, message);
    }

    public static internal(message: string) {
        return new CustomError(500, message);
    }
}
