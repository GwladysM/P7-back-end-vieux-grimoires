const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const bookCtrl = require('../controllers/books');

// Création d'un nouveau livre :
router.post('/', auth, multer, bookCtrl.createBook);

// Ajout d'une note à un livre :
router.post('/:id/rating', auth, bookCtrl.rateABook);

// Affichage d'un livre :
router.get('/:id', bookCtrl.getOneBook);

// Affichage de la liste des livres :
router.get('/', bookCtrl.getAllBooks);

// Affichage des 3 meilleurs livres :
router.get('/bestrating', bookCtrl.bestRating);

// Modifier un livre :
router.put('/:id', auth, multer, bookCtrl.modifyBook);

// Suppression d'un livre :
router.delete('/:id', auth, bookCtrl.deleteBook);


module.exports = router;