const express = require('express');
const bookCtrl = require('../controllers/books');
const auth = require('../middleware/auth');

const router = express.Router();

// Création d'un nouveau livre :
router.post('/', auth, bookCtrl.createBook);

// Affichage de la note du livre :
router.post('/:id/rating', auth, (req, res, next) => {
    console.log(req.body);
    res.status(200).json({
        message: 'Défini la note pour le user ID fourni'
    });
});

// Affichage de la liste des livres :
router.get('/', auth, bookCtrl.getAllBooks);

// Affichage d'un livre :
router.get('/:id', auth, bookCtrl.getOneBook);

// Affichage des 3 meilleurs livres :
router.get('/bestrating', auth, (req, res, next) => {
    console.log(req.body);
    res.status(200).json({
        message: 'liste des meilleurs livres à créer !'
    });
});

// Mise à jour du livre :
router.put('/:id', auth, bookCtrl.modifyBook);

// Suppression d'un livre :
router.delete('/:id', auth, bookCtrl.deleteBook);


module.exports = router;