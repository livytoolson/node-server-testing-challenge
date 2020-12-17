const Candy = require('../api/candy-model');
const db = require('../data/dbConfig');

const Milkyway = { candy_name: 'Milkyway', candy_brand: 'Mars' }
const Twizzler = { candy_name: 'Twizzler', candy_brand: 'Hershey' }
const Snickers = { candy_name: 'Snickers' }

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

describe('Candy model', () => {
    it('Candy.find returns empty array if no candies', async () => {
        const res = await Candy.find()
        expect(res).toHaveLength(0)
    })
    it('Candy.find returns candy', async () => {
        await db('candy').insert(Milkyway)
        const res = await Candy.find()
        expect(res).toHaveLength(1)
        expect(res[0]).toHaveProperty('id')
        expect(res[0]).toHaveProperty('candy_name', 'Milkyway')
        expect(res[0]).toMatchObject(Milkyway) 
    })
    it('Candy.insert inserts candies into the db', async () => {
        await Candy.insert(Milkyway)
        await Candy.insert(Twizzler)
        const candy = await db('candy')
        expect(candy).toHaveLength(2)
    })
    it('Candy.insert adds the correct candy data for a specifc candy into the db', async () => {
        let candy = await Candy.insert(Twizzler)
        expect(candy.candy_name).toBe('Twizzler')
        expect(candy.candy_brand).toBe('Hershey')
        candy = await Candy.insert(Milkyway)
        expect(candy.candy_name).toBe('Milkyway')
        expect(candy.candy_brand).toBe('Mars')
    })
})