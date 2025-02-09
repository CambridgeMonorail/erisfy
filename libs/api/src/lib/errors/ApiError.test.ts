import { ApiError } from "./ApiError";


describe('ApiError', () => {
    it('should create an instance of ApiError with the correct properties', () => {
        const status = 404;
        const message = 'Not Found';
        const data = { error: 'Resource not found' };

        const error = new ApiError(status, message, data);

        expect(error).toBeInstanceOf(ApiError);
        expect(error.name).toBe('ApiError');
        expect(error.message).toBe(message);
        expect(error.status).toBe(status);
        expect(error.data).toBe(data);
    });

    it('should create an instance of ApiError without optional data', () => {
        const status = 500;
        const message = 'Internal Server Error';

        const error = new ApiError(status, message);

        expect(error).toBeInstanceOf(ApiError);
        expect(error.name).toBe('ApiError');
        expect(error.message).toBe(message);
        expect(error.status).toBe(status);
        expect(error.data).toBeUndefined();
    });

    it('should have the correct prototype chain', () => {
        const error = new ApiError(400, 'Bad Request');
        expect(error).toBeInstanceOf(Error);
        expect(Object.getPrototypeOf(error)).toBe(ApiError.prototype);
    });
});