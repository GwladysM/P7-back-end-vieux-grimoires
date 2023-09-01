const express = require('express');
const router = express.Router();
const bookCtrl = require('../controllers/books');

// Création d'un nouveau livre :
router.post('/', bookCtrl.createBook);

// Affichage de la note du livre :
router.post('/:id/rating', (req, res, next) => {
    console.log(req.body);
    res.status(200).json({
        message: 'Défini la note pour le user ID fourni'
    });
});

// Affichage de la liste des livres :
router.get('/', bookCtrl.getAllBooks);

// Affichage d'un livre :
router.get('/:id', bookCtrl.getOneBook);

// Affichage des 3 meilleurs livres :
router.get('/bestrating', (req, res, next) => {
    console.log(req.body);
    res.status(200).json({
        message: 'liste des meilleurs livres à créer !'
    });
});

// Mise à jour du livre :
router.put('/:id', bookCtrl.modifyBook);

// Suppression d'un livre :
router.delete('/:id', bookCtrl.deleteBook);


module.exports = router;