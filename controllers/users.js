const { BadRequestError, NotFoundError } = require('../errors')
const notFound = require('../middleware/not-found')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { StatusCodes } = require('http-status-codes')

// mark spam
const markSpam = async (req, res) => {
  const { name, phoneNo, email } = req.body
  if (!phoneNo) {
    throw new BadRequestError('Please Provide "Phone Number" to mark as spam')
  }

  // console.log(req.user)

  // Update the user as All the profile with Phone following number as spam
  const updatedUsers = await prisma.globalUser.updateMany({
    where: {
      phoneNo: phoneNo,
    },
    data: { spam: true },
  })
  const newuser = await prisma.globalUser.findFirst({
    where: { phoneNo: phoneNo },
  })

  // if the profile with following Phone Number is not in Global Database
  // Then Register The Phone Number in Global databse and mark as spam
  console.log(newuser)
  // null is false in js

  const namesList = [
    'Emily Smith',
    'John Doe',
    'Lisa Johnson',
    'Alex Williams',
    'Jessica Brown',
    'Michael Taylor',
    'Sarah Miller',
    'David Wilson',
    'Rachel Anderson',
    'Matthew Davis',
    'Olivia Jones',
    'Andrew Martinez',
    'Emma Thomas',
    'James Harris',
    'Lauren Jackson',
    'Christopher White',
    'Megan Lee',
    'Daniel Taylor',
    'Emily Clark',
    'Benjamin Robinson',
  ]

  function getRandomName() {
    const randomIndex = Math.floor(Math.random() * namesList.length)
    return namesList[randomIndex]
  }

  if (!newuser) {
    let queryObject = {
      contactList: req.user.userId,
      phoneNo: phoneNo,
      spam: true,
    }
    queryObject.name = name || getRandomName()
    queryObject.email = email || 'spammer@gmail.com'
    console.log(queryObject)
    const markedUser = await prisma.globalUser.create({
      data: { ...queryObject, contactList: req.user.userId },
    })
    return res.status(StatusCodes.OK).json({
      sucess: 'true',
      message: 'The  Provided Phone Number is marked as Spam',
      markedUser,
    })
  }
  return res.status(StatusCodes.OK).json({
    sucess: 'true',
    message: 'The  Provided Phone Number is marked as Spam',
  })
}

// Get All The Contacts
const viewAllContacts = async (req, res) => {
  const allusers = await prisma.globalUser.findMany({
    where: { contactList: req.user.userId },
  })
  res.status(StatusCodes.OK).json({ allusers, count: allusers.length })
}

// Save Contact
const saveContact = async (req, res) => {
  const { phoneNo, name } = req.body
  if (!phoneNo || !name) {
    throw new BadRequestError('Please provide phoneNo and name')
  }
  req.body.contactList = req.user.userId

  // const user = await globalUser.create(req.body)
  const user = await prisma.globalUser.create({
    data: { ...req.body },
  })
  console.log(req.body)
  res.status(StatusCodes.CREATED).json({ user })
}

// Search  Users
const searchUsers = async (req, res) => {
  const { name, phoneNo } = req.query
  // Search User By Name
  if (name) {
    const users = await prisma.globalUser.findMany({
      where: {
        OR: [
          {
            name: {
              startsWith: name,
            },
          },
          {
            name: {
              contains: name,
            },
          },
        ],
      },
      select: {
        name: true,
        phoneNo: true,
        spam: true,
        email: true,
      },
    })
    if (!users.length) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `No users founds with ${name} name ` })
    }
    return res.status(StatusCodes.OK).json({ users })
  }
  // search User by Phone Number
  if (phoneNo) {
    const allusers = await prisma.globalUser.findMany({
      where: { phoneNo: phoneNo },
      select: {
        name: true,
        phoneNo: true,
        spam: true,
        isRegister: true,
        contactList: true,
        createdAt: true,
        updatedAt: true,
      },
    })
    if (!allusers.length) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `No users founds with ${phoneNo} Phone Number ` })
    }
    // console.log(allusers, 'checking logs')
    let result = {}
    result = allusers.find((user) => user.isRegister === true)
    console.log(result, 'kaha par')

    if (result) {
      const newuser = await prisma.globalUser.findMany({
        where: { phoneNo: phoneNo, contactList: req.user.userId },
      })
      console.log(newuser)
      if (newuser.length) {
        return res.status(StatusCodes.OK).json({ newuser })
      }
      return res.status(StatusCodes.OK).json({ result })
    }

    // // pagination
    // const page = Number(req.query.page) || 1
    // const limit = Number(req.query.limit) || 10
    // const skip = (page - 1) * limit

    // result = result.skip(skip).take(page)
    // // // 23
    // // // 4 7 7 7 2

    return res.status(StatusCodes.OK).json({ allusers })
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: `Please provide your name or Phone Number for Search` })
}

module.exports = { markSpam, viewAllContacts, saveContact, searchUsers }
