const db = require('../data/dbConfig');

module.exports = {
    find,
    findById,
    insert,
    update,
    remove
}

function find() {
    return db('candy')
}

function findById(id) {
    return db('candy').where({ id }).first()
}

async function insert(candy) {
    const [id] = await db('candy').insert(candy)
    return db('candy').where({ id }).first()
}

function update(id, candy) {
    return db('candy').where({ id }).update(candy) 
}

function remove(id) {
    return db('candy').where({ id }).del()
}