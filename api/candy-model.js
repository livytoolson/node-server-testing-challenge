const db = require('../data/dbConfig');

module.exports = {
    find,
    findById,
    create,
    update,
    remove
}

function find() {
    return db('candy')
}

function findById(id) {
    return db('candy').where({ id }).first()
}

async function create(candy) {
    const [id] = await db('candy').insert(candy)
    return findById(id)
}

function update(id, candy) {
    return db('candy').where({ id }).update(candy) 
}

function remove(id) {
    return db('candy').where({ id }).del()
}