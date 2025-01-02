import React from "react";
import { Modal } from "antd";
import "../styles/BookModal.css";

const BookModal = ({ visible, onClose, book }) => {
  if (!book) return null;

  return (
    <Modal
      title={book.volumeInfo.title}
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
    >
      <div className="book-modal-content">
        <img
          src={book.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150"}
          alt={book.volumeInfo.title}
          className="book-modal-image"
        />
        <h3 className="book-modal-title">{book.volumeInfo.title}</h3>
        <p className="book-modal-author">
          <strong>Author(s): </strong>
          {book.volumeInfo.authors?.join(", ") || "Unknown"}
        </p>
        <p className="book-modal-description">
          {book.volumeInfo.description || "No description available."}
        </p>
        <p className="book-modal-info">
          <strong>Publisher:</strong> {book.volumeInfo.publisher || "Unknown"}
        </p>
        <p className="book-modal-info">
          <strong>Published Date:</strong> {book.volumeInfo.publishedDate || "N/A"}
        </p>
      </div>
    </Modal>
  );
};

export default BookModal;
