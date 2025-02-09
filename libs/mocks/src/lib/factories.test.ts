import { describe, it, expect } from 'vitest';
import { createUser } from './factories';

describe('createUser', () => {
    it('should create a user with valid properties', () => {
        const user = createUser();

        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('name');
        expect(user).toHaveProperty('email');
        expect(user).toHaveProperty('avatar');

        expect(typeof user.id).toBe('string');
        expect(typeof user.name).toBe('string');
        expect(typeof user.email).toBe('string');
        expect(typeof user.avatar).toBe('string');
    });

    it('should create a user with a valid email', () => {
        const user = createUser();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        expect(emailRegex.test(user.email)).toBe(true);
    });

    it('should create a user with a valid UUID', () => {
        const user = createUser();
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

        expect(uuidRegex.test(user.id)).toBe(true);
    });
});