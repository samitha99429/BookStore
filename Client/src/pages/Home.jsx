import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookCard from "../components/BookCard";
import BookModal from "../components/BookModal";
import "../styles/Home.css";
import HeroBanner from "../components/HeroBanner";
import TestimonialSlider from "../components/Testimonial";
import HeroIntro from "../components/HeroIntro";
import axios from "axios";

const Home = ({ isAuthenticated }) => {
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
    if (isAuthenticated) {
      fetchFavorites();
    }
  }, [isAuthenticated]);

  const fetchBooks = async () => {
    try {
      const { data } = await axios.get("http://localhost:3001/api/books/all");
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const fetchFavorites = async () => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.get("http://localhost:3001/api/books/favorites", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorites(data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const handleFavouriteClick = async (book) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const isFavorite = favorites.some((fav) => fav.bookId === book.id);
    try {
      if (isFavorite) {
        await axios.delete(`http://localhost:3001/api/books/favorites/${book.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites(favorites.filter((fav) => fav.bookId !== book.id));
      } else {
        const favoriteData = {
          id: book.id,
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors,
          thumbnail: book.volumeInfo.imageLinks?.thumbnail,
        };
        const { data } = await axios.post("http://localhost:3001/api/books/favorites", favoriteData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites([...favorites, data]);
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  const handleCardClick = (book) => {
    setSelectedBook(book);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setSelectedBook(null);
    setModalVisible(false);
  };

  return (
    <div className="home-container">
      <div className="text-center">
        <HeroBanner />
        <p className="herointro-paragraph">
          Welcome to the <span className="readyfy">ReadyFy</span> book store! Explore a wide range of books from different genres. Click the heart icon to save a book to your favourites. Enjoy reading!
        </p>
      </div>
      <h2 className="section-heading my-4">Trending Books</h2>
      <div className="book-list">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            isFavourite={favorites.some((fav) => fav.bookId === book.id)}
            onFavouriteClick={() => handleFavouriteClick(book)}
            onCardClick={() => handleCardClick(book)}
          />
        ))}
      </div>
      <div>
        <TestimonialSlider />
        <HeroIntro />
      </div>
      <BookModal
        visible={isModalVisible}
        onClose={handleModalClose}
        book={selectedBook}
      />
    </div>
  );
};

export default Home;
