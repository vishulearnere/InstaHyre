const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err)
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || `Something Went Wrong, try again later`,
  }
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  if (err.code && err.code === 'P2002') {
    customError.msg = `This Phone Number is already registered in Application, Please Input Another Number`
    customError.statusCode = 400
  }
  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(', ')
    customError.statusCode = 400
  }
  // console.log(err);
  if (err.name === 'CastError') {
    customError.msg = `No item found with id ${err.value}`
    customError.statusCode = 404
  }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: err })
  return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandlerMiddleware
