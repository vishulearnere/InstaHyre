const express = require('express')
const router = express.Router()

const {
  markSpam,
  viewAllContacts,
  saveContact,
  searchUsers,
} = require('../controllers/users')

router.route('/spam').patch(markSpam)
router.route('/contact').get(viewAllContacts).post(saveContact)
router.route('/search').get(searchUsers)

module.exports = router
