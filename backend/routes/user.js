const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');


// Création d'un nouveau compte :
router.post('/signup', userCtrl.createUser);

// Connexion à un compte utilisateur :
router.post('/login', userCtrl.connectUser);


module.exports = router;