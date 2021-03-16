const db = require('../../data/db-config')

const getAll = async () => {
  // DO YOUR MAGIC
  return await db('cars');
}

const getById = ( id ) => {
  // DO YOUR MAGIC
  return db('cars').where( {id} ).first()
}

const create = ( car ) => {
  return db('cars').insert( car ).then( ( [ id ] ) => getById( id ) )
}

module.exports = {
  getAll,
  getById,
  create
}
