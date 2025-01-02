const mongoose = require('mongoose');

const favoriteBookSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bookId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  authors: {
    type: [String],
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
});

const FavoriteBook = mongoose.model('FavoriteBook', favoriteBookSchema);

module.exports = FavoriteBook;
