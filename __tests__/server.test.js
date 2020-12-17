const request = require('supertest');
const server = require('../api/server');
const db = require('../data/dbConfig');

describe('[GET] /', () => {
    it('should return an OK status code of 200 from index route', async () => {
        const expectedStatusCode = 200
        const response = await request(server).get('/')
        expect(response.status).toEqual(expectedStatusCode)
    })
    it('should return /API is running/ from index route', async () => {
        const expectedBody = { api: 'API is running' }
        const response = await request(server).get('/')
        expect(response.body).toEqual(expectedBody)
    })
    it('should retun a JSON object from the index route', async () => {
        const response = await request(server).get('/');
        expect(response.type).toEqual('application/json')
    })
})