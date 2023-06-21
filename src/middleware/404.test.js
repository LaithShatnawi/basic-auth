'use strict';
const { app } = require('../server');
const { db } = require('../auth/models/index');
const supertest = require('supertest');
const mockServerMethods = supertest(app);

beforeAll(async () => {
    await db.sync();
});

describe("API Server ", () => {
    it('return 404 in an invalid routes', async () => {
        const response = await mockServerMethods.get('/laith');
        expect(response.status).toBe(404);
    });
});

afterAll(async () => {
    await db.drop();
});