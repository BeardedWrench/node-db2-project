const vinValidator = require('vin-validator');
const Cars = require('./cars-model');

const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  const car = await Cars.getById( req.params.id )
  if( car ){
    next()
  }else{
    res.status( 404 ).json({
      message: `Car with id ${ req.params.id } is not found`
    })
  }
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const car = req.body;
  if( !car.vin || !car.make || !car.model || !car.mileage ){
    res.status( 400 ).json({
      message: 'Vin, Make, Model, Milage are all required.'
    })
  }else{
    next();
  }
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const checkVin = vinValidator.validate(req.body.vin);
  if( checkVin ){
    next()
  }else{
    res.status( 400 ).json({
      message: `Vin ${req.body.vin} is invalid.`
    })
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  try{
    const cars = await Cars.getAll();
    const currentVin = req.body.vin;

    const results = cars.filter( car => {
      return car.vin === currentVin
    })

    results.length > 0 ? res.status( 400 ).json({ message: `vin ${req.body.vin} already exists`}): next();
  }
  catch( err ){
    next( err );
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid
}