const axios = require('axios');
const FavoriteBook = require('../models/favouriteBooks')




const getAllBooks = async (req, res) => {
  const query = req.query.query || "books,story,novels,articles";
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.GOOGLE_API_KEY}`
    );
    res.json(response.data.items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error });
  }
};

module.exports = { getAllBooks };






const searchBooks = async (req, res) => {
  const query = req.query.query; 

  try {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=AIzaSyDom8jNBDaNeDjh_93I0hxOO26wK7gAKnc`);
    const books = response.data.items;
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error });
  }
};

const getBookDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const { data } = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}?key=AIzaSyDom8jNBDaNeDjh_93I0hxOO26wK7gAKnc`);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book details', error });
  }
};

const addFavoriteBook = async (req, res) => {
  const { id, title, authors, thumbnail } = req.body;
  const userId = req.user._id;

  try {
    const favoriteBook = new FavoriteBook({
      user: userId,
      bookId: id,
      title,
      authors,
      thumbnail,
    });

    await favoriteBook.save();
    res.status(201).json(favoriteBook);
  } catch (error) {
    res.status(500).json({ message: 'Error adding favorite', error });
  }
};

const getFavoriteBooks = async (req, res) => {
  const userId = req.user._id;

  try {
    const favoriteBooks = await FavoriteBook.find({ user: userId });
    res.json(favoriteBooks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching favorites', error });
  }
};

const removeFavoriteBook = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    await FavoriteBook.findOneAndDelete({ user: userId, bookId: id });
    res.json({ message: 'Favorite removed' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing favorite', error });
  }
};

module.exports = {
getAllBooks,
  searchBooks,
  getBookDetails,
  addFavoriteBook,
  getFavoriteBooks,
  removeFavoriteBook,
};
