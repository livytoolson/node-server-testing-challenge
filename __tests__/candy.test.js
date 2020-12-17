const supertest = require('supertest');
const server = require('../api/server');
const db = require('../data/dbConfig');

describe('candy test', () => {
    it('gets a list of candies', async () => {
        const res = await supertest(server).get('/')
    })
    it('gets a candy by an id', async () => {
        const res = await supertest(server.get('/1'))
        expect(res.body.id).toBe(1)
        expect(res.body.name).toBe('Scotchmallow')
    })
    it('posts a new candy', async () => {
        const res = await supertest(server.post('/')).send({ name: 'Snickers' })
        expect(res.statusCode).toBe(201)
        expect(res.body.name).toBe('Snickers')
        expect(res.body.id).toBeDefined
    })
    it('updates a candy', async () => {

    })
    it('deletes a candy', async () => {

    })
})