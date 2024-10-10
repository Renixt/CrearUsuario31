const express = require("express");
const router = express.Router();

const {
    createUser
} = require('../controllers/users.controllers')


router.use(express.json())


// METODO POST
router.post('/', createUser)

module.exports = router;