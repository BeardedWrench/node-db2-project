// DO YOUR MAGIC
const express = require('express');
const Cars = require('./cars-model');

const Middleware = require('./cars-middleware');

const router = express.Router();

router.get( '/', ( req, res ) => {
    Cars.getAll()
        .then( cars => {
            res.status( 200 ).json( cars );
        })
})
router.get( '/:id', Middleware.checkCarId, async (req, res, next) => {
    try{
        const car = await Cars.getById( req.params.id )
        res.status( 200 ).json( car );
    }
    catch( err ){
        next(err)
    }
})
router.post( '/', Middleware.checkCarPayload, Middleware.checkVinNumberValid, Middleware.checkVinNumberUnique, async (req, res, next) => {
    try{
        const data = await Cars.create( req.body )
        res.json( data )
    }
    catch( err ){
        next()
    }
})

module.exports = router;