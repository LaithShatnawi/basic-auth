'use strict';
const { app } = require('../src/server');
const { db } = require('../src/auth/models/index');
const supertest = require('supertest');
const mockServerMethods = supertest(app);

beforeAll(async () => {
    await db.sync();
});

describe("API Server ", () => {
    it("getting data from home route /", async () => {
        const response = await mockServerMethods.get('/');
        expect(response.status).toEqual(200);
        expect(response.text).toEqual("hello hello");
    });
    it("signing up successfully /", async () => {
        const data = {
            "username": "laith",
            "password": "123"
        }
        const response = await mockServerMethods.post('/signup').send(data);
        expect(response.status).toEqual(200);
    });
    // it("signing in successfully /", async () => {
    //     const data = {
    //         "username": "laith",
    //         "password": "123"
    //     }
    //     const basic = (req, res, next) => {}
    //     const response2 = await mockServerMethods.post('/signin').send(data);

    //     expect(response2.status).toEqual(200);
    // });
});

afterAll(async () => {
    await db.drop();
});