const express = require('express');
const { searchBooks, getBookDetails, addFavoriteBook, getFavoriteBooks, removeFavoriteBook ,getAllBooks} = require('../controllers/booksController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/all',getAllBooks)
router.get('/search', searchBooks);
router.get('/details/:id', getBookDetails);

router.post('/favorites', protect, addFavoriteBook);
router.get('/favorites', protect, getFavoriteBooks);
router.delete('/favorites/:id', protect, removeFavoriteBook);

module.exports = router;
