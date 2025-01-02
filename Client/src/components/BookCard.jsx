import React from "react";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import "../styles/BookCard.css";

const BookCard = ({ book, isFavourite, onFavouriteClick, onCardClick }) => {
  const volumeInfo = book?.volumeInfo || {};
  const imageUrl = volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150";
  const title = volumeInfo.title || "Untitled";
  const authors = volumeInfo.authors?.join(", ") || "Unknown Author";

  return (
    <div className="col-md-3 col-sm-6 book-card-container">
      <div className="card book-card" onClick={() => onCardClick && onCardClick(book)}>
        <img
          className="card-img-top"
          src={imageUrl}
          alt={title}
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{authors}</p>
          <div className="favourite-icon" onClick={(e) => e.stopPropagation()}>
            {isFavourite ? (
              <HeartFilled
                className="favourite-filled"
                onClick={() => onFavouriteClick && onFavouriteClick(book)}
              />
            ) : (
              <HeartOutlined
                className="favourite-outline"
                onClick={() => onFavouriteClick && onFavouriteClick(book)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;

