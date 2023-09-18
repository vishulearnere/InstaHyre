const { StatusCodes } = require('http-status-codes')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { BadRequestError, UnauthenticatedError } = require('../errors')
const bcrypt = require('bcryptjs')
require('dotenv').config()
const jwt = require('jsonwebtoken')

// Create JWT Token
const createJWT = async function (user) {
  return jwt.sign(
    { userId: user.id, name: user.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  )
}

// Register user
const register = async (req, res) => {
  const { name, email, password, phoneNo } = req.body

  if (!name || !phoneNo || !password) {
    // here we are checking  validation in controller
    throw new BadRequestError('Please provide name, PhoneNo and password')
  }

  // hash the password
  const salt = await bcrypt.genSalt(10) // more the gensalt number, more randome bytes mores secure but more processing time
  const hashPassword = await bcrypt.hash(password, salt)
  const tempUser = { name, email, phoneNo, password: hashPassword }
  // console.log(tempUser)

  // Create User
  const user = await prisma.user.create({ data: { ...tempUser } })
  queryObject = { name: name, phoneNo: phoneNo }
  if (email) {
    queryObject.email = email
  }
  queryObject.isRegister = true
  const globaluser = await prisma.globalUser.create({
    data: { ...queryObject },
  })
  res
    .status(StatusCodes.CREATED)
    .json({ name: user.name, message: `${user.name} is Registered` })
}

// Login
const login = async (req, res) => {
  const { phoneNo, password } = req.body

  // user validation
  if (!phoneNo || !password) {
    throw new BadRequestError('Please provide phoneNo and password')
  }

  const user = await prisma.user.findUnique({
    where: {
      phoneNo: phoneNo,
    },
  })
  if (!user) {
    throw new UnauthenticatedError('User is not registerd in application')
  }
  console.log(user)

  // compare password
  const isPasswordCorrect = await bcrypt.compare(password, user.password)
  // console.log(isPasswordCorrect)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }

  // create  JWT
  const token = await createJWT(user)
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

module.exports = { register, login }
