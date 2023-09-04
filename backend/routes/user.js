const express = require('express');
const userCtrl = require('../controllers/user');

const router = express.Router();


// Création d'un nouveau compte :
router.post('/signup', userCtrl.signup);

// Connexion à un compte utilisateur :
router.post('/login', userCtrl.login);


module.exports = router;