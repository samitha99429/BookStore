import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import axios from "axios";

const Favourites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:3001/api/books/favorites", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (Array.isArray(response.data)) {
          const mappedData = response.data.map((item) => ({
            ...item,
            volumeInfo: {
              title: item.title,
              authors: item.authors,
              imageLinks: { thumbnail: item.thumbnail || "https://via.placeholder.com/150" },
            },
          }));

          setFavorites(mappedData);
        } else {
          console.error("Invalid response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="favourites">
      <h2 className="section-heading my-4">Favourite Books</h2>
      <div className="row">
        {favorites.length > 0 ? (
          favorites.map((book) => (
            <BookCard
              key={book.bookId || book._id}
              book={book}
              isFavourite={true}
              onFavouriteClick={() => {
                console.log("Favourite Clicked for:", book);
              }}
              onCardClick={() => {
                console.log("Card Clicked for:", book);
              }}
            />
          ))
        ) : (
          <p className="text-center">No favourite books found.</p>
        )}
      </div>
    </div>
  );
};

export default Favourites;

