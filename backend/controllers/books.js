const Book = require('../models/Book');
const fs = require('fs');

//Ajout d'un nouveau livre :
exports.createBook = (req, res, next) => {
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject._userId;

    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    book.save()
        .then(() => res.status(201).json({ message: 'Livre créé !' }))
        .catch(error => res.status(400).json({ error }));
};

//Modification d'un livre :
exports.modifyBook = (req, res, next) => {
    const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete bookObject._userId;

    Book.findOne({ _id: req.params.id })
        .then((book) => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non authorisé' })
            } else {
                Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Livre modifié !' }))
                    .catch(error => res.status(400).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};


//Suppression d'un livre :
exports.deleteBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then(book => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non authorisé' })
            } else {
                const filename = book.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Book.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Livre supprimé !' }))
                        .catch(error => res.status(400).json({ error }));
                })
            }
        })
        .catch(error => { res.status(500).json({ error }) });
};

//Afficher un livre :
exports.getOneBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then(book => res.status(200).json(book))
        .catch(error => res.status(404).json({ error }))
};

//Afficher la liste des livres :
exports.getAllBooks = (req, res, next) => {
    Book.find()
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }));
};

// Ajout d'une note à un livre :
exports.rateABook = (req, res, next) => {
    const grade = parseFloat(req.body.rating);

    Book.findOne({ _id: req.params.id })
        .then(book => {
            if (!book) {
                throw new Error("Le livre n'a pas été trouvé");
            }

            //Vérifier que l'utilisateur n'a pas déjà noté le livre :
            const userAlreadyRate = book.ratings.find(rating => rating.userId.toString() === req.auth.userId);
            if (userAlreadyRate) {
                throw new Error('Note déjà attribuée')
            }

            //Ajout de la nouvelle note :
            book.ratings.push({
                userId: req.auth.userId,
                grade
            });

            //Total des notes et moyenne du livre :
            const allRatings = book.ratings.reduce((acc, curr) => acc + curr.grade, 0);
            book.averageRating = allRatings / book.ratings.length;

            return book.save();
        })
        .then(() => res.status(201).json({ message: 'Note ajoutée !' }))
        .catch(error => res.status(400).json({ error }));
};

// Affichage des 3 meilleurs livres :
exports.bestRatings = (req, res) => {
    Book.find()
        .then(books => {
            //Ordonner les livres par note croissante :
            books.sort((a, b) => b.averageRating - a.averageRating);

            //Choix des 3 premiers livres :
            const bestBooks = books.slice(0, 3);
            res.status(200).json(bestBooks)
        })
        .catch(error => res.status(400).json({ error }));
};