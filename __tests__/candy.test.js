const request = require('supertest');
const server = require('../api/server');
const db = require('../data/dbConfig');

const Milkyway = { candy_name: 'Milkyway', candy_brand: 'Mars' }
const Twizzler = { candy_name: 'Twizzler', candy_brand: 'Hershey' }

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db('candy').truncate()
})

afterAll(async () => {
    await db.destroy()
})

describe('endpoints', () => {
    describe('[GET] /api/candy', () => {
        it('responds with 200 OK', async () => {
            const res = await request(server).get('/api/candy')
            expect(res.status).toBe(200)
        })
        it('responds with an empty array if no hobbits', async () => {
            const res = await request(server).get('/api/candy')
            expect(res.body).toHaveLength(0)
        })
        it('responds with candies if candies', async () => {
            await db('candy').insert(Milkyway)
            let res = await request(server).get('/api/candy')
            expect(res.body).toHaveLength(1)
            await db('candy').insert(Twizzler)
            res = await request(server).get('/api/candy')
            expect(res.body).toHaveLength(2)
            expect(res.body[0]).toMatchObject(Milkyway)
            expect(res.body[1]).toMatchObject(Twizzler)
        }) 
    })
    describe('[GET] /api/candy/:id', () => {
        it('responds with the candy with the given id', async () => {
            await db('candy').insert(Milkyway)
            let res = await request(server).get('/api/candy/1')
            expect(res.body).toMatchObject(Milkyway)
        })
        it('responds with a 404 if candy with id does not exist', async () => {
            let res = await request(server).get('/api/candy/3')
            expect(res.status).toBe(404)
        })
    })
    describe('[POST] /api/candy/:id', () => {
        it('returns the newly created candy', async () => {

        })
    })
    describe('[DELETE] /api/candy/:id', () => {
        it('responds with "candy was eaten" when candy is deleted', async () => {
            await db('candy').insert(Milkyway)
            let res = await request(server).delete('/api/candy/1')
            expect(JSON.stringify(res.body)).toMatch('Candy was eaten')
        })
        it('responds with a 404 error if candy with id does not exist', async () => {
            await db('candy').insert(Milkyway)
            await db('candy').insert(Twizzler)
            let res = await request(server).delete('/api/candy/5')
            expect(res.status).toBe(404)
            
        })
    })
})