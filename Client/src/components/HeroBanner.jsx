import React from 'react';
import '../styles/HeroBanner.css';

const HeroBanner = () => {
  return (
    <div className="hero-banner">
      <video
        className="hero-video"
        src="https://videos.pexels.com/video-files/3987756/3987756-hd_1920_1080_24fps.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="hero-overlay">
        <div className="hero-content">
          <h1 className="hero-title">Discover Your Next Great Read!</h1>
          <p className="hero-paragraph">
            Welcome to ReadyFy, your one-stop destination for books that inspire.
          </p>
          <button className="hero-button">Explore Now</button>

        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
